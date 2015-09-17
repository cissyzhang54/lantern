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
                  switch(err.response.status) {
                    case 404:
                      err.name = 'ArticleNotFoundError';
                      break;
                    default:
                      err.name = 'ArticleFetchError';
                      break;
                  }
                  reject(err);
                }
                resolve(res.body);
            });
      });
    },

    getComparatorData(query, apiKey) {

      assert.equal(typeof query, 'object',
        "argument 'query' must be an object");

      assert.ok(query.hasOwnProperty('comparator'),
        "argument 'query' must contain a query.comparator property");

      assert.equal(typeof query.comparator, 'string',
        "property 'query.comparator' of argument 'query' must be a string");

      return new Promise(function handlePromise(resolve, reject) {
        let url = config.baseUrl + '/api/v0/comparators/articles/' + query.comparator;
        if (apiKey) {
            url += "?apiKey=" + apiKey;
        }
        request.post(url)
            .send(query)
            .set('Accept', 'application/json')
            .end((err, res) => {
                if (err) {
                  err.queryData = query;
                  switch(err.response.status) {
                    case 404:
                      err.name = 'ComparatorNotFoundError';
                      break;
                    default:
                      err.name = 'ComparatorFetchError';
                      break;
                  }
                  reject(err);
                }
                resolve(res.body);
            });
      });
    },

    search(query, apiKey) {

      assert.equal(typeof query, 'string',
        "argument 'query' must be a string");

      return new Promise((resolve, reject) => {
        let url = config.baseUrl + '/api/v0/search/' + query;

        if (apiKey) {
          url += "?apiKey" + apiKey;
        }
        request.get(url)
          .set('Accept', 'application/json')
          .end((err, res) => {
            if (err) {
              err.queryData = query;
              switch(err.response.status) {
                default:
                  err.name = 'SearchError';
                  break;
              }
              reject(err);
            }
            resolve(res.body);
          });

      });
    }
};

export default DataAPI;
