import assert from 'assert';

export function checkString(query, prop){
  assert.equal(typeof query[prop], 'string',
    `argument 'query' must contain a '${prop}' string property`);
}

export function mapFilters(query){
  let filter = []
  for (var o in query.filters) {
    if (query.filters[o]) {
      query.filters[o].map((i) => {
        filter.push({
          "term": {[o]: i}
        })
      })
    }
  }
  return filter;
}
