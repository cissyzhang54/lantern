import assert from 'assert';
import moment from 'moment';

import * as build from '../utils/queryBuilder'

export default function SectionsMetadataQuery(query) {

  assert.equal(typeof query, 'object',
    "argument 'query' should be an object");

  let sectionQuery = build.sectionQuery(query)

  let esQuery = {
    query: sectionQuery,
    size: 1,
    aggs: {
      "topics_covered": {
        "cardinality": {
          "field": "topics"
        }
      }
    }
  };
  return esQuery
}
