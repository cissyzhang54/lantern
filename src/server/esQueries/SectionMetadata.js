import assert from 'assert';
import SectionMetadataAggregation from '../aggregations/SectionMetadata'
import SectionMetadataQuery from '../queries/sectionMetadataQuery';

export default function SectionMetadataESQuery(query) {

  assert.equal(typeof query, 'object',
    "argument 'query' should be an object");

  let sectionMetadataQuery = SectionMetadataQuery(query);

  let esQuery = {
    query: sectionMetadataQuery,
    aggs: SectionMetadataAggregation(query)
  };
  return esQuery
}
