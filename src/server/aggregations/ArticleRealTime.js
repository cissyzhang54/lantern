export default function ArticlesRealtimeAggregation(query) {

  const timespan = 'now-' + query.timespan + '/m';
  let interval = '60s';
  if (query.timespan === '48h') interval = '10m';

  return {
      realtime_links_clicked: {
        filter: {
          bool: {
            must: [
              {
                term: {
                  event_type: 'link'
                }
              },
              {
                range: {
                  event_timestamp: {
                    gte: timespan
                  }
                }
              }
            ]
          }
        }
      },
      realtime_links_clicked_by_category: {
        filter: {
          bool: {
            must: [
              {
                term: {
                  event_type: 'links clicked'
                }
              },
              {
                range: {
                  event_timestamp: {
                    gte: timespan
                  }
                }
              }
            ]
          }
        },
        aggs: {
          categories: {
            terms: {
              field: "event_category"
            }
          }
        }
      },
      realtime_referrer: {
        filter: {
          bool: {
            must: [
              {
                term: {
                  event_type: 'page'
                }
              },
              {
                term: {
                  event_category: 'view'
                }
              },
              {
              range: {
                event_timestamp: {
                  gte: timespan
                }
              }
            }
          ],
            must_not: {
              term: {
                referrer_type: "internal"
              }
            }
          }
        },
        aggs: {
          urls: {
            terms: {
              field: "referrer_url",
              size: 5
            }
          },
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
      realtime_social_referrer: {
        filter: {
          bool: {
            must: [
              {
                term: {
                  event_type: 'page'
                }
              },
              {
                term: {
                  event_category: 'view'
                }
              },
              {
                term: {
                  referrer_type: 'social-network'
                }
              },
              {
                range: {
                  event_timestamp: {
                    gte: timespan
                  }
                }
              }
            ]
          }
        },
        aggs: {
          names: {
            terms: {
              field: "referrer_name",
              min_doc_count: 0
            }
          }
        }
      },
      realtime_internal_referrer: {
        filter: {
          bool: {
            must: [
              {
                term: {
                  event_type: 'page'
                }
              },
              {
                term: {
                  event_category: 'view'
                }
              },
              {
                range: {
                  event_timestamp: {
                    gte: timespan
                  }
                }
              },
              {
                term: {
                  referrer_type: "internal"
                }
              }
            ]
          }
        },
        aggs: {
          urls : {
            terms: {
              field: "referrer_url",
              size: 5
            }
          },
          referrer_type_other : {
            missing : { field : "previous_article_uuid" }
          },
          referrer_type_article : {
              filter: {
                exists: {
                  field: "previous_article_uuid"
                }
             }
          }
        }
      },
      realtime_comments: {
         filter: {
           bool: {
             must: [
                {
                  term: {
                    event_type: 'page'
                  }
                },
                {
                  term: {
                    event_category: 'comment_posted'
                  }
                },
               {
                 range: {
                   event_timestamp: {
                     gte: timespan
                  }
                }
              }
            ]
          }
        }
      },
      realtime_comments_read: {
        filter: {
          bool: {
            must: [
              {
                term: {
                  event_type: 'comment'
                }
              },
              {
                term: {
                  event_category: 'view'
                }
              },
              {
                range: {
                  event_timestamp: {
                    gte: timespan
                  }
                }
              }
            ]
          }
        }
      },
      page_views: {
        filter : {
          bool : {
            must : [
              {
                term : {
                  event_type: 'page'
                }
              },
              {
                term : {
                  event_category: 'view'
                }
              },
              {
                range: {
                  event_timestamp : {
                    gte: timespan
                  }
                }
              }
            ]
          }
        },
        aggs : {
          filtered : {
            date_histogram : {
              field: 'event_timestamp',
              interval: interval, // XXX this is likely to change
              min_doc_count: 0,
              extended_bounds: {
                min: query.dateFrom,
                max: query.dateTo
              }
            }
          }
        }
      },
      page_views_shifted: {
        filter : {
          bool : {
            must : [
              {
                term : {
                  event_type: 'page'
                }
              },
              {
                term : {
                  event_category: 'view'
                }
              },
              {
                range: {
                  event_timestamp : {
                    gte: timespan,
                    lt: 'now-30m/m'
                  }
                }
              }
            ]
          }
        }
      },
      realtime_time_on_page : {
        filter: {
          bool: {
            must: [
              {
                term : {
                  event_type : 'page'
                }
              },
              {
                term : {
                  event_category: 'supplement'
                }
              },
              {
                range: {
                  event_timestamp: {
                    gte: timespan
                  }
                }
              }
            ]
          }
        },
        aggs: {
          time_on_page_avg: {
            avg: {
              field: 'attention_time'
            }
          },
          time_on_page_histogram: {
            date_histogram: {
              field: 'event_timestamp',
              interval: interval,
              min_doc_count: 0,
              extended_bounds: {
                min: query.dateFrom,
                max: query.dateTo
              }
            },
            aggs : {
              time_on_page_avg: {
                avg: {
                  field: "attention_time"
                }
              }
            }
          }
        }
      },
      realtime_scroll_depth : {
        filter: {
          bool : {
            must : [
              {
                term: {
                  event_type: 'page'
                }
              },
              {
                term: {
                  event_category: 'scroll'
                }
              },
              {
                "range": {
                  "event_timestamp": {
                    "gte": timespan,
                    "lte": "now"
                  }
                }
              },
              {
                "range": {
                  "scroll_depth": {
                    "gte": "-1"
                  }
                }
              }
            ]
          }
        },
        aggs: {
          scroll_depth_avg: {
            avg: {
              field: 'scroll_depth'
            }
          },
          scroll_depth_histogram: {
            date_histogram: {
              field: 'event_timestamp',
              interval: interval,
              min_doc_count: 0,
              extended_bounds: {
                min: query.dateFrom,
                max: query.dateTo
              }
            },
            aggs : {
              scroll_depth_avg: {
                avg: {
                  field: "scroll_depth"
                }
              }
            }
          }
        }
      },
      realtime_user_types: {
        filter: {
          bool: {
            must: [
              {
                term: {
                  event_category: "view"
                }
              },
              {
                range: {
                  event_timestamp: {
                    gte: timespan
                  }
                }
              }
            ]
          }
        },
        aggs: {
          cohorts: {
            terms: {
              field: "user_cohort",
              min_doc_count: 0
            }
          }
        }
      },
      last_publish_date : {
        terms : {
            field : "last_publish_date"
        }
      }
    }
}
