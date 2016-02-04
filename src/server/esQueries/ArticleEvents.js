import assert from 'assert';
import ArticleEventsAggregation from '../aggregations/ArticleEvents'
import EventsQuery from '../queries/eventQuery'

export default function ArticleEventsESQuery(query) {

  assert.equal(typeof query, 'object',
    "argument 'query' should be an object");

  let articleQuery = EventsQuery(query)

  return {
    query : articleQuery,
    "size": 1,
    "aggs" : ArticleEventsAggregation(query)
  };
}
