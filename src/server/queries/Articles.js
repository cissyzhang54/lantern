export default function PageViewsQuery(query) {
  return {
    query : {
      filtered : {
        query : {
          match : {
            article_uuid: query.uuid
          }
        },
        filter : {
          range : {
            view_timestamp : {
              from: query.dateFrom,
              to: query.dateTo
            }
          }
        }
      }
    },
    size: 1,
    aggs : {
      page_views_over_time : {
        date_histogram : {
          field : "view_timestamp",
          interval : "hour"
        }
      }
    }
  };
}
