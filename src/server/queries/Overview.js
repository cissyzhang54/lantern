import assert from 'assert';
import moment from 'moment';

import * as build from '../utils/queryBuilder'

export default function OverviewQuery(query) {

  assert.equal(typeof query, 'object',
    "argument 'query' should be an object");

  let overviewQuery = build.overviewQuery(query)

  return {
    query : overviewQuery,
    size: 1,
    aggs: {
      "page_views_over_time" : {
        "date_histogram" : {
          "field" : "view_timestamp",
          interval : calculateInterval(query),
          min_doc_count : 0
        }
      },
      referrer_types : {
        filter : {
          not : {
            term : {
              referrer_type : "internal"
            }
          }
        },
        aggs: {
          filtered : {
            terms: {
              field: "referrer_type",
              min_doc_count : 0
            }
          }
        }
      },
      referrer_names: {
        filter: {
          not: {
            term: {
              referrer_type: "internal"
            }
          }
        },
        aggs: {
          filtered: {
            terms: {
              field: "referrer_name"
            }
          }
        }
      },
      internal_referrer_types: {
        filter: {
          term: {
            referrer_type: "internal"
          }
        },
        aggs: {
          filtered: {
            terms: {
              field: "referrer_name"
            }
          }
        }
      },
      social_referrers: {
        filter: {
          term: {
            referrer_type: 'social-network'
          }
        },
        aggs: {
          filtered: {
            terms: {
              field: "referrer_name",
              min_doc_count: 0,
              size: 200000000
            }
          }
        }
      },
      regions: {
        terms: {
          field: "geo_region"
        }
      },
      countries: {
        terms: {
          field: "geo_country",
          size: 200000000
        }
      },
      user_cohort: {
        terms: {
          field: 'user_cohort',
          min_doc_count: 0
        }
      },
      rfv_cluster: {
        terms: {
          field: "rfv_cluster",
          min_doc_count: 0,
          order: {"_term": "asc"}
        }
      },
      is_first_visit: {
        terms: {
          field: "is_first_visit",
          min_doc_count: 0
        }
      },
      is_subscription: {
        terms: {
          field: "is_subscription"
        }
      },
      unique_visitors: {
        cardinality: {
          field: 'visitor_id'
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
