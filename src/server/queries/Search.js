import assert from 'assert';

export default function SearchQuery(query) {

  assert.equal(typeof query, 'object',
    "argument 'query' must be an object");

  assert.equal(typeof query.term, 'string',
    "argument 'query' must contain a 'term' property of type string");

  return {
    "query" : {
      "match" : {
          "title": query.term
      }
    }
  };
}
