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
      "page_views_over_time" : {
        "date_histogram" : {
          "field" : "view_timestamp",
          interval : calculateInterval(query),
          min_doc_count : 0
        }
      },
      referrer : {
        filter: {
          not: {
            term: {
              referrer_type: "internal"
            }
          }
        },
        aggs: {
          names: {
            terms: {
              field: "referrer_name"
            }
          },
          types: {
            terms: {
              field: "referrer_type",
              min_doc_count: 0
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
      internal_referrer: {
        filter: {
          term: {
            referrer_type: "internal"
          }
        },
        aggs: {
          urls : {
            terms: {
              field: "referrer"
            }
          },
          types : {
            terms: {
              field: "referrer_name"
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
      devices: {
        terms: {
          field: "device_type"
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
      },
      "section_views": {
        "terms": {
          "field": "sections",
          size: 10
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
