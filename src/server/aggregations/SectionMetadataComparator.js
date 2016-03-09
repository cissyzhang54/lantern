export default function SectionMetadataComparatorAggregation() {
  return {
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
