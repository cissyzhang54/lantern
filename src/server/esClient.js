import elasticsearch from 'elasticsearch';
import ArticleComparatorQuery from './queries/ArticleComparator';
import ArticlesQuery from './queries/Articles';
import SearchQuery from './queries/Search';
import assert from 'assert';
import LoggerFactory from './logger';
import moment from 'moment';

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

export default function runQuery(category, queryData) {
  try {
    assert.equal(typeof category, 'string',
      'argument "category" must be a string');

    assert.equal(typeof queryData, 'object',
      'argument "queryData" must be an object');
  } catch (e) {
    let error = new Error(e);
    error.name = 'MalformedQueryArgumentsError';
    error.query = queryData;
    error.category = category;
    return Promise.reject(error);
  }

  switch (category) {
    case 'comparator':
      return runComparatorQuery(queryData);
    case 'articles':
      return runArticleQuery(queryData);
    case 'search':
      return runSearchQuery(queryData);
    default:
      let error = new Error('No Suitable Category');
      error.name = 'CategoryNotFoundError';
      error.category = category;
      return Promise.reject(error);
  }
}

function runArticleQuery(queryData) {
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

function runComparatorQuery(queryData) {
  return retrievePageView(queryData);
}

function runSearchQuery(queryData) {
  return new Promise((resolve, reject) => {
    let queryObject = SearchQuery(queryData);
    client.search({
      index: process.env.ES_SEARCH_INDEX_ROOT + '*',
      body: queryObject,
      from: queryData.from
    }, (error, response) => {
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
    client.search({
      index: calculateIndices(queryData),
      ignore_unavailable: true,
      search_type: 'count',
      body: queryObject
    }, (error, response) => {
      if (error) {
        return reject(error);
      }
      return resolve(response);
    });
  })
}

function retrieveMetaData(queryData){
  return new Promise((resolve, reject) => {
    client.get({
      index: process.env.ES_SEARCH_INDEX_ROOT,
      type: 'logs', // XXX this should be articles!
      id: queryData.uuid
    }, (error, response) => {
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

function calculateIndices(query) {
  const fmtStr = 'YYYY-MM-DD';
  let dateFrom = moment(moment(query.dateFrom).format(fmtStr));
  let dateTo = moment(moment(query.dateTo).format(fmtStr));
  const indexPrefix = process.env.ES_INDEX_ROOT;
  let indices = [];

  while (dateFrom < dateTo){
    indices.push(indexPrefix + dateFrom.format(fmtStr));
    dateFrom.add(1, 'days');
  }

  return indices;
}
