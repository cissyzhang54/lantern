import assert from 'assert';

export default function SearchQuery(query) {

  assert.equal(typeof query, 'object',
    "argument 'query' must be an object");

  assert.equal(typeof query.term, 'string',
    "argument 'query' must contain a 'term' property of type string");

  return {
    query : {
      bool : {
        must : {
          match : {
            title: query.term
          }
        },
        should : [
          {
            match : {
              title : {
                query : query.term,
                operator : "and"
              }
            }
          },
          {
            match_phrase : {
              title: query.term
            }
          }
        ]
      }
    }
  };
}
