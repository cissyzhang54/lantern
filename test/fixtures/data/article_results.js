export default [{
  "took": 33,
  "timed_out": false,
  "_shards": {
    "total": 31,
    "successful": 31,
    "failed": 0
  },
  "hits": {
    "total": 32773,
    "max_score": 9.198239,
    "hits": [
      {
        "_index": "article_page_view-2015-10-06",
        "_type": "logs",
        "_id": "AVBC5RgvdQYQZRnEGsA-",
        "_score": 9.198239,
        "_source": {
          "@version": "1",
          "@timestamp": "2015-10-07T15:21:58.840Z",
          "tags": [
            "VIEW"
          ],
          "article_uuid": "cf9f73e8-62d6-11e5-9846-de406ccb37f2",
          "title": "Seven reasons Volkswagen is worse than Enron",
          "initial_publish_date": "2015-09-27T03:06:49.000Z",
          "view_timestamp": "2015-10-06T14:07:03.000Z",
          "view_date": "2015-10-06",
          "user_cohort": "anonymous",
          "time_on_page": 0,
          "geo_country": "PER",
          "geo_region": "US",
          "channel": "ft.com",
          "referrer_type": "social-network",
          "referrer_name": "Twitter",
          "referrer": "http://t.co/iB9WiQNqwo",
          "device_type": "Desktop",
          "is_first_visit": true,
          "is_last_page": true,
          "rfv_cluster": "",
          "next_internal_url": "",
          "authors": [],
          "genre": [
            "Comment"
          ],
          "sections": [
            "Science & Environment",
            "FTfm Opinion",
            "Regulation & Governance",
            "FTfm Fund Management"
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
          "doc_count": 755
        },
        {
          "key_as_string": "2015-10-06T00:00:00.000Z",
          "key": 1444089600000,
          "doc_count": 323
        }
      ]
    },
    "referrer_types": {
      "doc_count": 13923,
      "filtered": {
        "doc_count_error_upper_bound": 0,
        "sum_other_doc_count": 0,
        "buckets": [
          {
            "key": "",
            "doc_count": 8428
          },
          {
            "key": "social-network",
            "doc_count": 2756
          },
          {
            "key": "search",
            "doc_count": 2211
          },
          {
            "key": "partner",
            "doc_count": 416
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
          "key": "US",
          "doc_count": 13866
        },
        {
          "key": "EUROPE",
          "doc_count": 9380
        },
        {
          "key": "UK",
          "doc_count": 5162
        },
        {
          "key": "ASIA",
          "doc_count": 2629
        },
        {
          "key": "",
          "doc_count": 733
        },
        {
          "key": "INDIA",
          "doc_count": 650
        },
        {
          "key": "MIDDLEEAST",
          "doc_count": 353
        }
      ]
    },
    "devices": {
      "doc_count_error_upper_bound": 0,
      "sum_other_doc_count": 0,
      "buckets": [
        {
          "key": "Desktop",
          "doc_count": 22962
        },
        {
          "key": "Mobile Phone",
          "doc_count": 5864
        },
        {
          "key": "Tablet",
          "doc_count": 2907
        },
        {
          "key": "",
          "doc_count": 1028
        },
        {
          "key": "Media Player",
          "doc_count": 12
        }
      ]
    },
    "countries": {
      "doc_count_error_upper_bound": 4,
      "sum_other_doc_count": 8280,
      "buckets": [
        {
          "key": "USA",
          "doc_count": 10774
        },
        {
          "key": "GBR",
          "doc_count": 5162
        },
        {
          "key": "ESP",
          "doc_count": 2600
        },
        {
          "key": "CAN",
          "doc_count": 1324
        },
        {
          "key": "IRL",
          "doc_count": 963
        },
        {
          "key": "DEU",
          "doc_count": 895
        },
        {
          "key": "AUS",
          "doc_count": 732
        },
        {
          "key": "BRA",
          "doc_count": 713
        },
        {
          "key": "SWE",
          "doc_count": 691
        },
        {
          "key": "FRA",
          "doc_count": 639
        }
      ]
    },
    "referrer_names": {
      "doc_count": 13923,
      "filtered": {
        "doc_count_error_upper_bound": 0,
        "sum_other_doc_count": 17,
        "buckets": [
          {
            "key": "",
            "doc_count": 8428
          },
          {
            "key": "Google",
            "doc_count": 2185
          },
          {
            "key": "Facebook",
            "doc_count": 1965
          },
          {
            "key": "Twitter",
            "doc_count": 791
          },
          {
            "key": "The Business Insider",
            "doc_count": 250
          },
          {
            "key": "Linked-In",
            "doc_count": 153
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
            "doc_count": 19
          },
          {
            "key": "Digg",
            "doc_count": 9
          }
        ]
      }
    },
    "referrer_urls": {
      "doc_count": 8956,
      "filtered": {
        "doc_count_error_upper_bound": 3,
        "sum_other_doc_count": 1903,
        "buckets": [
          {
            "key": "http://www.bloombergview.com/articles/2015-09-29/ritholtz-s-reads-seven-reasons-vw-may-be-worse-than-enron",
            "doc_count": 2673
          },
          {
            "key": "http://blogs.elconfidencial.com/mercados/valor-anadido/2015-09-29/volkswagen-puede-desaparecer-su-fraude-es-aun-peor-que-el-de-enron_1040790/",
            "doc_count": 1565
          },
          {
            "key": "",
            "doc_count": 900
          },
          {
            "key": "http://www.ritholtz.com/blog/2015/09/10-tuesday-am-reads-179/",
            "doc_count": 566
          },
          {
            "key": "http://lnkd.in",
            "doc_count": 347
          },
          {
            "key": "http://www.ritholtz.com/blog/",
            "doc_count": 338
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
            "doc_count": 148
          },
          {
            "key": "https://www.linkedin.com/",
            "doc_count": 127
          }
        ]
      }
    },
    "channels": {
      "doc_count_error_upper_bound": 0,
      "sum_other_doc_count": 0,
      "buckets": [
        {
          "key": "ft.com",
          "doc_count": 26205
        },
        {
          "key": "",
          "doc_count": 5091
        },
        {
          "key": "FT app",
          "doc_count": 936
        },
        {
          "key": "next",
          "doc_count": 540
        },
        {
          "key": "Unknown",
          "doc_count": 1
        }
      ]
    },
    "avg_time_on_page": {
      "value": 52.87718548805419
    },
    "is_first_visit": {
      "doc_count_error_upper_bound": 0,
      "sum_other_doc_count": 0,
      "buckets": [
        {
          "key": "F",
          "doc_count": 6881
        },
        {
          "key": "T",
          "doc_count": 3528
        }
      ]
    },
    "social_referrers": {
      "doc_count": 2756,
      "filtered": {
        "doc_count_error_upper_bound": 0,
        "sum_other_doc_count": 0,
        "buckets": [
          {
            "key": "Facebook",
            "doc_count": 1965
          },
          {
            "key": "Twitter",
            "doc_count": 791
          }
        ]
      }
    },
    "is_last_page": {
      "doc_count_error_upper_bound": 0,
      "sum_other_doc_count": 0,
      "buckets": [
        {
          "key": "T",
          "doc_count": 3158
        },
        {
          "key": "F",
          "doc_count": 2568
        }
      ]
    },
    "user_cohort": {
      "doc_count_error_upper_bound": 0,
      "sum_other_doc_count": 0,
      "buckets": [
        {
          "key": "anonymous",
          "doc_count": 22583
        },
        {
          "key": "subscriber",
          "doc_count": 7876
        },
        {
          "key": "registered",
          "doc_count": 2312
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
