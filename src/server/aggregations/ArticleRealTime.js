export default function ArticlesRealtimeAggregation(query) {

  const timespan = 'now-' + query.timespan + '/m';
  let interval = '60s';
  if (query.timespan === '48h') interval = '10m';

  return {
      links_clicked_last_hour: {
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
      links_clicked_by_category_last_hour: {
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
      referrer_last_hour: {
        filter: {
          bool: {
            must: {
              range: {
                event_timestamp: {
                  gte: timespan
                }
              }
            },
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
      internal_referrer_last_hour: {
        filter: {
          bool: {
            must: [
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
          names: {
            terms: {
              field: "referrer_name"
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
      social_shares_last_hour: {
        filter: {
          bool: {
            must: [
              {
                term: {
                  event_type: 'share'
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
      comments_last_hour: {
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
      comments_read_last_hour: {
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
                    gte: "now-1h/m"
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
      time_on_page_last_hour : {
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
      scroll_depth_last_hour : {
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
                range: {
                  event_timestamp: {
                    gte: 'now-1h/m'
                  }
                }
              }
            ]
          }
        },
        aggs: {
          scroll_depth_last_hour_avg: {
            avg: {
              field: 'scroll_depth'
            }
          },
          scroll_depth_last_hour_histogram: {
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
              scroll_depth_last_hour_avg: {
                avg: {
                  field: "scroll_depth"
                }
              }
            }
          }
        }
      },
      user_types_last_hour: {
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
                    gte: "now-1h/m"
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
