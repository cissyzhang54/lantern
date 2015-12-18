import assert from 'assert';
import ArticleRealtimeAllAggregation from '../aggregations/ArticleRealTimeAll'

export default function ArticlesRealtimeESQuery(query) {
  assert.equal(typeof query, 'object',
    "argument 'query' should be an object");

  assert.equal(typeof query.dateFrom, 'string',
    "argument 'query' should contain a dateFrom string")

  assert.equal(typeof query.dateTo, 'string',
    "argument 'query' should contain a dateTo string")

  assert.equal(typeof query.uuid, 'string',
    "argument 'query' should contain a 'uuid' string")

  return {
    query: {
      match: {
        previous_article_uuid: query.uuid
      }
    },
    size: 1,
    aggs: ArticleRealtimeAllAggregation(query)
  }
}
