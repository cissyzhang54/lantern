import assert from 'assert';
import moment from 'moment';

import * as build from '../utils/queryBuilder'

export default function PageViewsQuery(query) {

  assert.equal(typeof query, 'object',
    "argument 'query' should be an object");

  let articleQuery = build.articleQuery(query)

  return {
    query : articleQuery,
    size: 1,
    aggs: {
      page_views_since_publish: {
        histogram: {
          field: "time_since_publish",
          interval: calculateMinuteInterval(query),
          min_doc_count : 0
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
      channels: {
        terms: {
          field: "channel"
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
      referrer_urls: {
        filter: {
          not: {
            filter: {
              or: [
                {
                  term: {
                    referrer_type: 'search'
                  }
                },
                {
                  term: {
                    referrer_type: 'internal'
                  }
                },
                {
                  term: {
                    referrer_type: 'social-network'
                  }
                },
                {
                  prefix: {
                    referrer: 'http://localhost'
                  }
                },
                {
                  prefix: {
                    referrer: 'http://lantern.ft.com'
                  }
                },
                {
                  prefix: {
                    referrer: 'https://lantern.ft.com'
                  }
                },
                {
                  prefix: {
                    referrer: 'http://ft-editorial-lantern'
                  }
                }
              ]
            }
          }
        },
        aggs: {
          filtered: {
            terms: {
              field: 'referrer'
            }
          }
        }
      },
      internal_referrer_urls: {
        filter: {
          term: {
            referrer_type: "internal"
          }
        },
        aggs: {
          filtered: {
            terms: {
              field: "referrer"
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
      devices: {
        terms: {
          field: "device_type"
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
      is_last_page: {
        terms: {
          field: 'is_last_page',
          min_doc_count: 0
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
      next_internal_url: {
        terms: {
          field: "next_internal_url"
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


