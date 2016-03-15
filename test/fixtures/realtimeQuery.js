export default {
  query: {
    bool: {
      must : [
        {
          match: {
            article_uuid: "f02cca28-9028-11e5-bd82-c1fb87bef7af"
          }
        },
        {
          match: {
            page_type: 'article'
          }
        }
      ]
    }
  },
  size: 1,
  aggs: {
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
                  gte: "now-1h/m"
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
                  gte: "now-1h/m"
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
                gte: "now-1h/m"
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
                referrer_type: 'social media'
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
                  gte: "now-1h/m"
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
                  gte: "now-1h/m"
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
                  gte: "now-1h/m"
                }
              }
            }
          ]
        }
      }
    },
    page_views: {
      filter: {
        bool: {
          must: [
            {
              term: {
                event_type: "page"
              }
            },
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
        filtered: {
          date_histogram: {
            field: "event_timestamp",
            interval: "60s",
            min_doc_count: 0,
            extended_bounds: {
              min: "2015-11-24T10:15:00.000",
              max: "2015-11-24T11:15:00.000"
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
                  gte: "now-1h/m",
                  lt: 'now-30m/m'
                }
              }
            }
          ]
        }
      }
    },
    realtime_time_on_page: {
      filter: {
        bool: {
          must: [
            {
              term: {
                event_type: "page"
              }
            },
            {
              term: {
                event_category: "attention"
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
        time_on_page_avg : {
          percentiles : {
            field: "attention_time",
            percents: [50]
          }
        },
        time_on_page_histogram : {
          date_histogram: {
            field: "event_timestamp",
            interval: "60s",
            min_doc_count: 0,
            extended_bounds: {
              min: "2015-11-24T10:15:00.000",
              max: "2015-11-24T11:15:00.000"
            }
          },
          aggs : {
            time_on_page_avg: {
              percentiles : {
                field: "attention_time",
                percents: [50]
              }
            }
          }
        }
      }
    },
    realtime_scroll_depth: {
      filter: {
        bool: {
          must: [
            {
              term: {
                event_type: "page"
              }
            },
            {
              term: {
                event_category: "scrolldepth"
              }
            },
            {
              "range": {
                "event_timestamp": {
                  "gte": "now-1h/m",
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
          avg : {
            field: "scroll_depth"
          }
        },
        scroll_depth_histogram: {
          date_histogram: {
            field: 'event_timestamp',
            interval: '60s',
            min_doc_count: 0,
            extended_bounds: {
              min: "2015-11-24T10:15:00.000",
              max: "2015-11-24T11:15:00.000"
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
              term: {
                event_type: "page"
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
