import assert from 'assert';
import moment from 'moment';
import TopicMetadataAggregation from '../aggregations/TopicMetadata'
import TopicQuery from '../queries/topicQuery'

export default function TopicMetadataESQuery(query) {

  assert.equal(typeof query, 'object',
    "argument 'query' should be an object");

  let topicQuery = TopicQuery(query)

  let esQuery = {
    query: topicQuery,
    aggs: TopicMetadataAggregation(query)
  };
  return esQuery
}
