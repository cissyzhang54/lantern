import assert from 'assert';
import ArticleComparatorAggregation from '../aggregations/ArticleComparator'
import ArticleComparatorQuery from '../queries/articleComparatorQuery'

export default function ArticleComparatorESQuery(query) {
  assert.equal(typeof query, 'object',
    "argument 'query' should be an object");

  let comparatorQuery = ArticleComparatorQuery(query)
  let must = comparatorQuery.filtered.query.bool.must;

  if (must.length <= 1) {
    delete comparatorQuery.filtered.query.bool.must;
  } else {
    comparatorQuery.filtered.query.bool.must.splice(0,1);
  }

  let esQuery = {
    "query" : comparatorQuery,
    "size": 1,
    "aggs" : ArticleComparatorAggregation(query)
  }
  return esQuery
}
