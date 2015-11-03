import assert from 'assert';

export default function SearchQuery(query) {

  assert.equal(typeof query, 'object',
    "argument 'query' must be an object");

  assert.equal(typeof query.term, 'string',
    "argument 'query' must contain a 'term' property of type string");

  let queryLength = query.term.split(' ').length;

  let queryObject = {
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
    },
    sort : [
      {
        _score : {
          order: 'desc'
        }
      },
      {
        initial_publish_date: {
          order: 'desc'
        }
      }
    ]
  };

  if (queryLength === 1) {
    queryObject.sort.reverse();
  }

  return queryObject;
}
