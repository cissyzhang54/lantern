import assert from 'assert';
import moment from 'moment';
import TopicAggregation from '../aggregations/Topics'
import TopicQuery from '../queries/topicQuery'

export default function TopicESQuery(query) {

  assert.equal(typeof query, 'object',
    "argument 'query' should be an object");

  let topicQuery = TopicQuery(query)

  // There are page views for which the publish date
  // is later than the view date. thus, time since
  // publish is negative which is like stupid so we need to
  // ensure view_timestamp is greater than the initial publish
  // date
  topicQuery.filtered.query.bool.must.push({
    range: {
      view_timestamp : {
        gte : query.dateFrom
      }
    }
  })

  let esQuery = {
    query : topicQuery,
    size: 1,
    aggs: TopicAggregation(query)
  };
  return esQuery
}
