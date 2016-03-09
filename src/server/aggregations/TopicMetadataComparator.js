export default function TopicMetadataComparatorAggregation() {
  return {
      distinct_articles_published: {
        cardinality: {
          field: "article_uuid"
        }
      }
    }
}
