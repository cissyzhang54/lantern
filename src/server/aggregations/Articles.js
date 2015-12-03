import * as calculateInterval from '../utils/calculateInterval'

export default function ArticlesAggregation(query) {
  return {
      page_views_since_publish: {
        histogram: {
          field: "time_since_publish",
          interval: calculateInterval.minuteInterval(query.dateFrom, query.dateTo),
          min_doc_count : 0
        }
      },
      "page_views_over_time" : {
        "date_histogram" : {
          "field" : "view_timestamp",
          interval : calculateInterval.interval(query.dateFrom, query.dateTo),
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
          },
          urls: {
            filter: {
              not: {
                filter: {
                  or: [
                    {
                      term: {
                        referrer_type: "search"
                      }
                    },
                    {
                      term: {
                        referrer_type: "social-network"
                      }
                    },
                    {
                      prefix: {
                        referrer: "http://localhost"
                      }
                    },
                    {
                      prefix: {
                        referrer: "http://lantern.ft.com"
                      }
                    },
                    {
                      prefix: {
                        referrer: "https://lantern.ft.com"
                      }
                    },
                    {
                      prefix: {
                        referrer: "http://ft-editorial-lantern"
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
}
