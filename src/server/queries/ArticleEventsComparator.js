import assert from 'assert';
import moment from 'moment';

import * as build from '../utils/queryBuilder'

export default function ArticleEventsComparatorQuery(query) {

  assert.equal(typeof query, 'object',
    "argument 'query' should be an object");

  let comparatorQuery = build.articleComparatorQuery(query)
  
  // we don't need the date range here
  let must = comparatorQuery.filtered.query.bool.must;
  if (must.length > 1) {
    must.splice(0,1);
  } else {
    delete comparatorQuery.filtered.query.bool.must;
  }

  return {
    "query" : comparatorQuery,
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
            "event_type" : "links clicked"
          }
        },
        aggs: {
          total_links_clicked : {
            sum: {
              "field" : "event_value"
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
      }
    }
  }
}
