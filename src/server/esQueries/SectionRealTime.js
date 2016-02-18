import assert from 'assert';
import RealtimeArticleListQuery from './RealtimeArticleList';

export default function SectionRealtimeESQuery(query) {
  assert.equal(typeof query, 'object',
    "argument 'query' should be an object");

  assert.equal(typeof query.timespan, 'string',
    "argument 'query' should contain a timespan string")

  assert.ok(/(\d+)(\w+)/.test(query.timespan),
    "argument query.timespan should be a timespan string (i.e. 48h)")

  assert.equal(typeof query.section, 'string',
    "argument 'query' should contain a 'section' string")

  const timespan = 'now-' + query.timespan + '/m';
  let interval = '60s';
  if (query.timespan === '48h') interval = '10m';
  if (query.timespan === '24h') interval = '15m';

  const esQuery = {
    query: {
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
            match: {
              primary_section : query.section
            }
          }
        ]
      }
    } ,
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
      topics_covered: {
        cardinality: {
          field: 'topics'
        }
      },
      articles_published: {
        cardinality: {
          field: 'article_uuid'
        }
      }
    }
  }


  Object.assign(esQuery.aggs, RealtimeArticleListQuery(query).aggs);

  return esQuery;

}
