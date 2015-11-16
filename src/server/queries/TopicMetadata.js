import assert from 'assert';
import moment from 'moment';

import * as build from '../utils/queryBuilder'

export default function TopicMetadataQuery(query) {

  assert.equal(typeof query, 'object',
    "argument 'query' should be an object");

  let topicQuery = build.topicQuery(query)

  let esQuery = {
    query: topicQuery,
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
