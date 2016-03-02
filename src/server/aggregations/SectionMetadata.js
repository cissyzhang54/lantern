import * as calculateInterval from '../utils/calculateInterval'

export default function SectionMetadataAggregation(query) {
  return {
      articles_published_over_time: {
        date_histogram: {
          field: "initial_publish_date",
            interval: calculateInterval.interval(query.dateFrom, query.dateTo),
              min_doc_count: 0
        }
      },
      topics_covered: {
        cardinality: {
          field: "topics_not_analyzed"
        }
      },
      topic_count: {
        terms: {
          field: "topics_not_analyzed",
          size : 10
        }
      },
      distinct_articles_published: {
        cardinality: {
          field: "article_uuid"
        }
      }
    }
}
