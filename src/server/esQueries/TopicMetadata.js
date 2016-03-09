import assert from 'assert';
import TopicMetadataAggregation from '../aggregations/TopicMetadata'
import TopicMetadataQuery from '../queries/topicMetadataQuery'

export default function TopicMetadataESQuery(query) {

  assert.equal(typeof query, 'object',
    "argument 'query' should be an object");

  let esQuery = {
    query: TopicMetadataQuery(query),
    aggs: TopicMetadataAggregation(query)
  };
  return esQuery
}
