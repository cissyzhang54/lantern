import assert from 'assert';
import SectionComparatorAggregation from '../aggregations/SectionComparator'
import SectionComparatorQuery from '../queries/sectionComparatorQuery'

export default function SectionComparatorESQuery(query) {

  assert.equal(typeof query, 'object',
    "argument 'query' should be an object");

  let sectionQuery = SectionComparatorQuery(query)

  let esQuery = {
    query : sectionQuery,
    size: 1,
    aggs: SectionComparatorAggregation(query)
  };
  return esQuery
}
