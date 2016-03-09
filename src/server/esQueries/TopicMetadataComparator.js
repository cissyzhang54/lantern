import assert from 'assert';
import TopicMetadataComparatorAggregation from '../aggregations/TopicMetadataComparator'
import TopicMetadataComparatorQuery from '../queries/topicMetadataComparatorQuery'

export default function TopicMetadataComparatorESQuery(query) {

  assert.equal(typeof query, 'object',
    "argument 'query' should be an object");


  let esQuery = {
    query: TopicMetadataComparatorQuery(query),
    size: 1,
    aggs: TopicMetadataComparatorAggregation(query)
  };
  return esQuery
}
