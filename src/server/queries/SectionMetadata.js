import assert from 'assert';
import moment from 'moment';

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
            interval: calculateInterval(query),
              min_doc_count: 0
        }
      },
      topics_covered: {
        cardinality: {
          field: "topics"
        }
      },
      distinct_articles: {
        cardinality: {
          field: "article_uuid"
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

function calculateInterval(query) {
  let from = moment(query.dateFrom);
  let to = moment(query.dateTo);
  let span = moment.duration(to - from);

  if (span <= moment.duration(1, 'day')) {
    return 'hour';
  } else if (span <= moment.duration(1, 'week')) {
    return 'day';
  } else if (span <= moment.duration(6, 'month')) {
    return 'day';
  } else {
    return 'week';
  }
}
