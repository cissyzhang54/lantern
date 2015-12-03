export default function SectionMetadataComparatorAggregation() {
  return {
      "topics_covered": {
        "cardinality": {
          "field": "topics"
        }
      },
      "topic_count": {
        "terms": {
          "field": "topics",
          size : 10
        }
      }
  }
}
