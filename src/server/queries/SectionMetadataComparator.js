import assert from 'assert';
import moment from 'moment';

import * as build from '../utils/queryBuilder'

export default function SectionMetadataComparatorQuery(query) {

  assert.equal(typeof query, 'object',
    "argument 'query' should be an object");

  let sectionComparatorQuery = build.sectionComparatorQuery(query)

  let esQuery = {
    query: sectionComparatorQuery,
    size: 1,
    aggs: {
      "topics_covered": {
        "cardinality": {
          "field": "topics"
        }
      },
      "distinct_articles": {
        "cardinality": {
          "field": "article_uuid"
        }
      }
    }
  };
  return esQuery
}
