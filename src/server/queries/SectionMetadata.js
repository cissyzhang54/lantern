import assert from 'assert';
import moment from 'moment';

import * as calculateInterval from '../utils/calculateInterval'
import * as build from '../utils/queryBuilder'

export default function SectionMetadataQuery(query) {

  assert.equal(typeof query, 'object',
    "argument 'query' should be an object");

  let sectionQuery = build.sectionQuery(query)
  let esQuery = {
    query: sectionQuery,
    aggs: {
      articles_published_over_time: {
        date_histogram: {
          field: "initial_publish_date",
            interval: calculateInterval.interval(query.dateFrom, query.dateTo),
              min_doc_count: 0
        }
      },
      topics_covered: {
        cardinality: {
          field: "topics"
        }
      },
      topic_count: {
        terms: {
          field: "topics",
          size : 10
        }
      }
    }
  };
  return esQuery
}
