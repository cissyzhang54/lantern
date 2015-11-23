import elasticsearch from 'elasticsearch';
import awsElasticSearchConnector from 'http-aws-es';
import ArticleComparatorQuery from './queries/ArticleComparator';
import SectionsQuery from './queries/Sections';
import SectionComparatorQuery from './queries/SectionComparator';
import SectionMetadataQuery from './queries/SectionMetadata';
import SectionMetadataComparatorQuery from './queries/SectionMetadataComparator';
import TopicQuery from './queries/Topics';
import TopicComparatorQuery from './queries/TopicComparator';
import TopicMetadataQuery from './queries/TopicMetadata';
import TopicMetadataComparatorQuery from './queries/TopicMetadataComparator';
import ArticlesQuery from './queries/Articles';
import ArticleEventsQuery from './queries/ArticleEvents';
import ArticleEventsComparatorQuery from './queries/ArticleEventsComparator';
import SearchQuery from './queries/Search';
import assert from 'assert';
import LoggerFactory from './logger';
import moment from 'moment';
import calculateIndices from './utils/calculateIndices.js';


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
    query = queryData;
    return retrieveArticleData(queryData)
  }).then((pageViewData) => {
    pageViews = pageViewData;
    return retrieveEventsData(query);
  }).then((eventsData) => {
    return [pageViews, metaData, eventsData]
  }).catch((error) => {
    return Promise.reject(error);
  });
}

export function runArticleComparatorQuery(queryData) {
  let queryError;
  if (queryError = queryDataError('comparator', queryData)){
    return Promise.reject(queryError);
  }
  let comparatorData;
  return retrieveArticleData(queryData).then(function(comparator){
    comparatorData = comparator;
    return retrieveEventsData(queryData);
  }).then(function(eventsComparatorData){
    return [comparatorData, eventsComparatorData];
  }).catch((error) => {
    return Promise.reject(error);
  });
}

export function runSectionQuery(queryData) {
  let queryError;
  if (queryError = queryDataError('sections', queryData)){
    return Promise.reject(queryError);
  }

  let metaData
  if (!queryData.dateFrom || !queryData.dateTo) {
    queryData.dateFrom = moment().subtract(29,'days').toISOString();
    queryData.dateTo = moment().toISOString();
  }
  return retrieveSectionMetaData(queryData)
    .then((data) => {
      metaData = data;
      return retrieveSectionData(queryData)
    })
    .then((sectionData) => {
      return [metaData, sectionData]
    })
    .catch((error) => {
      return Promise.reject(error);
    })
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

  let metaData;
  return retrieveTopicMetaData(queryData)
    .then((data) => {
      metaData = data;
      return retrieveTopicData(queryData)
    })
    .then((topicData) => {
      return [metaData, topicData]
    })
    .catch((error) => {
      return Promise.reject(error);
    })
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
    let queryObject = queryData.comparator ?
      ArticleComparatorQuery(queryData) :
      ArticlesQuery(queryData);
    let request = {
      index: calculateIndices(queryData, process.env.ES_INDEX_ROOT),
      ignore_unavailable: true,
      search_type: 'count',
      body: queryObject
    };
    client.search(request, (error, response) => {
      if (error) {
        return reject(error);
      }
      response.comparator = queryData.comparator;
      response.comparatorType = queryData.comparatorType;
      return resolve(response);
    });
  })
}

function retrieveSectionData(queryData){
  return new Promise((resolve, reject) => {
    let queryObject = queryData.comparator ? SectionComparatorQuery(queryData) : SectionsQuery(queryData);
    let request = {
      index: calculateIndices(queryData, process.env.ES_INDEX_ROOT),
      ignore_unavailable: true,
      search_type: 'count',
      body: queryObject
    };
    client.search(request, (error, response) => {
      if (error) {
        return reject(error);
      }
      return resolve(response);
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

function retrieveSectionMetaData(queryData){
  return new Promise((resolve, reject) => {
    let queryObject = queryData.comparator ? SectionMetadataComparatorQuery(queryData) : SectionMetadataQuery(queryData);
    let request = {
      index: process.env.ES_SEARCH_INDEX_ROOT,
      ignore_unavailable: true,
      search_type: 'count',
      body: queryObject
    };
    client.search(request, (error, response) => {
      if (error) {
        return reject(error);
      }
      return resolve(response);
    });
  })
}

function retrieveTopicData(queryData){
  return new Promise((resolve, reject) => {
    let queryObject = queryData.comparator ? TopicComparatorQuery(queryData) : TopicQuery(queryData);
    let request = {
      index: calculateIndices(queryData, process.env.ES_INDEX_ROOT),
      ignore_unavailable: true,
      search_type: 'count',
      body: queryObject
    };
    client.search(request, (error, response) => {
      if (error) {
        return reject(error);
      }
      return resolve(response);
    });
  })
}

function retrieveTopicMetaData(queryData){
  return new Promise((resolve, reject) => {
    let queryObject = queryData.comparator ? TopicMetadataComparatorQuery(queryData) : TopicMetadataQuery(queryData);
    let request = {
      index: process.env.ES_SEARCH_INDEX_ROOT,
      ignore_unavailable: true,
      search_type: 'count',
      body: queryObject
    };
    client.search(request, (error, response) => {
      if (error) {
        return reject(error);
      }
      return resolve(response);
    });
  })
}

function retrieveEventsData(queryData){
  return new Promise((resolve, reject) => {
    let queryObject = queryData.comparator ?
      ArticleEventsComparatorQuery(queryData) :
      ArticleEventsQuery(queryData);

    let request = {
      index: calculateIndices(queryData, process.env.ES_EVENT_INDEX_ROOT),
      ignore_unavailable: true,
      search_type: 'count',
      body: queryObject
    };
    client.search(request, (error, response) => {
      if (error) {
        return reject(error);
      }
      response.comparator = queryData.comparator;
      response.comparatorType = queryData.comparatorType;
      return resolve(response);
    });
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
