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
    "page_views_since_publish": {
      "buckets": [
        {
          "key": 27180,
          "doc_count": 3
        },
        {
          "key": 27240,
          "doc_count": 3
        },
        {
          "key": 27300,
          "doc_count": 1
        },
        {
          "key": 27360,
          "doc_count": 2
        }
      ]
    },
    "referrer": {
      "doc_count": 40111,
      "types": {
        "doc_count_error_upper_bound": 0,
        "sum_other_doc_count": 0,
        "buckets": [
          {
            "key": "",
            "doc_count": 17097
          },
          {
            "key": "social-network",
            "doc_count": 14796
          },
          {
            "key": "search",
            "doc_count": 0
          },
          {
            "key": "partner",
            "doc_count": 1146
          },
          {
            "key": "news-sharing",
            "doc_count": 0
          },
          {
            "key": "email",
            "doc_count": 47
          },
          {
            "key": "aggregator",
            "doc_count": 0
          },
          {
            "key": "internal",
            "doc_count": 0
          },
          {
            "key": "sister",
            "doc_count": 0
          },
          {
            "key": "video-sharing",
            "doc_count": 0
          }
        ]
      },
      "urls": {
        "doc_count": 19272,
        "filtered": {
          "doc_count_error_upper_bound": 10,
          "sum_other_doc_count": 6895,
          "buckets": [
            {
              "key": "",
              "doc_count": 5153
            },
            {
              "key": "http://www.bloombergview.com/articles/2015-09-29/ritholtz-s-reads-seven-reasons-vw-may-be-worse-than-enron",
              "doc_count": 2674
            },
            {
              "key": "http://blogs.elconfidencial.com/mercados/valor-anadido/2015-09-29/volkswagen-puede-desaparecer-su-fraude-es-aun-peor-que-el-de-enron_1040790/",
              "doc_count": 1584
            },
            {
              "key": "http://www.ritholtz.com/blog/2015/09/10-tuesday-am-reads-179/",
              "doc_count": 565
            },
            {
              "key": "http://lnkd.in",
              "doc_count": 524
            },
            {
              "key": "http://www.ft.com/home/uk",
              "doc_count": 463
            },
            {
              "key": "http://www.theautomaticearth.com/2015/09/debt-rattle-september-28-2015/",
              "doc_count": 410
            },
            {
              "key": "http://www.svd.se/darfor-ar-volkswagen-skandalen-varre-an-enron",
              "doc_count": 375
            },
            {
              "key": "http://www.ritholtz.com/blog/",
              "doc_count": 338
            },
            {
              "key": "http://www.businessinsider.com/volkswagens-scandal-is-worse-than-enron-and-reports-say-the-company-was-warned-about-cheat-devices-2015-9",
              "doc_count": 291
            }
          ]
        }
      },
      "names": {
        "doc_count_error_upper_bound": 0,
        "sum_other_doc_count": 75,
        "buckets": [
          {
            "key": "",
            "doc_count": 17146
          },
          {
            "key": "Facebook",
            "doc_count": 10104
          },
          {
            "key": "Google",
            "doc_count": 5832
          },
          {
            "key": "Twitter",
            "doc_count": 4679
          },
          {
            "key": "Google News",
            "doc_count": 982
          },
          {
            "key": "The Business Insider",
            "doc_count": 708
          },
          {
            "key": "Yahoo Finance",
            "doc_count": 241
          },
          {
            "key": "Linked-In",
            "doc_count": 177
          },
          {
            "key": "Yahoo",
            "doc_count": 102
          },
          {
            "key": "Bing",
            "doc_count": 65
          }
        ]
      }
    },
    "internal_referrer": {
      "doc_count": 52352,
      "urls": {
        "doc_count_error_upper_bound": 16,
        "sum_other_doc_count": 9691,
        "buckets": [
          {
            "key": "",
            "doc_count": 30399
          },
          {
            "key": "http://www.ft.com/home/uk",
            "doc_count": 3840
          },
          {
            "key": "http://www.ft.com/home/us",
            "doc_count": 3574
          },
          {
            "key": "http://www.ft.com/home/europe",
            "doc_count": 2170
          },
          {
            "key": "http://www.ft.com/home/asia",
            "doc_count": 1190
          },
          {
            "key": "http://www.ft.com/intl/vw-emissions-scandal",
            "doc_count": 618
          },
          {
            "key": "http://www.ft.com/vw-emissions-scandal",
            "doc_count": 292
          },
          {
            "key": "http://www.ft.com/intl/cms/s/0/8f2eb94c-62ac-11e5-a28b-50226830d644.html",
            "doc_count": 202
          },
          {
            "key": "http://www.ft.com/cms/s/0/8f2eb94c-62ac-11e5-a28b-50226830d644.html",
            "doc_count": 193
          },
          {
            "key": "http://www.ft.com/cms/s/0/2eea3106-65c2-11e5-9846-de406ccb37f2.html",
            "doc_count": 183
          }
        ]
      },
      "types": {
        "doc_count_error_upper_bound": 0,
        "sum_other_doc_count": 0,
        "buckets": [
          {
            "key": "FT",
            "doc_count": 48493
          },
          {
            "key": "",
            "doc_count": 2298
          },
          {
            "key": "story",
            "doc_count": 954
          },
          {
            "key": "front",
            "doc_count": 290
          },
          {
            "key": "section",
            "doc_count": 171
          },
          {
            "key": "search",
            "doc_count": 124
          },
          {
            "key": "page",
            "doc_count": 17
          },
          {
            "key": "topic",
            "doc_count": 3
          },
          {
            "key": "video",
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
    },
    "unique_visitors": {
      "doc_count_error_upper_bound": 0,
      "sum_other_doc_count": 0,
      "buckets": [
        {
          "key": "03ae3552-d186-11e5-831d-09f7778e7377",
          "doc_count": 15034,
          "unique_visitors": {
            "value": 12360
          }
        },
        {
          "key": "c95abbc2-cbe1-11e5-be0b-b7ece4e953a0",
          "doc_count": 9642,
          "unique_visitors": {
            "value": 7778
          }
        },
        {
          "key": "70e6ee72-d3fa-11e5-969e-9d801cf5e15b",
          "doc_count": 8695,
          "unique_visitors": {
            "value": 7076
          }
        },
        {
          "key": "24c61c06-d4a5-11e5-829b-8564e7528e54",
          "doc_count": 8016,
          "unique_visitors": {
            "value": 6375
          }
        },
        {
          "key": "a3267dfe-cc1a-11e5-be0b-b7ece4e953a0",
          "doc_count": 6272,
          "unique_visitors": {
            "value": 4763
          }
        },
        {
          "key": "878fa516-ce63-11e5-831d-09f7778e7377",
          "doc_count": 5793,
          "unique_visitors": {
            "value": 4507
          }
        },
        {
          "key": "351b86c8-cf18-11e5-831d-09f7778e7377",
          "doc_count": 3387,
          "unique_visitors": {
            "value": 2852
          }
        },
        {
          "key": "7405277a-cc2c-11e5-a8ef-ea66e967dd44",
          "doc_count": 2664,
          "unique_visitors": {
            "value": 2147
          }
        },
        {
          "key": "9bdbfbd4-cfe7-11e5-92a1-c5e23ef99c77",
          "doc_count": 2482,
          "unique_visitors": {
            "value": 1755
          }
        },
        {
          "key": "0b462a2a-cbe3-11e5-be0b-b7ece4e953a0",
          "doc_count": 2417,
          "unique_visitors": {
            "value": 1873
          }
        },
        {
          "key": "b093839a-cb5e-11e5-a8ef-ea66e967dd44",
          "doc_count": 2225,
          "unique_visitors": {
            "value": 1765
          }
        },
        {
          "key": "65231676-d583-11e5-8887-98e7feb46f27",
          "doc_count": 1813,
          "unique_visitors": {
            "value": 1425
          }
        },
        {
          "key": "8aaea406-cff1-11e5-831d-09f7778e7377",
          "doc_count": 1756,
          "unique_visitors": {
            "value": 1385
          }
        },
        {
          "key": "0ace3536-cb36-11e5-a8ef-ea66e967dd44",
          "doc_count": 1522,
          "unique_visitors": {
            "value": 1322
          }
        },
        {
          "key": "bbbc342a-d099-11e5-92a1-c5e23ef99c77",
          "doc_count": 1171,
          "unique_visitors": {
            "value": 1015
          }
        },
        {
          "key": "d379403e-ca5f-11e5-a8ef-ea66e967dd44",
          "doc_count": 990,
          "unique_visitors": {
            "value": 853
          }
        },
        {
          "key": "60c954c6-d558-11e5-829b-8564e7528e54",
          "doc_count": 445,
          "unique_visitors": {
            "value": 392
          }
        },
        {
          "key": "80b15db4-ca87-11e5-be0b-b7ece4e953a0",
          "doc_count": 360,
          "unique_visitors": {
            "value": 315
          }
        },
        {
          "key": "06f1bafa-ca64-11e5-a8ef-ea66e967dd44",
          "doc_count": 233,
          "unique_visitors": {
            "value": 202
          }
        },
        {
          "key": "9f9aba4e-c9d4-11e5-a8ef-ea66e967dd44",
          "doc_count": 66,
          "unique_visitors": {
            "value": 56
          }
        },
        {
          "key": "2c8d577c-c98f-11e5-be0b-b7ece4e953a0",
          "doc_count": 57,
          "unique_visitors": {
            "value": 46
          }
        },
        {
          "key": "5affd234-c975-11e5-84df-70594b99fc47",
          "doc_count": 35,
          "unique_visitors": {
            "value": 31
          }
        },
        {
          "key": "922dcc26-c357-11e5-808f-8231cd71622e",
          "doc_count": 1,
          "unique_visitors": {
            "value": 1
          }
        }
      ]
    },
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
    },
    "page_clicks": {
      "doc_count": 1,
      "total_links_clicked": {
        "value": 4
      }
    },
    "page_comments": {
      "doc_count": 3,
      "posts": {
        "doc_count": 2,
        "total": {
          "value": 3
        }
      },
      "views": {
        "doc_count": 1
      }
    }
  }
}];
