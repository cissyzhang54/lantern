import assert from 'assert';
import TopArticlesAggregation from '../aggregations/TopArticles'
import TopArticleQuery from '../queries/topArticleQuery'

export default function TopArticlesESQuery(query) {

  assert.equal(typeof query, 'object',
    "argument 'query' should be an object");

  return {
    query: TopArticleQuery(query),
    size: 1,
    aggs: TopArticlesAggregation(query)
  }
}
