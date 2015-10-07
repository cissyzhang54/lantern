export default [{
  "took": 41,
  "timed_out": false,
  "_shards": {
    "total": 25,
    "successful": 25,
    "failed": 0
  },
  "hits": {
    "total": 27047,
    "max_score": 5.6623516,
    "hits": [
      {
        "_index": "article_page_view-2015-09-29",
        "_type": "logs",
        "_id": "AVAeAfaIyhEyehZAntY_",
        "_score": 5.6623516,
        "_source": {
          "@version": "1",
          "@timestamp": "2015-09-30T11:27:34.810Z",
          "tags": [
            "VIEW"
          ],
          "article_uuid": "cf9f73e8-62d6-11e5-9846-de406ccb37f2",
          "title": "Seven reasons Volkswagen is worse than Enron",
          "initial_publish_date": "2015-09-27T03:06:49.000Z",
          "view_timestamp": "2015-09-29T11:18:58.000Z",
          "view_date": "2015-09-29",
          "user_cohort": "anonymous",
          "time_on_page": 134,
          "geo_country": "ESP",
          "geo_region": "EUROPE",
          "channel": "ft.com",
          "referrer_type": "",
          "referrer_name": "",
          "referrer": "http://blogs.elconfidencial.com/mercados/valor-anadido/2015-09-29/volkswagen-puede-desaparecer-su-fraude-es-aun-peor-que-el-de-enron_1040790/",
          "device_type": "Desktop",
          "authors": [],
          "genre": [
            "Comment"
          ],
          "sections": [
            "Science & Environment",
            "FTfm Fund Management",
            "FTfm Opinion",
            "Regulation & Governance"
          ],
          "topics": []
        }
      }
    ]
  },
  "aggregations": {
    "page_views_over_time": {
      "buckets": [
        {
          "key_as_string": "2015-09-29T00:00:00.000Z",
          "key": 1443484800000,
          "doc_count": 22364
        },
        {
          "key_as_string": "2015-09-30T00:00:00.000Z",
          "key": 1443571200000,
          "doc_count": 4683
        }
      ]
    },
    "referrer_names": {
      "doc_count": 11589,
      "filtered": {
        "doc_count_error_upper_bound": 0,
        "sum_other_doc_count": 9,
        "buckets": [
          {
            "key": "",
            "doc_count": 7345
          },
          {
            "key": "Google",
            "doc_count": 1734
          },
          {
            "key": "Facebook",
            "doc_count": 1491
          },
          {
            "key": "Twitter",
            "doc_count": 649
          },
          {
            "key": "The Business Insider",
            "doc_count": 200
          },
          {
            "key": "Linked-In",
            "doc_count": 81
          },
          {
            "key": "Google News",
            "doc_count": 31
          },
          {
            "key": "Other email",
            "doc_count": 27
          },
          {
            "key": "Bing",
            "doc_count": 16
          },
          {
            "key": "Yahoo",
            "doc_count": 6
          }
        ]
      }
    },
    "referrer_urls": {
      "doc_count": 11589,
      "filtered": {
        "doc_count_error_upper_bound": 7,
        "sum_other_doc_count": 4291,
        "buckets": [
          {
            "key": "http://www.bloombergview.com/articles/2015-09-29/ritholtz-s-reads-seven-reasons-vw-may-be-worse-than-enron",
            "doc_count": 2535
          },
          {
            "key": "http://blogs.elconfidencial.com/mercados/valor-anadido/2015-09-29/volkswagen-puede-desaparecer-su-fraude-es-aun-peor-que-el-de-enron_1040790/",
            "doc_count": 1509
          },
          {
            "key": "http://m.facebook.com",
            "doc_count": 663
          },
          {
            "key": "http://www.ritholtz.com/blog/2015/09/10-tuesday-am-reads-179/",
            "doc_count": 558
          },
          {
            "key": "https://www.facebook.com/",
            "doc_count": 457
          },
          {
            "key": "",
            "doc_count": 432
          },
          {
            "key": "https://www.google.com/",
            "doc_count": 397
          },
          {
            "key": "http://www.ritholtz.com/blog/",
            "doc_count": 338
          },
          {
            "key": "http://lnkd.in",
            "doc_count": 210
          },
          {
            "key": "https://www.google.co.uk/",
            "doc_count": 199
          }
        ]
      }
    },
    "referrer_types": {
      "doc_count": 11589,
      "filtered": {
        "doc_count_error_upper_bound": 0,
        "sum_other_doc_count": 0,
        "buckets": [
          {
            "key": "",
            "doc_count": 7345
          },
          {
            "key": "social-network",
            "doc_count": 2140
          },
          {
            "key": "search",
            "doc_count": 1756
          },
          {
            "key": "partner",
            "doc_count": 287
          },
          {
            "key": "news-sharing",
            "doc_count": 31
          },
          {
            "key": "email",
            "doc_count": 30
          }
        ]
      }
    },
    "regions": {
      "doc_count_error_upper_bound": 0,
      "sum_other_doc_count": 0,
      "buckets": [
        {
          "key": "US",
          "doc_count": 11854
        },
        {
          "key": "EUROPE",
          "doc_count": 7675
        },
        {
          "key": "UK",
          "doc_count": 4177
        },
        {
          "key": "ASIA",
          "doc_count": 2020
        },
        {
          "key": "",
          "doc_count": 626
        },
        {
          "key": "INDIA",
          "doc_count": 423
        },
        {
          "key": "MIDDLEEAST",
          "doc_count": 272
        }
      ]
    },
    "channels": {
      "doc_count_error_upper_bound": 0,
      "sum_other_doc_count": 0,
      "buckets": [
        {
          "key": "ft.com",
          "doc_count": 21761
        },
        {
          "key": "",
          "doc_count": 4401
        },
        {
          "key": "FT app",
          "doc_count": 469
        },
        {
          "key": "next",
          "doc_count": 416
        }
      ]
    },
    "devices": {
      "doc_count_error_upper_bound": 0,
      "sum_other_doc_count": 0,
      "buckets": [
        {
          "key": "Desktop",
          "doc_count": 19503
        },
        {
          "key": "Mobile Phone",
          "doc_count": 4517
        },
        {
          "key": "Tablet",
          "doc_count": 2062
        },
        {
          "key": "",
          "doc_count": 953
        },
        {
          "key": "Media Player",
          "doc_count": 12
        }
      ]
    },
    "avg_time_on_page": {
      "value": 54.02166598883425
    },
    "countries": {
      "doc_count_error_upper_bound": 4,
      "sum_other_doc_count": 6373,
      "buckets": [
        {
          "key": "USA",
          "doc_count": 9397
        },
        {
          "key": "GBR",
          "doc_count": 4177
        },
        {
          "key": "ESP",
          "doc_count": 2424
        },
        {
          "key": "CAN",
          "doc_count": 1129
        },
        {
          "key": "DEU",
          "doc_count": 736
        },
        {
          "key": "AUS",
          "doc_count": 601
        },
        {
          "key": "BRA",
          "doc_count": 601
        },
        {
          "key": "SWE",
          "doc_count": 573
        },
        {
          "key": "FRA",
          "doc_count": 536
        },
        {
          "key": "IRL",
          "doc_count": 500
        }
      ]
    },
    "is_last_page": {
      "doc_count_error_upper_bound": 0,
      "sum_other_doc_count": 0,
      "buckets": [
        {
          "key": "T",
          "doc_count": 20
        },
        {
          "key": "F",
          "doc_count": 30
        }
      ]
    }
  }
}, {
  "@version": "1",
  "@timestamp": "2015-08-28T10:14:44.185Z",
  "article_uuid": "0049a468-4be5-11e5-b558-8a9722977189",
  "title": "Private equity secondaries evolve with Palamon deal",
  "initial_publish_date": "2015-08-26T17:32:01.000Z",
  "view_timestamp": "2015-08-27T10:00:04.000Z",
  "view_date": "2015-08-27",
  "authors": [
    "Joseph Cotterill"
  ],
  "genre": [
    "News"
  ],
  "sections": [
    "Financials",
    "Investment Strategy",
    "Financial Services",
    "Companies",
    "UK Companies"
  ],
  "topics": [
    "Private equity"
  ]
}];
