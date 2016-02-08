export default {
  query: {
    match: {
      article_uuid: "f02cca28-9028-11e5-bd82-c1fb87bef7af"
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
                referrer_type: 'social-network'
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
    realtime_social_shares: {
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
                  gte: "now-1h/m"
                }
              }
            }
          ]
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
                event_category: "supplement"
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
          avg: {
            field: "attention_time"
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
              avg : {
                field: "attention_time"
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
                event_category: "scroll"
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
        scroll_depth_avg: {
          avg : {
            field: "scroll_depth"
          }
        },
        scroll_depth_histogram : {
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
