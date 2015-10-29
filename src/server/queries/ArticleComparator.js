import assert from 'assert';
import moment from 'moment';

import * as build from './queryBuilder'

export default function ArticleComparatorQuery(query) {

  assert.equal(typeof query, 'object',
    "argument 'query' should be an object");

  let comparatorQuery = build.comparatorQuery(query)

  return {
    "query" : comparatorQuery,
    "size": 1,
    "aggs" : {
      page_views_since_publish: {
        histogram: {
          field: "time_since_publish",
          interval: calculateMinuteInterval(query)
        }
      },
      "page_views_over_time" : {
        "date_histogram" : {
          "field" : "view_timestamp",
          interval : calculateInterval(query),
          min_doc_count : 0
        }
      },
      avg_time_on_page : {
        avg : {
          field: "time_on_page"
        }
      },
      "page_view_total_count" : {
        "value_count" : {
          "field" : "article_uuid"
        }
      },
      "distinct_articles" : {
        "cardinality" : {
          "field" : "article_uuid"
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
      social_referrers : {
        filter : {
          term : {
            referrer_type : 'social-network'
          }
        },
        aggs: {
          filtered: {
            terms : {
              field : 'referrer_name',
              min_doc_count : 0,
              size: 200000000
            }
          }
        }
      },
      is_last_page: {
        terms: {
          field: 'is_last_page',
          min_doc_count : 0
        }
      },
      user_cohort : {
        terms : {
          field : 'user_cohort',
          min_doc_count : 0
        }
      },
      rfv_cluster: {
        terms : {
          field : "rfv_cluster",
          min_doc_count : 0
        }
      },
      is_first_visit : {
        terms: {
          field: "is_first_visit",
          min_doc_count : 0
        }
      },
      "regions" : {
        "terms": {
          "field": "geo_region"
        }
      },
      internal_referrer_types: {
        filter : {
          term : {
            referrer_type : "internal"
          }
        },
        aggs : {
          filtered : {
            terms : {
              field : "referrer_name"
            }
          }
        }
      }
    }
  }
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

function calculateMinuteInterval(query) {
  let from = moment(query.dateFrom);
  let to = moment(query.dateTo);
  let span = moment.duration(to - from);

  if (span <= moment.duration(1, 'day')) {
    return 60;
  } else if (span <= moment.duration(1, 'week')) {
    return 60;
  } else if (span <= moment.duration(6, 'month')) {
    return 60*24;
  } else {
    return 60*24*7;
  }

}
