import assert from 'assert';
import moment from 'moment';

import * as build from '../utils/queryBuilder'

export default function TopicMetadataComparatorQuery(query) {

  assert.equal(typeof query, 'object',
    "argument 'query' should be an object");

  let topicComparatorQuery = build.topicComparatorQuery(query)

  let esQuery = {
    query: topicComparatorQuery,
    size: 1,
    aggs: {
      "distinct_articles": {
        "cardinality": {
          "field": "article_uuid"
        }
      }
    }
  };
  return esQuery
}
