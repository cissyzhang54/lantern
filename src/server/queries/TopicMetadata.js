import assert from 'assert';
import moment from 'moment';

import * as calculateInterval from '../utils/calculateInterval'
import * as build from '../utils/queryBuilder'

export default function TopicMetadataQuery(query) {

  assert.equal(typeof query, 'object',
    "argument 'query' should be an object");

  let topicQuery = build.topicQuery(query)

  let esQuery = {
    query: topicQuery,
    aggs: {
      articles_published_over_time: {
        date_histogram: {
          field: "initial_publish_date",
          interval: calculateInterval.interval(query.dateFrom, query.dateTo),
          min_doc_count: 0
        }
      },
      distinct_articles: {
        cardinality: {
          field: "article_uuid"
        }
      }
    }
  };
  return esQuery
}
