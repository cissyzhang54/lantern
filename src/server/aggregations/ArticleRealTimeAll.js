export default function ArticlesRealtimeAllAggregation() {
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
    }
  }
}
