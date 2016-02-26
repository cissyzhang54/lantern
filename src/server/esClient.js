/* eslint-env node */
import elasticsearch from 'elasticsearch';
import awsElasticSearchConnector from 'http-aws-es';
import ArticleComparatorQuery from './esQueries/ArticleComparator';
import SectionsQuery from './esQueries/Sections';
import TopArticlesQuery from './esQueries/TopArticles';
import TopArticleEventsQuery from './esQueries/TopArticleEvents';
import SectionComparatorQuery from './esQueries/SectionComparator';
import SectionMetadataQuery from './esQueries/SectionMetadata';
import SectionMetadataComparatorQuery from './esQueries/SectionMetadataComparator';
import TopicQuery from './esQueries/Topics';
import TopicComparatorQuery from './esQueries/TopicComparator';
import TopicMetadataQuery from './esQueries/TopicMetadata';
import TopicMetadataComparatorQuery from './esQueries/TopicMetadataComparator';
import ArticlesQuery from './esQueries/Articles';
import ArticleEventsQuery from './esQueries/ArticleEvents';
import ArticleEventsComparatorQuery from './esQueries/ArticleEventsComparator';
import ArticlePublishedTimeQuery from './esQueries/ArticlePublished';

import ArticleRealtimeQuery from './esQueries/ArticleRealTime.js';
import ArticleRealtimeAllQuery from './esQueries/ArticleRealTimeAll';

import SectionRealtimeQuery from './esQueries/SectionRealTime';

import SearchQuery from './esQueries/Search';
import assert from 'assert';
import LoggerFactory from './logger';
import moment from 'moment';
import calculateIndices from './utils/calculateIndices.js';
import {calculateRealtimeIndices} from './utils/calculateIndices.js';
import timestampParser from './utils/timestampParser';
import stream from 'stream';
import assign from 'object-assign';

var queryStream = new stream.Readable();
queryStream._read = function noop() {};
queryStream.end = function noop() {};

var client = elasticsearch.Client({
  hosts: process.env.ES_AWS_HOST,
  connectionClass: awsElasticSearchConnector,
  amazonES: {
    region: process.env.ES_AWS_REGION,
    accessKey: process.env.ES_AWS_ACCESS_KEY_ID,
    secretKey: process.env.ES_AWS_SECRET_ACCESS_KEY
  },
  log: LoggerFactory('elasticsearch')
});

export {queryStream};

var proxySearch = function(type, request, callback) {
  var requestTimer = new Date();
  var wrappedCallback = function(error, response) {
    queryStream.push('\n===== took ' + (new Date().valueOf() - requestTimer) + 'ms ===== \n\n');
    callback(error, response);
  }

  queryStream.push('\n\n===== [' + new Date().toTimeString() + '] ===== '+ type +' =====\n');
  queryStream.push(JSON.stringify(arguments[1]));

  return client[type].call(client, request, wrappedCallback);
};

export function getIndicies(indices, h = 'health,index,docs.count,store.size,tm'){
  return new Promise((resolve, reject) => {
    client.cat.indices({
      h: h,
      index: indices
    }, function(e, response){
      e && reject(e)
      !e && resolve(response)
    })
  })
}

export function getLatestRealtimeDocument() {
  return new Promise((resolve, reject) => {
    let request = {
      index: process.env.ES_REALTIME_INDEX_ROOT + '*',
      body: {
        query : {
          match_all: {}
        },
        size: 1,
        sort : [
          {
            event_timestamp : {
              order : "desc"
            }
          }
        ]
      }
    }
    proxySearch('search', request, (error, response) => {
      if (error) {
        return reject(error);
      }
      return resolve(response.hits);
    });
  })
}

export function getLatestHistoricalDocument() {
  return new Promise((resolve, reject) => {
    let request = {
      index: process.env.ES_INDEX_ROOT + '*',
      search_type: 'count',
      body: {
        query : {
          match_all: {}
        },
        size: 0,
        aggs : {
          newest_article_event : { max : { field : "view_timestamp" } }
        }
      }
    }
    proxySearch('search', request, (error, response) => {
      if (error) {
        return reject(error);
      }
      return resolve(response.aggregations.newest_article_event.value_as_string);
    });
  })
}

export function getMetaData (uuid) {
  let query = {
    uuid : uuid
  }
  return retrieveMetaData(query);
}

// Normalise the various primary section formats we can get
export function _normalisePrimarySection(primarySections) {
  if (Array.isArray(primarySections)) {
    return primarySections[0];
  }
  else if (typeof(primarySections) === 'string') {
    return primarySections.split(',')[0];
  }
}

