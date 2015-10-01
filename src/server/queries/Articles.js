import assert from 'assert';
import moment from 'moment';

export default function PageViewsQuery(query) {

  assert.equal(typeof query, 'object',
    "argument 'query' should be an object");

  assert.equal(typeof query.uuid, 'string',
    "argument 'query' must contain a 'uuid' string property");

  assert.equal(typeof query.dateFrom, 'string',
    "argument 'query' must contain a 'dateFrom' date string property");

  assert.equal(typeof query.dateTo, 'string',
    "argument 'query' must contain a 'dateTo' date property");

  return {
    query : {
      filtered : {
        query : {
          match : {
            article_uuid: query.uuid
          }
        },
        filter : {
          range : {
            view_timestamp : {
              from: query.dateFrom,
              to: query.dateTo
            }
          }
        }
      }
    },
    size: 1,
    aggs : {
      page_views_over_time : {
        date_histogram : {
          field : "view_timestamp",
          interval : calculateInterval(query)
        }
      },
      avg_time_on_page : {
        avg : {
          field: "time_on_page"
        }
      },
      channels : {
        terms: {
          field: "channel"
        }
      },
      referrer_types : {
        terms: {
          field: "referrer_type"
        }
      },
      referrer_names : {
        terms: {
          field: "referrer_name"
        }
      }
    }
  };
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
