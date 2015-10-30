import request from "superagent";
import ArticleActions from "../actions/ArticleActions";
import config from "../config";
import assert from "assert";

let DataAPI = {

    getArticleData(query, apiKey) {
      assert.equal(typeof query, 'object',
        "argument 'query' must be an object");

      assert.ok(query.hasOwnProperty('uuid'),
        "argument 'query' must contain a uuid property");

      assert.equal(typeof query.uuid, 'string',
        "property 'uuid' of argument 'query' must be a string");

      return new Promise(function handlePromise(resolve, reject) {
        let url = config.baseUrl + '/api/v0/articles/' + query.uuid;
        if (apiKey) {
            url += "?apiKey=" + apiKey;
        }
        request.post(url)
          .send(query)
          .set('Accept', 'application/json')
          .end((err, res) => {
            if (err) {
              err.queryData = query;
              err.name = errorName('Article', err)
              reject(err);
            }
            !err && resolve(res.body);
          });
      });
    },

    getComparatorData(query, apiKey) {
      assert.equal(typeof query, 'object',
        "argument 'query' must be an object");

      assert.ok(query.hasOwnProperty('comparator'),
        "argument 'query' must contain a comparator property");

      assert.equal(typeof query.comparator, 'string',
        "property 'comparator' of argument 'query' must be a string");

      assert.equal(typeof query.publishDate, 'string',
        "property 'publishDate' of argument 'query' must be a string");

      assert.equal(typeof query.uuid, 'string',
        "property 'uuid' of argument 'query' must be a string");

      return new Promise(function handlePromise(resolve, reject) {
        let baseUrl = `${config.baseUrl}/api/v0/comparators`;
        let reqParams = `articles/${query.comparatorType}/${query.comparator}`;
        let reqQuery = `publishDate=${query.publishDate}&uuid=${query.uuid}`;
        if (apiKey) {
          reqQuery += "&apiKey=" + apiKey;
        }
        let url = `${baseUrl}/${reqParams}?${reqQuery}`;
        request.post(url)
          .send(query)
          .set('Accept', 'application/json')
          .end((err, res) => {
            if (err) {
              err.queryData = query;
              err.name = errorName('Comparator', err)
              reject(err);
            }
            !err && resolve(res.body);
          });
      });
    },

    search(query, from = 0, apiKey = '') {

      assert.equal(typeof query, 'string',
        "argument 'query' must be a string");

      return new Promise((resolve, reject) => {
        let url = config.baseUrl + '/api/v0/search/' + query;

        const params = {
          from : from,
          apiKey : apiKey
        };

        request.get(url)
          .query(params)
          .set('Accept', 'application/json')
          .end((err, res) => {
            if (err) {
              err.queryData = query;
              err.name = errorName('Search', err)
              reject(err);
            }
            !err && resolve(res.body);
          });

      });
    }
};

function errorName(page, err){
  if (!err.response) return err.code
  switch(err.response.status) {
    case 404:
      return page + 'NotFoundError';
    default:
      return page + 'Error';
  }
}

export default DataAPI;
