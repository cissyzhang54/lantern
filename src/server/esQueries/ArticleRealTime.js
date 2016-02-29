import assert from 'assert';
import ArticleRealtimeAggregation from '../aggregations/ArticleRealTime'

export default function ArticlesRealtimeESQuery(query) {
  assert.equal(typeof query, 'object',
    "argument 'query' should be an object");

  assert.equal(typeof query.timespan, 'string',
    "argument 'query' should contain a timespan string")

  assert.ok(/(\d+)(\w+)/.test(query.timespan),
    "argument query.timespan should be a timespan string (i.e. 48h)")

  assert.equal(typeof query.uuid, 'string',
    "argument 'query' should contain a 'uuid' string")

  return {
    query: {
      bool: {
        must: [
          {
            match: {
              article_uuid : query.uuid
            }
          },
          {
            match: {
              page_type: 'article'
            }
          }
        ]
      }
    },
    size: 1,
    aggs: ArticleRealtimeAggregation(query)
  }
}
