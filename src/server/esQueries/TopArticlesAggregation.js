import assert from 'assert';
import TopArticlesAggregation from '../aggregations/TopArticlesAggregation'
import TopArticleAggregationQuery from '../queries/topArticleAggregationQuery'

export default function TopArticlesESQuery(query) {

  assert.equal(typeof query, 'object',
    "argument 'query' should be an object");

  return {
    query: TopArticleAggregationQuery(query),
    size: 1,
    aggs: TopArticlesAggregation(query)
  }
}
