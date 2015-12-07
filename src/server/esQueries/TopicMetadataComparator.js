import assert from 'assert';
import TopicMetadataComparatorAggregation from '../aggregations/TopicMetadataComparator'
import TopicComparatorQuery from '../queries/topicComparatorQuery'

export default function TopicMetadataComparatorESQuery(query) {

  assert.equal(typeof query, 'object',
    "argument 'query' should be an object");

  let topicComparatorQuery = TopicComparatorQuery(query)

  let esQuery = {
    query: topicComparatorQuery,
    size: 1,
    aggs: TopicMetadataComparatorAggregation()
  };
  return esQuery
}
