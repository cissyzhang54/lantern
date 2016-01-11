import assert from 'assert';
import TopArticleEventsAggregation from '../aggregations/TopArticleEvents'
import TopArticleEventsQuery from '../queries/topArticleEventQuery'

export default function ArticleEventsESQuery(query) {

  assert.equal(typeof query, 'object',
    "argument 'query' should be an object");

  return {
    query : TopArticleEventsQuery(query),
    "size": 1,
    "aggs" : TopArticleEventsAggregation(query)
  };
}
