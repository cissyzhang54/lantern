export default [{
  "took": 575,
  "timed_out": false,
  "_shards": {
    "total": 30,
    "successful": 30,
    "failed": 0
  },
  "hits": {
    "total": 42802,
    "max_score": 8.5504055,
    "hits": [
      {
        "_index": "article_page_view-2015-10-02",
        "_type": "logs",
        "_id": "AVAuBNXxdQYQZRnEx2H7",
        "_score": 8.5504055,
        "_source": {
          "@version": "1",
          "@timestamp": "2015-10-03T14:04:38.666Z",
          "tags": [
            "VIEW"
          ],
          "article_uuid": "cf9f73e8-62d6-11e5-9846-de406ccb37f2",
          "title": "Seven reasons Volkswagen is worse than Enron",
          "initial_publish_date": "2015-09-27T03:06:49.000Z",
          "view_timestamp": "2015-10-02T21:19:41.000Z",
          "view_date": "2015-10-02",
          "user_cohort": "anonymous",
          "time_on_page": 101,
          "geo_country": "GBR",
          "geo_region": "UK",
          "channel": "ft.com",
          "referrer_type": "social-network",
          "referrer_name": "Facebook",
          "referrer": "http://m.facebook.com",
          "device_type": "Tablet",
          "is_first_visit": false,
          "is_last_page": false,
          "authors": [],
          "genre": [
            "Comment"
          ],
          "sections": [
            "Regulation & Governance",
            "FTfm Fund Management",
            "Science & Environment",
            "FTfm Opinion"
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
        },
        {
          "key_as_string": "2015-10-01T00:00:00.000Z",
          "key": 1443657600000,
          "doc_count": 1261
        },
        {
          "key_as_string": "2015-10-02T00:00:00.000Z",
          "key": 1443744000000,
          "doc_count": 1262
        },
        {
          "key_as_string": "2015-10-03T00:00:00.000Z",
          "key": 1443830400000,
          "doc_count": 820
        },
        {
          "key_as_string": "2015-10-04T00:00:00.000Z",
          "key": 1443916800000,
          "doc_count": 1305
        },
        {
          "key_as_string": "2015-10-05T00:00:00.000Z",
          "key": 1444003200000,
          "doc_count": 11107
        }
      ]
    },
    "referrer_names": {
      "doc_count": 22135,
      "filtered": {
        "doc_count_error_upper_bound": 0,
        "sum_other_doc_count": 16,
        "buckets": [
          {
            "key": "",
            "doc_count": 16768
          },
          {
            "key": "Google",
            "doc_count": 2134
          },
          {
            "key": "Facebook",
            "doc_count": 1927
          },
          {
            "key": "Twitter",
            "doc_count": 771
          },
          {
            "key": "The Business Insider",
            "doc_count": 244
          },
          {
            "key": "Linked-In",
            "doc_count": 142
          },
          {
            "key": "Google News",
            "doc_count": 79
          },
          {
            "key": "Other email",
            "doc_count": 27
          },
          {
            "key": "Bing",
            "doc_count": 18
          },
          {
            "key": "Digg",
            "doc_count": 9
          }
        ]
      }
    },
    "referrer_urls": {
      "doc_count": 17279,
      "filtered": {
        "doc_count_error_upper_bound": 3,
        "sum_other_doc_count": 1867,
        "buckets": [
          {
            "key": "",
            "doc_count": 9302
          },
          {
            "key": "http://www.bloombergview.com/articles/2015-09-29/ritholtz-s-reads-seven-reasons-vw-may-be-worse-than-enron",
            "doc_count": 2664
          },
          {
            "key": "http://blogs.elconfidencial.com/mercados/valor-anadido/2015-09-29/volkswagen-puede-desaparecer-su-fraude-es-aun-peor-que-el-de-enron_1040790/",
            "doc_count": 1556
          },
          {
            "key": "http://www.ritholtz.com/blog/2015/09/10-tuesday-am-reads-179/",
            "doc_count": 564
          },
          {
            "key": "http://www.ritholtz.com/blog/",
            "doc_count": 338
          },
          {
            "key": "http://lnkd.in",
            "doc_count": 336
          },
          {
            "key": "http://www.theautomaticearth.com/2015/09/debt-rattle-september-28-2015/",
            "doc_count": 200
          },
          {
            "key": "http://www.svd.se/darfor-ar-volkswagen-skandalen-varre-an-enron",
            "doc_count": 189
          },
          {
            "key": "http://www.infomoney.com.br/minhas-financas/carros/noticia/4311041/com-escandalo-nas-maos-gigante-montadora-volkswagen-pode-acabar",
            "doc_count": 147
          },
          {
            "key": "https://www.linkedin.com/",
            "doc_count": 116
          }
        ]
      }
    },
    "referrer_types": {
      "doc_count": 22135,
      "filtered": {
        "doc_count_error_upper_bound": 0,
        "sum_other_doc_count": 0,
        "buckets": [
          {
            "key": "",
            "doc_count": 16768
          },
          {
            "key": "social-network",
            "doc_count": 2698
          },
          {
            "key": "search",
            "doc_count": 2158
          },
          {
            "key": "partner",
            "doc_count": 399
          },
          {
            "key": "news-sharing",
            "doc_count": 79
          },
          {
            "key": "email",
            "doc_count": 33
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
          "doc_count": 17291
        },
        {
          "key": "US",
          "doc_count": 15001
        },
        {
          "key": "UK",
          "doc_count": 5472
        },
        {
          "key": "ASIA",
          "doc_count": 3265
        },
        {
          "key": "",
          "doc_count": 723
        },
        {
          "key": "INDIA",
          "doc_count": 629
        },
        {
          "key": "MIDDLEEAST",
          "doc_count": 421
        }
      ]
    },
    "channels": {
      "doc_count_error_upper_bound": 0,
      "sum_other_doc_count": 0,
      "buckets": [
        {
          "key": "ft.com",
          "doc_count": 27780
        },
        {
          "key": "FT app",
          "doc_count": 9468
        },
        {
          "key": "",
          "doc_count": 4944
        },
        {
          "key": "next",
          "doc_count": 609
        },
        {
          "key": "Unknown",
          "doc_count": 1
        }
      ]
    },
    "devices": {
      "doc_count_error_upper_bound": 0,
      "sum_other_doc_count": 0,
      "buckets": [
        {
          "key": "Desktop",
          "doc_count": 24391
        },
        {
          "key": "Tablet",
          "doc_count": 9653
        },
        {
          "key": "Mobile Phone",
          "doc_count": 7326
        },
        {
          "key": "",
          "doc_count": 1420
        },
        {
          "key": "Media Player",
          "doc_count": 12
        }
      ]
    },
    "avg_time_on_page": {
      "value": 54.163263398906594
    },
    "is_first_visit": {
      "doc_count_error_upper_bound": 0,
      "sum_other_doc_count": 0,
      "buckets": [
        {
          "key": "F",
          "doc_count": 17167
        },
        {
          "key": "T",
          "doc_count": 3271
        }
      ]
    },
    "countries": {
      "doc_count_error_upper_bound": 4,
      "sum_other_doc_count": 9016,
      "buckets": [
        {
          "key": "USA",
          "doc_count": 11982
        },
        {
          "key": "IRL",
          "doc_count": 8636
        },
        {
          "key": "GBR",
          "doc_count": 5472
        },
        {
          "key": "ESP",
          "doc_count": 2655
        },
        {
          "key": "CAN",
          "doc_count": 1288
        },
        {
          "key": "DEU",
          "doc_count": 874
        },
        {
          "key": "AUS",
          "doc_count": 797
        },
        {
          "key": "SWE",
          "doc_count": 765
        },
        {
          "key": "BRA",
          "doc_count": 696
        },
        {
          "key": "FRA",
          "doc_count": 621
        }
      ]
    },
    "is_last_page": {
      "doc_count_error_upper_bound": 0,
      "sum_other_doc_count": 0,
      "buckets": [
        {
          "key": "F",
          "doc_count": 9895
        },
        {
          "key": "T",
          "doc_count": 5860
        }
      ]
    },
    "user_cohort": {
      "doc_count_error_upper_bound": 0,
      "sum_other_doc_count": 0,
      "buckets": [
        {
          "key": "anonymous",
          "doc_count": 30701
        },
        {
          "key": "subscriber",
          "doc_count": 9767
        },
        {
          "key": "registered",
          "doc_count": 2332
        },
        {
          "key": "weekend",
          "doc_count": 2
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
