import assert from 'assert';

export default function RealitmeArticleListQuery(query) {
  assert.equal(typeof query, 'object',
    "argument 'query' must be an object");

  const timespan = 'now-' + query.timespan + '/m';
  let interval = '60s';
  if (query.timespan === '48h') interval = '10m';
  if (query.timespan === '24h') interval = '15m';

  const termField = `${query.type}s_not_analyzed`;
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
              [termField] : query[query.type]
            }
          }
        ]
      }
    },
    size: 0,
    aggs: {
      articles: {
        terms: {
          field: 'article_uuid',
          size: 1000,
          order: {
            publish_date: 'desc'
          }
        },
        aggs: {
          metadata: {
            top_hits: {
              sort: [
                {
                  article_uuid: {
                    order: 'desc'
                  }
                }
              ],
              _source: {
                include: [
                  "title",
                  "article_uuid",
                  "sections_not_analyzed",
                  "initial_publish_date"
                ]
              },
              size: 1
            }
          },
          publish_date: {
            max: {
              field: 'initial_publish_date'
            }
          },
          page_views: {
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
                  }
                ]
              }
            },
            aggs: {
              page_views_over_time: {
                date_histogram: {
                  field: 'event_timestamp',
                  interval: interval,
                  min_doc_count: 0
                }
              }
            }
          },
          time_on_page: {
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
                      event_category: 'attention'
                    }
                  }
                ]
              }
            },
            aggs: {
              average: {
                avg: {
                  field: 'attention_time'
                }
              }
            }
          }
        }
      }
    }
  };

  return esQuery;

}
