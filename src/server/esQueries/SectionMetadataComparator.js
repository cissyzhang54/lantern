import assert from 'assert';
import moment from 'moment';
import SectionMetadataComparatorAggregation from '../aggregations/SectionMetadataComparator'
import SectionComparatorQuery from '../queries/sectionComparatorQuery'

export default function SectionMetadataComparatorESQuery(query) {

  assert.equal(typeof query, 'object',
    "argument 'query' should be an object");

  let sectionComparatorQuery = SectionComparatorQuery(query)
  let esQuery = {
    query: sectionComparatorQuery,
    size: 1,
    aggs: SectionMetadataComparatorAggregation()
  };
  return esQuery
}
