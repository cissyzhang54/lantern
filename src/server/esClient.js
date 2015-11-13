import elasticsearch from 'elasticsearch';
import ArticleComparatorQuery from './queries/ArticleComparator';
import SectionsQuery from './queries/Sections';
import SectionComparatorQuery from './queries/SectionComparator';
import SectionMetadataQuery from './queries/SectionMetadata';
import SectionMetadataComparatorQuery from './queries/SectionMetadataComparator';
import ArticlesQuery from './queries/Articles';
import ArticleEventsQuery from './queries/ArticleEvents';
import ArticleEventsComparatorQuery from './queries/ArticleEventsComparator';
import SearchQuery from './queries/Search';
import assert from 'assert';
import LoggerFactory from './logger';
import moment from 'moment';
import calculateIndices from './utils/calculateIndices.js';

var client = elasticsearch.Client({
  host: [
    {
      host: process.env.ES_HOST,
      port: process.env.ES_PORT,
      auth: process.env.ES_USER + ':' + process.env.ES_PASS,
      protocol: 'https'
    }
  ],
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
  }).then(function(eventsData){
    return [pageViews, metaData, eventsData]
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