// When no comparator is supplied, see if we can
// default to the article's primary section.
// Failing that, default to the global/FT comparator
export function _getComparatorFromPrimarySection(primarySection) {
  let queryData = {};
  if (primarySection) {
    queryData.comparatorType = 'section';
    queryData.comparator = primarySection;
  } else {
    queryData.comparatorType = 'global';
    queryData.comparator = 'FT';
  }
  return queryData;
}

export function runArticleQuery(queryData) {
  let queryError = queryDataError('articles', queryData);
  if (queryError){
    return Promise.reject(queryError);
  }

  let metaData;
  return retrieveMetaData(queryData).then((data) => {
    metaData = data;

    queryData.publishDate = moment(metaData.initial_publish_date).toISOString();
    if (queryData.timespan && queryData.timespan !== 'custom') {
      queryData.dateFrom = queryData.publishDate;
      queryData.dateTo = moment(queryData.publishDate).add(queryData.timespan, 'hours').toISOString();
    }
    else if (!queryData.dateFrom || !queryData.dateTo) {
      queryData.dateFrom = queryData.publishDate
      queryData.dateTo = moment().toISOString();
    }

    if (metaData.primary_section) {
      metaData.primary_section = _normalisePrimarySection(metaData.primary_section);
    }

    if(!queryData.comparator) {
      assign(queryData, _getComparatorFromPrimarySection(metaData.primary_section));
    }

    return retrieveArticleData(queryData)
  }).then((articleData) => {
    return [metaData].concat(articleData);
  });
}

export function runSectionQuery(queryData) {
  let queryError = queryDataError('sections', queryData);
  if (queryError){
    return Promise.reject(queryError);
  }

  if (queryData.timespan && queryData.timespan !== 'custom') {
    queryData.dateFrom = moment().subtract(queryData.timespan, 'hours').toISOString();
    queryData.dateTo = moment().toISOString();
  }
  else if (!queryData.dateFrom || !queryData.dateTo) {
    queryData.dateFrom = moment().subtract(29,'days').toISOString();
    queryData.dateTo = moment().toISOString();
  }
  return retrieveSectionData(queryData)
    .then((sectionData) => { return sectionData });
}

export function runArticleList(queryData) {
  return retrieveArticleList(queryData)
  .then((articleList) => {
    return articleList;
  });
}

export function runRealtimeArticleList(queryData) {
  return retrieveRealtimeArticleList(queryData)
  .then((articleList) => {
    return articleList;
  });
}

export function runTopicQuery(queryData) {
  let queryError = queryDataError('topics', queryData);
  if (queryError){
    return Promise.reject(queryError);
  }

  if (queryData.timespan && queryData.timespan !== 'custom') {
    queryData.dateFrom = moment().subtract(queryData.timespan, 'hours').toISOString();
    queryData.dateTo = moment().toISOString();
  }
  else if (!queryData.dateFrom || !queryData.dateTo) {
    queryData.dateFrom = moment().subtract(29,'days').toISOString();
    queryData.dateTo = moment().toISOString();
  }
  return retrieveTopicData(queryData)
    .then((topicData) => { return topicData });
}

export function runArticleRealtimeQuery(queryData) {
  let queryError = queryDataError('articles', queryData);
  if (queryError) {
    return Promise.reject(queryError);
  }

  if (!queryData.timespan) {
    queryData.timespan = '1h'
  }

  const dates = timestampParser(queryData.timespan, moment());
  Object.assign(queryData, dates);

  let requests = [];

  requests.push(retrieveRealtimeArticleData(queryData));
  requests.push(retrieveRealtimeAllData(queryData));

  return Promise.all(requests);
}

export function runSectionRealtimeQuery(queryData) {
  let queryError = queryDataError('sections', queryData);
  if (queryError) {
    return Promise.reject(queryError);
  }

  if (!queryData.timespan) {
    queryData.timespan = '24h';
  }

  const dates = timestampParser(queryData.timespan, moment());
  Object.assign(queryData, dates);

  return retrieveRealtimeSectionData(queryData);
}


export function runTopArticleQuery(queryData) {
  let queryError = queryDataError('articles', queryData);
  if (queryError) {
    return Promise.reject(queryError);
  }

  if (!queryData.dateFrom || !queryData.dateTo) {
    queryData.dateFrom = moment().subtract(1, 'days').startOf('day').toISOString();
    queryData.dateTo = moment().subtract(1, 'days').endOf('day').toISOString();
  }

  return retrieveTopArticleData(queryData)
    .then((topArticleData) => { return topArticleData });
}

