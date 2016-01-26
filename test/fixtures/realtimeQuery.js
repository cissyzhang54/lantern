export default {
  query: {
    match: {
      article_uuid: "f02cca28-9028-11e5-bd82-c1fb87bef7af"
    }
  },
  size: 1,
  aggs: {
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
                  gte: "now-1h/m"
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
    referrer_last_hour: {
      filter: {
        bool: {
          must: {
            range: {
              event_timestamp: {
                gte: "now-1h/m"
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
            "size": 5
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
            "size": 5
          }
        },
        names : {
          terms: {
            field: "referrer_name"
          }
        },
        types : {
          terms: {
            field: "page_type"
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
                  gte: "now-1h/m"
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
                  gte: "now-1h/m"
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
                  from: "2015-11-24T10:15:00.000",
                  to: "2015-11-24T11:15:00.000"
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
    time_on_page_last_hour: {
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
    live_page_views : {
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
                event_category: 'view'
              }
            },
            {
              range: {
                event_timestamp: {
                  gte: "now-5m/m"
                }
              }
            }
          ]
        }
      },
      aggs : {
        filtered: {
          cardinality: {
            field: 'visitor_id'
          }
        }
      }
    },
    scroll_depth_last_hour: {
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
        scroll_depth_last_hour_avg : {
          avg: {
            field: "scroll_depth"
          }
        },
        scroll_depth_last_hour_histogram : {
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
            scroll_depth_last_hour_avg: {
              avg : {
                field: "scroll_depth"
              }
            }
          }
        }
      }
    }
  }
}
