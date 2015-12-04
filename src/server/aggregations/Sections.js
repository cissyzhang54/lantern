import * as calculateInterval from '../utils/calculateInterval'

export default function SectionAggregation(query) {
  return {
    "page_views_over_time" : {
      "date_histogram" : {
        "field" : "view_timestamp",
        interval : calculateInterval.interval(query.dateFrom, query.dateTo),
        min_doc_count : 0
      }
    },
    referrer : {
      filter: {
        not: {
          term: {
            referrer_type: "internal"
          }
        }
      },
      aggs: {
        names: {
          terms: {
            field: "referrer_name"
          }
        },
        types: {
          terms: {
            field: "referrer_type",
            min_doc_count: 0
          }
        }
      }
    },
    social_referrers: {
      filter: {
        term: {
          referrer_type: 'social-network'
        }
      },
      aggs: {
        filtered: {
          terms: {
            field: "referrer_name",
            min_doc_count: 0,
            size: 200000000
          }
        }
      }
    },
    internal_referrer: {
      filter: {
        term: {
          referrer_type: "internal"
        }
      },
      aggs: {
        urls : {
          terms: {
            field: "referrer"
          }
        },
        types : {
          terms: {
            field: "referrer_name"
          }
        }
      }
    },
    regions: {
      terms: {
        field: "geo_region"
      }
    },
    countries: {
      terms: {
        field: "geo_country",
        size: 200000000
      }
    },
    devices: {
      terms: {
        field: "device_type"
      }
    },
    user_cohort: {
      terms: {
        field: 'user_cohort',
        min_doc_count: 0
      }
    },
    rfv_cluster: {
      terms: {
        field: "rfv_cluster",
        min_doc_count: 0,
        order: {"_term": "asc"}
      }
    },
    is_first_visit: {
      terms: {
        field: "is_first_visit",
        min_doc_count: 0
      }
    },
    is_subscription: {
      terms: {
        field: "is_subscription"
      }
    },
    unique_visitors: {
      cardinality: {
        field: 'visitor_id'
      }
    },
    "topic_views": {
      "terms": {
        "field": "topics",
        size: 10
      }
    },
    distinct_articles: {
      cardinality: {
        field: "article_uuid"
      }
    }
  }
}