export function runSearchQuery(queryData) {
  let queryError = queryDataError('search', queryData);
  if (queryError){
    return Promise.reject(queryError);
  }
  return new Promise((resolve, reject) => {
    let queryObject = SearchQuery(queryData);
    let request = {
      index: process.env.ES_SEARCH_INDEX_ROOT + '*',
      body: queryObject,
      from: queryData.from
    }
    proxySearch('search', request, (error, response) => {
      if (error) {
        return reject(error);
      }
      return resolve(response.hits);
    });
  });
}

function retrieveArticleData(queryData){
  return new Promise((resolve, reject) => {
    const articlesQueryObject = ArticlesQuery(queryData);
    const articlePublishedQueryObject = ArticlePublishedTimeQuery(queryData);
    const eventsQueryObject = ArticleEventsQuery(queryData);
    const articlesComparatorQueryObject = ArticleComparatorQuery(queryData);
    const eventsComparatorQueryObject = ArticleEventsComparatorQuery(queryData);

    const articlesHeader = {
      index: calculateIndices(queryData, process.env.ES_INDEX_ROOT),
      ignore_unavailable: true,
      search_type: 'count'
    };
    const eventsHeader = {
      index: calculateIndices(queryData, process.env.ES_EVENT_INDEX_ROOT),
      ignore_unavailable: true,
      search_type: 'count'
    };

    const articlePublished = {
      index: process.env.ES_ARTICLE_PUBLISHED_INDEX_ROOT + "*",
      ignore_unavailable: true,
      search_type: 'count'
    }

    let request = {
      body: [
        articlesHeader,
        articlesQueryObject,
        eventsHeader,
        eventsQueryObject,
        articlesHeader,
        articlesComparatorQueryObject,
        eventsHeader,
        eventsComparatorQueryObject,
        articlePublished,
        articlePublishedQueryObject
      ]
    };

    proxySearch('msearch', request, (error, response) => {
      if (error) {
        return reject(error);
      }
      return resolve(response.responses);
    });
  })
}

import ArticleListQuery from './esQueries/ArticleList';
function retrieveArticleList(queryData) {
  return new Promise((resolve, reject) => {
    const query = {
      index: calculateIndices(queryData, process.env.ES_INDEX_ROOT),
      body: ArticleListQuery(queryData)
    };

    client.search(query, (error, response) => {
      if (error) {
        return reject(error);
      }
      resolve(response);
    });

  });
}

import RealtimeArticleListQuery from './esQueries/RealtimeArticleList';
function retrieveRealtimeArticleList(queryData) {
  return new Promise((resolve, reject) => {
    const query = {
      index: calculateIndices(queryData, process.env.ES_REALTIME_INDEX_ROOT),
      body: RealtimeArticleListQuery(queryData)
    };

    client.search(query, (error, response) => {
      if (error) {
        return reject(error);
      }
      resolve(response);
    })
  });
}


function retrieveSectionData(queryData){
  return new Promise((resolve, reject) => {
    let metadataQueryObject = SectionMetadataQuery(queryData);
    let sectionQuery = SectionsQuery(queryData);

    let sectionHeader = {
      index: calculateIndices(queryData, process.env.ES_INDEX_ROOT),
      ignore_unavailable: true,
      search_type: 'count'
    };

    let metadataHeader = {
      index: process.env.ES_SEARCH_INDEX_ROOT,
      ignore_unavailable: true,
      search_type: 'count'
    };

    let request = {
      body : [
        metadataHeader,
        metadataQueryObject,
        sectionHeader,
        sectionQuery
      ]
    }

    if (queryData.comparator) {
      let metadataComparatorQueryObject = SectionMetadataComparatorQuery(queryData);
      let comparatorQueryObject = SectionComparatorQuery(queryData);

      request.body = request.body.concat([
        metadataHeader,
        metadataComparatorQueryObject,
        sectionHeader,
        comparatorQueryObject
      ]);
    }


    proxySearch('msearch', request, (error, response) => {
      if (error) {
        return reject(error);
      }
      response.comparator = queryData.comparator;
      response.comparatorType = queryData.comparatorType;
      return resolve(response.responses);
    });
  })
}

