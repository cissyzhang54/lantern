export default function ArticlesRealtimeAggregation(query) {
  return {
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
                    from: query.dateFrom,
                    to: query.dateTo
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
              interval: '60s', // XXX this is likely to change
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
                    gte: "now-1h/m"
                  }
                }
              }
            ]
          }
        },
        aggs: {
          filtered: {
            avg: {
              field: 'attention_time'
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
          filtered: {
            avg: {
              field: 'scroll_depth'
            }
          }
        }
      }
    }
}