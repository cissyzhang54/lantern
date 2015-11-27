import assert from 'assert';
import moment from 'moment';

const root = process.env.ES_REALTIME_INDEX_ROOT;

export default function ArticlesRealtimeQuery(query) {
  assert.equal(typeof query, 'object',
    "argument 'query' should be an object");

  assert.equal(typeof query.dateFrom, 'string',
    "argument 'query' should contain a dateFrom string")

  assert.equal(typeof query.dateTo, 'string',
    "argument 'query' should contain a dateTo string")

  assert.equal(typeof query.uuid, 'string',
    "argument 'query' should contain a 'uuid' string")

  return {
    query: {
      filtered: {
        query: {
          match: {
            article_uuid : query.uuid
          }
        },
        filter: {
          range: {
            event_timestamp : {
              from: query.dateFrom,
              to: query.dateTo
            }
          }
        }
      }
    },
    size: 1,
    aggs: {
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
      }
    }
  }
}
