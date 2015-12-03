import assert from 'assert';
import moment from 'moment';
import ArticleRealtimeAggregation from '../aggregations/ArticleRealTime'

const root = process.env.ES_REALTIME_INDEX_ROOT;

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
        article_uuid : query.uuid
      }
    },
    size: 1,
    aggs: ArticleRealtimeAggregation(query)
  }
}
