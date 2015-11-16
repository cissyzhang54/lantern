import assert from 'assert';


const supportedOperators = {
  title: [0,1],
  authors: [2],
  author: [2],
  sections: [3],
  section: [3]
}

export default function SearchQuery(query) {

  assert.equal(typeof query, 'object',
    "argument 'query' must be an object");

  assert.equal(typeof query.term, 'string',
    "argument 'query' must contain a 'term' property of type string");

  let term = query.term;
  let queryLength = query.term.split(' ').length;
  let complexQuery = parseComplexQuery(query.term);

  if (complexQuery) {
    term = complexQuery.value;
  }


  let queryObject = {
    query : {
      bool : {
        should : [
          {
            match : {
              title : term
            }
          },
          {
            match_phrase : {
              title: term
            }
          },
          {
            match_phrase: {
              authors: term
            }
          },
          {
            match_phrase: {
              sections: term
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

  if (complexQuery || queryLength === 1) {
    queryObject.sort.reverse();
  }

  if (!complexQuery) {
    return queryObject;
  }

  let operator = complexQuery.operator;
  let indices = supportedOperators[operator];
  if (!indices) {
    return queryObject
  }

  let conditions = queryObject.query.bool.should;
  queryObject.query.bool.should = indices.map((i) => conditions[i]);

  return queryObject;
}


let queryRegex = /([^:]+?):"([^"]+?)"/;
function parseComplexQuery(term) {
  if (!queryRegex.test(term)) return false;

  let result = queryRegex.exec(term);

  return {
    operator: result[1],
    value: result[2]
  }

}
