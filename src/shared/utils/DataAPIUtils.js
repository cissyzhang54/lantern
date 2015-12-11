import request from "superagent";
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
              err.name = errorName('Article', err);
              if (res) {
                err.message = res.body.message;
              }
              reject(err);
            }
            !err && resolve(res.body);
          });
      });
    },

    getArticleRealtimeData(query, apiKey) {
      assert.equal(typeof query, 'object',
        "argument 'query' must be an object");

      assert.ok(query.hasOwnProperty('uuid'),
        "argument 'query' must contain a uuid property");

      assert.equal(typeof query.uuid, 'string',
        "property 'uuid' of argument 'query' must be a string");

        return new Promise(function handlePromise(resolve, reject) {
          let url = config.baseUrl + '/api/v0/realtime/articles/' + query.uuid;
          if (apiKey) {
            url += "?apiKey=" + apiKey;
          }
          request.get(url)
            .set('Accept', 'application/json')
            .end((err, res) => {
              if (err) {
                err.queryData = query;
                err.name = errorName('Article', err)
                if (res) {
                  err.message = res.body.message;
                }
                reject(err);
              }
              !err && resolve(res.body);
            });
        });
    },

    getSectionData(query, apiKey) {
      assert.equal(typeof query, 'object',
        "argument 'query' must be an object");

      assert.ok(query.hasOwnProperty('section'),
        "argument 'query' must contain a section property");

      assert.equal(typeof query.section, 'string',
        "property 'section' of argument 'query' must be a string");

      return new Promise(function handlePromise(resolve, reject) {
        let baseUrl = `${config.baseUrl}/api/v0/sections`;
        let reqParams = `${query.section}`;
        let reqQuery = ``;
        if (apiKey) {
          reqQuery += "apiKey=" + apiKey;
        }
        let url = `${baseUrl}/${reqParams}?${reqQuery}`;
        request.post(url)
          .send(query)
          .set('Accept', 'application/json')
          .end((err, res) => {
            if (err) {
              err.queryData = query;
              err.name = errorName('Section', err)
              if (res) {
                err.message = res.body.message;
              }
              reject(err);
            }
            !err && resolve(res.body);
          });
      });
    },

    getTopicData(query, apiKey) {
      assert.equal(typeof query, 'object',
        "argument 'query' must be an object");

      assert.ok(query.hasOwnProperty('topic'),
        "argument 'query' must contain a topic property");

      assert.equal(typeof query.topic, 'string',
        "property 'topic' of argument 'query' must be a string");

      return new Promise(function handlePromise(resolve, reject) {
        let baseUrl = `${config.baseUrl}/api/v0/topics`;
        let reqParams = `${query.topic}`;                 // TODO Add comparator
        let reqQuery = ``;
        if (apiKey) {
          reqQuery += "apiKey=" + apiKey;
        }
        let url = `${baseUrl}/${reqParams}?${reqQuery}`;

        request.post(url)
          .send(query)
          .set('Accept', 'application/json')
          .end((err, res) => {
            if (err) {
              err.queryData = query;
              err.name = errorName('Topic', err)
              if (res) {
                err.message = res.body.message;
              }
              reject(err);
            }
            !err && resolve(res.body);
          });
      })
    },

    search(query, from = 0, apiKey = '') {

      assert.equal(typeof query, 'object',
      "argument 'query' must be an object");

      assert.equal(typeof query.term, 'string',
      "query must contain a property 'term' of type string");

      return new Promise((resolve, reject) => {
        let url = config.baseUrl + '/api/v0/search/' + query.term;

        const params = {
          from : from,
          apiKey : apiKey
        };
        let requestId = query.requestId;
        request.get(url)
          .query(params)
          .set('Accept', 'application/json')
          .end((err, res) => {
            if (err) {
              err.queryData = query.term;
              err.name = errorName('Search', err)
              if (res) {
                err.message = res.body.message;
              }
              reject(err);
            }
            res.body.requestId = requestId;
            !err && resolve(res.body);
          });

      });
    }
};

function errorName(page, err){
  if (!err.response) return err.code
  if (err.response.body)
    return page + err.response.body.error.name;
  switch(err.response.status) {
    case 404:
      return page + 'NotFoundError';
    default:
      return page + 'Error';
  }
}

function errorHandler(type) {
  return function(error, query) {
    error.queryData = query;
    error.name = errorName(type, error);
    error.message = error.response.body.message;
  }
}

export default DataAPI;
