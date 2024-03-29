export default function ArticleComparatorAggregation() {
  return {
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
                        referrer_type: "social media"
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
      social_referrers : {
        filter : {
          term : {
            referrer_type : 'social media'
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
        filter: {
          term: {
            user_cohort: "anonymous"
          }
        },
        aggs: {
          anonymous: {
            terms: {
              field: "is_first_visit",
              min_doc_count : 0
            }
          }
        }
      },
      "regions" : {
        "terms": {
          "field": "geo_region"
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
      unique_visitors: {
        terms: {
          field: 'article_uuid',
          size: 10000000
        },
        aggs: {
          unique_visitors: {
            cardinality: {
              field: 'visitor_id'
            }
          }
        }
      }
  }
}
