import assert from 'assert';

export default function RealitmeArticleListQuery(query) {
  assert.equal(typeof query, 'object',
    "argument 'query' must be an object");

  const termField = `primary_${query.type}`;
  const esQuery = {
    query: {
      bool: {
        must: [
          {
            range: {
              event_timestamp: {
                gte: 'now-1d/d'
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
          field: 'article_uuid'
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
                  "primary_section",
                  "initial_publish_date"
                ]
              },
              size: 1
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
                      event_type: 'view'
                    }
                  }
                ]
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
                      event_category: 'supplement'
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
