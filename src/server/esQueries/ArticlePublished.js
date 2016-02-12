import assert from 'assert';
import ArticlesAggregation from '../aggregations/Articles'
import ArticleQuery from '../queries/articleQuery.js'

export default function ArticlePublishedESQuery(query) {

  assert.equal(typeof query, 'object',
    "argument 'query' should be an object");

  return {
    query : {
      filtered : {
        query : {
          match : {  article_uuid: query.uuid  }
        }
      }
    },
    size: 1,
    aggs: {
      last_publish_date : {
        terms : {
          field : "publish_datetimes"
        }
      }
    }
  }
}
