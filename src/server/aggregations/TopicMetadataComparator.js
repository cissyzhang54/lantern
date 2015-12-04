export default function TopicMetadataComparatorAggregation() {
  return {
      "distinct_articles": {
        "cardinality": {
          "field": "article_uuid"
        }
      }
    }
}
