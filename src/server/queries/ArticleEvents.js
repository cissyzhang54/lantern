import assert from 'assert';
import * as build from '../utils/queryBuilder'

export default function ArticleEventsQuery(query) {

  assert.equal(typeof query, 'object',
    "argument 'query' should be an object");

  let articleQuery = build.eventQuery(query)

  return {
    query : articleQuery,
    "size": 1,
    "aggs" : {
      social_shares : {
        filter: {
          term: {
            "event_type" : "social share"
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

      page_clicks : {
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
          },
          category_breakdown : {
            terms: {
              "field" : "event_category"
            },
            aggs : {
              total_clicks : {
                sum: {
                  "field" : "event_value"
                }
              }
            }
          }
        }
      },

      "scroll_depth" : {
        "filter": {
          "term": {
            "event_type" : "scroll"
          }
        },
        "aggs": {
          "average_scroll" : {
            "avg":{
              "field": "event_value"
            }
          }
        }
      },
      page_comments : {
        filter: {
          term: {
            "event_type" : "comment"
          }
        },
        aggs : {
          views : {
            filter: {
              term: {
                "event_category" : "view"
              }
            }
          },
          posts : {
            filter: {
              term: {
                "event_category" : "posted"
              }
            },
            aggs: {
              total : {
                sum: {
                  "field" : "event_value"
                }
              }
            }
          }
        }
      },
      page_comment_views : {
        filter: {
          term: {
            "event_type" : "comment",
            "event_category" : "view"
          }
        }
      }
    }
  };
}
