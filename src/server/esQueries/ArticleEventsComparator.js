import assert from 'assert';
import ArticleEventsComparatorAggregation from '../aggregations/ArticleEventsComparator'
import ArticleComparatorQuery from '../queries/articleComparatorQuery'

export default function ArticleEventsComparatorESQuery(query) {

  assert.equal(typeof query, 'object',
    "argument 'query' should be an object");

  let comparatorQuery = ArticleComparatorQuery(query)

  return {
    "query" : comparatorQuery,
    "size": 0,
    "aggs" : ArticleEventsComparatorAggregation()
  };
}
