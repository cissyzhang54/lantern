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
