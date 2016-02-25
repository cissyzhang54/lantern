import assert from 'assert';
import ArticleComparatorAggregation from '../aggregations/ArticleComparator'
import ArticleComparatorQuery from '../queries/articleComparatorQuery'

export default function ArticleComparatorESQuery(query) {
  assert.equal(typeof query, 'object',
    "argument 'query' should be an object");

  let comparatorQuery = ArticleComparatorQuery(query)


  let esQuery = {
    "query" : comparatorQuery,
    "size": 1,
    "aggs" : ArticleComparatorAggregation(query)
  }
  return esQuery
}
