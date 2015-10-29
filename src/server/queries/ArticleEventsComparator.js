import assert from 'assert';
import moment from 'moment';

import * as build from './queryBuilder'

export default function ArticleEventsComparatorQuery(query) {

  assert.equal(typeof query, 'object',
    "argument 'query' should be an object");

  let comparatorQuery = build.comparatorQuery(query)

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
            "event_type" : "comment",
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
  }
}
