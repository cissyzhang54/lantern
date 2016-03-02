import assert from 'assert';
import SectionMetadataComparatorAggregation from '../aggregations/SectionMetadataComparator'
import SectionMetadataComparatorQuery from '../queries/sectionMetadataComparatorQuery'

export default function SectionMetadataComparatorESQuery(query) {

  assert.equal(typeof query, 'object',
    "argument 'query' should be an object");

  let sectionMetadataComparatorQuery = SectionMetadataComparatorQuery(query)
  let esQuery = {
    query: sectionMetadataComparatorQuery,
    size: 1,
    aggs: SectionMetadataComparatorAggregation()
  };
  return esQuery
}
