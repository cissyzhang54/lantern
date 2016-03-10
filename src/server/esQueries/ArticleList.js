import assert from 'assert';

export default function ArticleListQuery(query) {

  assert.equal(typeof query, 'object',
    "argument 'query' should be an object");

  const termField = `${query.type}s_not_analyzed`
  const esQuery = {
    query: {
      bool: {
        must: [
          {
            match: {
              [termField] : query.value
            }
          },
          {
            range: {
              initial_publish_date: {
                from: query.dateFrom,
                to: query.dateTo
              }
            }
          },
          {
            match: {
              page_type: 'article'
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
          size: 1000000,
          order: {
            'initial_publish_date': 'desc'
          }
        },
        aggs: {
          initial_publish_date: {
            max: {
              field: "initial_publish_date"
            }
          },
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
          avg_time_on_page: {
            avg: {
              field: "time_on_page"
            }
          },
          retention: {
            filter: {
              bool: {
                must: [
                  {
                    term: {
                      is_last_page: false
                    }
                  }
                ]
              }
            }
          }
        }
      }
    }
  };

  return esQuery;

}
