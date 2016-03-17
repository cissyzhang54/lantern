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
          .end(handleResponse('Article', query, reject, resolve));
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
          .query({ timespan: query.timespan })
          .set('Accept', 'application/json')
          .end(handleResponse('ArticleRealtime', query, reject, resolve));
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
          .end(handleResponse('Section', query, reject, resolve));
      });
    },

    getSectionRealtimeData(query, apiKey) {
      assert.equal(typeof query, 'object',
        "argument 'query' must be an object");

      assert.ok(query.hasOwnProperty('section'),
        "argument 'query' must contain a section property");

      assert.equal(typeof query.section, 'string',
        "property 'section' of argument 'query' must be a string");

      return new Promise(function handlePromise(resolve, reject) {
        let url = config.baseUrl + '/api/v0/realtime/sections/' + query.section;
        if (apiKey) {
          url += "?apiKey=" + apiKey;
        }
        request.get(url)
          .query({ timespan: query.timespan })
          .set('Accept', 'application/json')
          .end(handleResponse('SectionRealtime', query, reject, resolve));
      });
    },

    getRealtimeArticleList(query) {
      assert.equal(typeof query, 'object',
        "argument 'query' must be an object");

      assert.ok(query.hasOwnProperty('type'),
        "a query type of {section, author} must be supplied")

      assert.ok(query.hasOwnProperty(query.type),
        "a specifier for the query type must be supplied")

      return new Promise(function handlePromise(resolve, reject) {
        const url = `${config.baseUrl}/api/v0/realtime/articlelist/${query.type}s/${query[query.type]}`
        request.get(url)
          .send(query)
          .set('Accept', 'application/json')
          .end(handleResponse('SectionArticleList', query, reject, resolve));
      });

    },

    getArticleList(query) {
      assert.equal(typeof query, 'object',
        "argument 'query' must be an object");

      assert.ok(query.hasOwnProperty('type'),
        "a query type of {section, author} must be supplied")

      assert.ok(query.hasOwnProperty(query.type),
        "a specifier for the query type must be supplied")

      return new Promise(function handlePromise(resolve, reject) {
        const url = `${config.baseUrl}/api/v0/articlelist/${query.type}s/${query[query.type]}`
        request.post(url)
          .send(query)
          .set('Accept', 'application/json')
          .end(handleResponse('SectionArticleList', query, reject, resolve));
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
          .end(handleResponse('Topic', query, reject, resolve));
      })
    },

    getTopArticlesData(query, apiKey) {
      assert.equal(typeof query, 'object',
        "argument 'query' must be an object");

      return new Promise((resolve, reject) => {
        let url = `${config.baseUrl}/api/v0/toparticles`;
        if (apiKey) {
          url += "?apiKey=" + apiKey;
        }
        request.post(url)
          .send(query)
          .set('Accept', 'application/json')
          .end(handleResponse('Top Articles', query, reject, resolve));
      })
    },

    getStatus () {
      return new Promise((resolve, reject) => {
        let url = `${config.baseUrl}/status`;
        request.get(url)
          .set('Accept', 'application/json')
          .end((err, res) => {
            if (err) {
              err.name = errorName('Status', err);
              if (res && res.body) {
                err.message = res.body.message;
              }
              reject(err);
            }
            !err && resolve(res.body);
          });
      });
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
        request.get(url)
          .query(params)
          .set('Accept', 'application/json')
          .end(handleResponse('Search', query, reject, resolve));
      });
    }
};

function errorName(page, err){
  if (!err.response) return err.code
  if (err.response.body && err.response.body.error && err.response.body.error.name)
    return page + err.response.body.error.name;
  switch(err.response.status) {
    case 404:
      return page + 'NotFoundError';
    default:
      return page + 'Error';
  }
}

function handleResponse(type, query, reject, resolve) {
  return function(err, res) {
    if (err) {
      err.queryData = query;
      err.name = errorName(type, err);
      if (res && res.body) {
        err.message = res.body.message;
      }
      reject(err);
    }
    res.body.requestId = query.requestId; // used by search
    !err && resolve(res.body);
  }
}

export default DataAPI;
