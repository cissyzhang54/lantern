import assert from 'assert';
import ArticleEventsComparatorAggregation from '../aggregations/ArticleEventsComparator'
import ArticleComparatorQuery from '../queries/articleComparatorQuery'

export default function ArticleEventsComparatorESQuery(query) {

  assert.equal(typeof query, 'object',
    "argument 'query' should be an object");

  let comparatorQuery = ArticleComparatorQuery(query)

  // we don't need the date range here
  let must = comparatorQuery.filtered.query.bool.must;
  if (must.length > 1) {
    must.splice(0,1);
  } else {
    delete comparatorQuery.filtered.query.bool.must;
  }
  return {
    "query" : comparatorQuery,
    "size": 0,
    "aggs" : ArticleEventsComparatorAggregation()
  };
}
