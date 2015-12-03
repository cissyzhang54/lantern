import assert from 'assert';
import moment from 'moment';
import TopicComparatorAggregation from '../aggregations/TopicComparator'
import TopicComparatorQuery from '../queries/topicComparatorQuery'

export default function TopicComparatorESQuery(query) {

  assert.equal(typeof query, 'object',
    "argument 'query' should be an object");

  let topicQuery = TopicComparatorQuery(query)

  let esQuery = {
    query : topicQuery,
    size: 1,
    aggs: TopicComparatorAggregation(query)
  };
  return esQuery
}
