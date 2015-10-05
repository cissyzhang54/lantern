import elasticsearch from 'elasticsearch';
import ArticleComparatorQuery from './queries/ArticleComparator';
import ArticlesQuery from './queries/Articles';
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
  return retrieveMetaData(queryData).then(function(data){
    metaData = data;
    if (!queryData.dateFrom || !queryData.dateTo){
      queryData.dateFrom = moment(metaData.initial_publish_date).toISOString();
      queryData.dateTo = moment().toISOString();
    }
    return retrievePageView(queryData)
  }).then(function(pageViewData){
    return [pageViewData, metaData]
  });
}

export function runComparatorQuery(queryData) {
  let queryError;
  if (queryError = queryDataError('comparator', queryData)){
    return Promise.reject(queryError);
  }
  return retrievePageView(queryData);
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

function retrievePageView(queryData){
  return new Promise((resolve, reject) => {
    let queryObject = queryData.comparator ?
      ArticleComparatorQuery(queryData) :
      ArticlesQuery(queryData);
    let request = {
      index: calculateIndices(queryData),
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
