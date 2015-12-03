import assert from 'assert';
import moment from 'moment';
import SectionMetadataAggregation from '../aggregations/SectionMetadata'
import SectionQuery from '../queries/sectionQuery';

export default function SectionMetadataESQuery(query) {

  assert.equal(typeof query, 'object',
    "argument 'query' should be an object");

  let sectionQuery = SectionQuery(query);

  let esQuery = {
    query: sectionQuery,
    aggs: SectionMetadataAggregation(query)
  };
  return esQuery
}