function retrieveTopicData(queryData){
  return new Promise((resolve, reject) => {
    let topicQueryObject = TopicQuery(queryData);
    let topicMetadataQueryObject = TopicMetadataQuery(queryData);

    let topicHeader = {
      index: calculateIndices(queryData, process.env.ES_INDEX_ROOT),
      ignore_unavailable: true,
      search_type: 'count'
    };

    let topicMetadataHeader = {
      index: process.env.ES_SEARCH_INDEX_ROOT,
      ignore_unavailable: true,
      search_type: 'count'
    };
    let request = {
      body: [
        topicMetadataHeader,
        topicMetadataQueryObject,
        topicHeader,
        topicQueryObject
      ]
    }

    if (queryData.comparator) {
      let topicMetadataComparatorQueryObject = TopicMetadataComparatorQuery(queryData);
      let topicComparatorQueryObject = TopicComparatorQuery(queryData);

      request.body = request.body.concat([
        topicMetadataHeader,
        topicMetadataComparatorQueryObject,
        topicHeader,
        topicComparatorQueryObject
      ])
    }

    proxySearch('msearch', request, (error, response) => {
      if (error) {
        return reject(error);
      }
      response.comparator = queryData.comparator;
      response.comparatorType = queryData.comparatorType;
      return resolve(response.responses);
    });
  })
}

function retrieveMetaData(queryData){
  return new Promise((resolve, reject) => {
    let request = {
      index: process.env.ES_SEARCH_INDEX_ROOT,
      type: 'logs', // XXX this should be articles!
      id: queryData.uuid
    };
    client.get(request, (error, response) => {
      if (error) {
        // handle article not found
        if (error.status === '404') {
          // no need to 'let'/'var' this
          let err = new Error('Article not found');
          err.name = 'ArticleNotFoundError';
          err.response = response;
          err.original = error;
          return reject(err);
        }
        return reject(error);
      }
      // handle article not found
      if (!response.found) {
        // no need to 'let'/'var' this
        error = new Error('Article not found');
        error.name = 'ArticleNotFoundError';
        error.response = response;
        return reject(error);
      }
      return resolve(response._source);
    });
  })
}

function retrieveRealtimeArticleData(queryData) {
  return new Promise((resolve, reject) => {
    let queryObject = ArticleRealtimeQuery(queryData);
    let request = {
      index: calculateRealtimeIndices(queryData, process.env.ES_REALTIME_INDEX_ROOT),
      ignore_unavailable: true,
      body: queryObject
    }
    proxySearch('search', request, (error, response) => {
      if (error) {
        return reject(error);
      }

      return resolve(response);
    })
  })
}

function retrieveRealtimeAllData(queryData) {
  return new Promise((resolve, reject) => {
    let queryObject = ArticleRealtimeAllQuery(queryData);
    let request = {
      index: calculateRealtimeIndices(queryData, process.env.ES_REALTIME_INDEX_ROOT),
      ignore_unavailable: true,
      body: queryObject
    }
    proxySearch('search', request, (error, response) => {
      if (error) {
        return reject(error);
      }

      return resolve(response);
    })
  })
}

function retrieveRealtimeSectionData(queryData) {
  return new Promise((resolve, reject) => {
    let queryObject = SectionRealtimeQuery(queryData);
    let request = {
      index: calculateRealtimeIndices(queryData, process.env.ES_REALTIME_INDEX_ROOT),
      ignore_unavailable: true,
      body: queryObject
    }
    proxySearch('search', request, (error, response) => {
      if (error) {
        return reject(error);
      }

      return resolve(response);
    })
  })
}

function retrieveTopArticleData(queryData) {
  return new Promise((resolve, reject) => {
    let articleQuery = TopArticlesQuery(queryData);
    let articleHeader = {
      index: 'article_page_view-*', // TODO wrong index to be using
      ignore_unavailable: true,
      search_type: 'count'
    }

    let articleEventsQuery = TopArticleEventsQuery(queryData);
    let articleEventsHeader = {
      index: 'article_page_event-*', // TODO wrong index to be using
      ignore_unavailable: true,
      search_type: 'count'
    }

    let request = {
      body: [
        articleHeader,
        articleQuery,
        articleEventsHeader,
        articleEventsQuery
      ]
    }

    proxySearch('msearch', request, (error, response) => {
      if (error) {
        return reject(error);
      }
      return resolve(response.responses);
    })
  })
}

function queryDataError(category, queryData){
  try {
    assert.equal(typeof queryData, 'object',
      'argument "queryData" must be an object');
    return false
  } catch (e) {
    let error = new Error(e);
    error.name = 'MalformedQueryArgumentsError';
    error.query = queryData;
    error.category = category;
    return error;
  }
}
