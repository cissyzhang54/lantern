export default [{
  "took": 22,
  "timed_out": false,
  "_shards": {
    "total": 35,
    "successful": 35,
    "failed": 0
  },
  "hits": {
    "total": 172,
    "max_score": 11.10186,
    "hits": [
      {
        "_index": "article_page_view-2015-10-10",
        "_type": "logs",
        "_id": "AVBW-Bl0dQYQZRnE3u8b",
        "_score": 11.10186,
        "_source": {
          "@version": "1",
          "@timestamp": "2015-10-11T12:55:09.836Z",
          "tags": [
            "VIEW"
          ],
          "article_uuid": "88c187b4-5619-11e5-a28b-50226830d644",
          "title": "Carbon capture: Miracle machine or white elephant?",
          "initial_publish_date": "2015-09-09T18:14:00.000Z",
          "view_timestamp": "2015-10-10T10:47:08.000Z",
          "view_date": "2015-10-10",
          "user_cohort": "subscriber",
          "time_on_page": 13,
          "geo_country": "FRA",
          "geo_region": "EUROPE",
          "channel": "ft.com",
          "referrer_type": "internal",
          "referrer_name": "story",
          "referrer": "http://www.ft.com/intl/cms/s/0/7e77292e-6ce6-11e5-aca9-d87542bf8673.html",
          "device_type": "Desktop",
          "is_first_visit": false,
          "is_last_page": false,
          "rfv_cluster": "",
          "next_internal_url": "http://www.ft.com/intl/cms/s/0/88c187b4-5619-11e5-a28b-50226830d644.html#axzz3n2bf5fnf",
          "next_internal_url_type": "story",
          "authors": [
            "Pilita Clark"
          ],
          "genre": [
            "Analysis"
          ],
          "sections": [
            "Science & Environment",
            "Oil & Gas",
            "Comment",
            "Columnists",
            "Utilities",
            "The Big Read",
            "Energy",
            "Global Economy"
          ],
          "topics": [
            "Climate change",
            "Oil",
            "Carbon Capture and Storage"
          ]
        }
      }
    ]
  },
  "aggregations": {
    "page_views_over_time": {
      "buckets": [
        {
          "key_as_string": "2015-10-09T00:00:00.000Z",
          "key": 1444348800000,
          "doc_count": 80
        },
        {
          "key_as_string": "2015-10-10T00:00:00.000Z",
          "key": 1444435200000,
          "doc_count": 64
        },
        {
          "key_as_string": "2015-10-11T00:00:00.000Z",
          "key": 1444521600000,
          "doc_count": 28
        }
      ]
    },
    "referrer_types": {
      "doc_count": 33,
      "filtered": {
        "doc_count_error_upper_bound": 0,
        "sum_other_doc_count": 0,
        "buckets": [
          {
            "key": "search",
            "doc_count": 24
          },
          {
            "key": "",
            "doc_count": 7
          },
          {
            "key": "social-network",
            "doc_count": 2
          }
        ]
      }
    },
    "regions": {
      "doc_count_error_upper_bound": 0,
      "sum_other_doc_count": 0,
      "buckets": [
        {
          "key": "EUROPE",
          "doc_count": 56
        },
        {
          "key": "UK",
          "doc_count": 43
        },
        {
          "key": "ASIA",
          "doc_count": 31
        },
        {
          "key": "US",
          "doc_count": 30
        },
        {
          "key": "INDIA",
          "doc_count": 10
        },
        {
          "key": "",
          "doc_count": 2
        }
      ]
    },
    "avg_time_on_page": {
      "value": 95.13953488372093
    },
    "internal_referrer_types": {
      "doc_count": 1144,
      "filtered": {
        "doc_count_error_upper_bound": 0,
        "sum_other_doc_count": 0,
        "buckets": [
          {
            "key": "",
            "doc_count": 1144
          }
        ]
      }
    },
    "is_first_visit": {
      "doc_count_error_upper_bound": 0,
      "sum_other_doc_count": 0,
      "buckets": [
        {
          "key": "F",
          "doc_count": 152
        },
        {
          "key": "T",
          "doc_count": 20
        }
      ]
    },
    "social_referrers": {
      "doc_count": 2,
      "filtered": {
        "doc_count_error_upper_bound": 0,
        "sum_other_doc_count": 0,
        "buckets": [
          {
            "key": "Facebook",
            "doc_count": 2
          }
        ]
      }
    },
    "is_last_page": {
      "doc_count_error_upper_bound": 0,
      "sum_other_doc_count": 0,
      "buckets": [
        {
          "key": "F",
          "doc_count": 120
        },
        {
          "key": "T",
          "doc_count": 52
        }
      ]
    },
    "rfv_cluster": {
      "doc_count_error_upper_bound": 0,
      "sum_other_doc_count": 0,
      "buckets": [
        {
          "key": "",
          "doc_count": 91
        },
        {
          "key": "1. FT Super Fans",
          "doc_count": 53
        },
        {
          "key": "4. Borderline Engaged",
          "doc_count": 6
        },
        {
          "key": "6. Occasional Skimmers",
          "doc_count": 6
        },
        {
          "key": "5. Half Engaged",
          "doc_count": 5
        },
        {
          "key": "7. Disengaged Long Tail",
          "doc_count": 5
        },
        {
          "key": "2. FT Fans",
          "doc_count": 4
        },
        {
          "key": "3. Engaged, Frequent and Free",
          "doc_count": 2
        }
      ]
    },
    "page_view_total_count": {
      "value": 172
    },
    "distinct_articles": {
      "value": 1
    },
    "user_cohort": {
      "doc_count_error_upper_bound": 0,
      "sum_other_doc_count": 0,
      "buckets": [
        {
          "key": "subscriber",
          "doc_count": 96
        },
        {
          "key": "anonymous",
          "doc_count": 71
        },
        {
          "key": "registered",
          "doc_count": 5
        }
      ]
    }
  },
  comparator: 'Regulation & Governance'
}, {
  "took": 35,
  "timed_out": false,
  "_shards": {
    "total": 20,
    "successful": 20,
    "failed": 0
  },
  "hits": {
    "total": 2,
    "max_score": 9.025189,
    "hits": [
      {
        "_index": "article_page_event-2015-10-14",
        "_type": "logs",
        "_id": "563e396c-518d-11e5-b029-b9d50a74fd14",
        "_score": 9.025189,
        "_source": {
          "@version": "1",
          "@timestamp": "2015-10-26T15:14:57.740Z",
          "tags": [
            "EVENT"
          ],
          "article_uuid": "563e396c-518d-11e5-b029-b9d50a74fd14",
          "timestamp": "2015-10-14 19:55:58.179",
          "event_date": "2015-10-14",
          "time_since_publish": 60529,
          "user_cohort": "subscriber",
          "geo_country": "GBR",
          "channel": "next",
          "referrer_type": "search",
          "referrer_name": "Google",
          "authors": [
            "Andy Bounds",
            "Chris Tighe",
            "John McDermott"
          ],
          "genre": [
            "News"
          ],
          "sections": [
            "UK Politics & Policy"
          ],
          "topics": [
            "English devolution",
            "UK elections"
          ],
          "event_type": "scroll",
          "event_category": "depth",
          "event_value": 100
        }
      }
    ]
  },
  "aggregations": {
    "social_shares": {
      "doc_count": 1,
      "filtered": {
        "doc_count_error_upper_bound": 0,
        "sum_other_doc_count": 0,
        "buckets": [
          {
            "key": "twitter",
            "doc_count": 1
          }
        ]
      }
    }
  }
}];
