import assert from 'assert';
import moment from 'moment';

import * as build from '../utils/queryBuilder'

export default function TopicQuery(query) {

  assert.equal(typeof query, 'object',
    "argument 'query' should be an object");

  let topicQuery = build.topicQuery(query)

  let esQuery = {
    query : topicQuery,
    size: 1,
    aggs: {
      is_first_visit: {
        terms: {
          field: "is_first_visit",
          min_doc_count: 0
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
