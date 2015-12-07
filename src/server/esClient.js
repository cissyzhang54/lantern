import elasticsearch from 'elasticsearch';
import awsElasticSearchConnector from 'http-aws-es';
import ArticleComparatorQuery from './esQueries/ArticleComparator';
import SectionsQuery from './esQueries/Sections';
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
import ArticleRealtimeQuery from './esQueries/ArticleRealTime.js';
import SearchQuery from './esQueries/Search';
import assert from 'assert';
import LoggerFactory from './logger';
import moment from 'moment';
import calculateIndices from './utils/calculateIndices.js';
import {calculateRealtimeIndices} from './utils/calculateIndices.js';

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

export function getIndicies(h = 'health,index,docs.count,store.size,tm'){
  return new Promise((resolve, reject) => {
    client.cat.indices({
      h: h,
      index: 'article_page_view*'
    }, function(e, response){
      e && reject(e)
      !e && resolve(response)
    })
  });
}

export function runArticleQuery(queryData) {
  let queryError;
  if (queryError = queryDataError('articles', queryData)){
    return Promise.reject(queryError);
  }

  let metaData;
  let pageViews;
  let query;
  return retrieveMetaData(queryData).then((data) => {
    metaData = data;
    queryData.publishDate = moment(metaData.initial_publish_date).toISOString();
    if (!queryData.dateFrom || !queryData.dateTo) {
      queryData.dateFrom = queryData.publishDate
      queryData.dateTo = moment().toISOString();
    }
    return retrieveArticleData(queryData)
  }).then((articleData) => {
    return [metaData].concat(articleData);
  });
}

export function runSectionQuery(queryData) {
  let queryError;
  if (queryError = queryDataError('sections', queryData)){
    return Promise.reject(queryError);
  }

  if (!queryData.dateFrom || !queryData.dateTo) {
    queryData.dateFrom = moment().subtract(29,'days').toISOString();
    queryData.dateTo = moment().toISOString();
  }
  return retrieveSectionData(queryData)
    .then((sectionData) => { return sectionData });
}

export function runTopicQuery(queryData) {
  let queryError;
  if (queryError = queryDataError('topics', queryData)){
    return Promise.reject(queryError);
  }

  if (!queryData.dateFrom || !queryData.dateTo) {
    queryData.dateFrom = moment().subtract(29,'days').toISOString();
    queryData.dateTo = moment().toISOString();
  }

  return retrieveTopicData(queryData)
    .then((topicData) => { return topicData });
}

export function runArticleRealtimeQuery(queryData) {
  let queryError;
  if (queryError = queryDataError('articles', queryData)) {
    return Promise.reject(queryError);
  }

  if (!queryData.dateFrom || !queryData.dateTo) {
    queryData.dateFrom = moment().subtract(1, 'hour').toISOString();
    queryData.dateTo = moment().toISOString();
  }

  return retrieveRealtimeData(queryData)
    .then((data) => {
      return [data];
    });
}

export function runSearchQuery(queryData) {
  let queryError;
  if (queryError = queryDataError('search', queryData)){
    return Promise.reject(queryError);
  }
  return new Promise((resolve, reject) => {
    let queryObject = SearchQuery(queryData);
    let request = {
      index: process.env.ES_SEARCH_INDEX_ROOT + '*',
      body: queryObject,
      from: queryData.from
    }
    client.search(request, (error, response) => {
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
    const eventsQueryObject = ArticleEventsQuery(queryData);
    const articlesComparatorQueryObject = ArticleComparatorQuery(queryData);
    const eventsComparatorQueryObject = ArticleEventsComparatorQuery(queryData);
    const articlesHeader = {
      index: calculateIndices(queryData, process.env.ES_INDEX_ROOT),
      ignore_unavailable: true,
      search_type: 'count',
    };
    const eventsHeader = {
      index: calculateIndices(queryData, process.env.ES_EVENT_INDEX_ROOT),
      ignore_unavailable: true,
      search_type: 'count',
    };


    let request = {
      body: [
        articlesHeader,
        articlesQueryObject,
        eventsHeader,
        eventsQueryObject,
        articlesHeader,
        articlesComparatorQueryObject,
        eventsHeader,
        eventsComparatorQueryObject
      ]
    };

    client.msearch(request, (error, response) => {
      if (error) {
        return reject(error);
      }
      return resolve(response.responses);
    });
  })
}


function retrieveSectionData(queryData){
  return new Promise((resolve, reject) => {
    let metadataQueryObject = SectionMetadataQuery(queryData);
    let sectionQuery = SectionsQuery(queryData);

    let sectionHeader = {
      index: calculateIndices(queryData, process.env.ES_INDEX_ROOT),
      ignore_unavailable: true,
      search_type: 'count',
    };

    let metadataHeader = {
      index: process.env.ES_SEARCH_INDEX_ROOT,
      ignore_unavailable: true,
      search_type: 'count',
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


    client.msearch(request, (error, response) => {
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
      search_type: 'count',
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

    client.msearch(request, (error, response) => {
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



function retrieveRealtimeData(queryData) {
  return new Promise((resolve, reject) => {
    let queryObject = ArticleRealtimeQuery(queryData);
    let request = {
      index: calculateRealtimeIndices(queryData, process.env.ES_REALTIME_INDEX_ROOT),
      ignore_unavailable: true,
      body: queryObject
    }
    client.search(request, (error, response) => {
      if (error) {
        return reject(error);
      }

      return resolve(response);
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
