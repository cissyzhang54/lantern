import * as calculateInterval from '../utils/calculateInterval'

export default function TopicMetadataAggregation(query) {

  return {
      articles_published_over_time: {
        date_histogram: {
          field: "initial_publish_date",
          interval: calculateInterval.interval(query.dateFrom, query.dateTo),
          min_doc_count: 0
        }
      },
      distinct_articles_published: {
        cardinality: {
          field: "article_uuid"
        }
      }
    }
}
