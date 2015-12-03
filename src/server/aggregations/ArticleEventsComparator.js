export default function ArticleEventsComparatorAggregation() {
  return {
    social_shares: {
      filter: {
        term: {
          "event_type": "social share"
        }
      },
      aggs: {
        filtered: {
          terms: {
            field: "event_category"
          }
        }
      }
    },
    page_clicks: {
      filter: {
        term: {
          "event_type": "links clicked"
        }
      },
      aggs: {
        total_links_clicked: {
          sum: {
            "field": "event_value"
          }
        }
      }
    },
    page_comments: {
      filter: {
        term: {
          "event_type": "comment"
        }
      },
      aggs: {
        views: {
          filter: {
            term: {
              "event_category": "view"
            }
          }
        },
        posts: {
          filter: {
            term: {
              "event_category": "posted"
            }
          },
          aggs: {
            total: {
              sum: {
                "field": "event_value"
              }
            }
          }
        }
      }
    },
    "scroll_depth": {
      "filter": {
        "term": {
          "event_type": "scroll"
        }
      },
      "aggs": {
        "average_scroll": {
          "avg": {
            "field": "event_value"
          }
        }
      }
    }
  }
}
