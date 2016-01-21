export default function ArticlesRealtimeAllAggregation(query) {
  return {
    next_internal_url: {
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
                event_timestamp: {
                  gte: 'now-48h/m'
                }
              }
            }
          ]
        }
      },
      aggs : {
        titles: {
          terms: {
            field: "title_not_analyzed",
            size: 10
          },
          aggs: {
            top_tag_hits: {
              top_hits: {
                sort: [
                  {
                    article_uuid: {
                      order: "desc"
                    }
                  }
                ],
                _source: {
                  include: [
                    "title_not_analyzed",
                    "article_uuid",
                    "page_type"
                  ]
                },
                size: 1
              }
            }
          }
        }
      }
    },
    retention_rate : {
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
                event_timestamp: {
                  gte: 'now-48h/m',
                  lt: 'now-30m/m'
                }
              }
            },
            {
              term: {
                previous_article_uuid: query.uuid
              }
            }
          ]
        }
      },
      aggs: {
        filtered: {
          value_count: {
            field: 'article_uuid'
          }
        },
        retention_last_hour_histogram: {
          date_histogram: {
            field: "event_timestamp",
            interval: "60s",
            min_doc_count: 0,
            extended_bounds: {
              min: query.dateFrom,
              max: query.dateTo
            }
          },
          aggs : {
            retention_last_hour_count: {
              value_count: {
                field: "article_uuid"
              }
            }
          }
        }


      }
    }
  }
}
