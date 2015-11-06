export default [{
  "took": 13587,
  "timed_out": false,
  "_shards": {
    "total": 1,
    "successful": 1,
    "failed": 0
  },
  "hits": {
    "total": 252,
    "max_score": 5.4984765,
    "hits": [
      {
        "_index": "article_metadata",
        "_type": "logs",
        "_id": "34a35722-71ec-11e5-ad6d-f4ed76f0900a",
        "_score": 5.4984765,
        "_source": {
          "@version": "1",
          "@timestamp": "2015-11-04T10:21:17.352Z",
          "tags": [
            "META"
          ],
          "article_uuid": "34a35722-71ec-11e5-ad6d-f4ed76f0900a",
          "title": "Skiing gear guide",
          "initial_publish_date": "2015-10-16T19:58:26.000Z",
          "authors": [],
          "genre": [
            "Features"
          ],
          "sections": [
            "Pink Snow: Ski Special",
            "Life & Arts",
            "Winter Sports",
            "FT Magazine"
          ],
          "topics": [],
          "update_date": "2015-11-04"
        }
      }
    ]
  },
  "aggregations": {
    "distinct_articles": {
      "value": 252
    },
    "topics_covered": {
      "value": 108
    },
    "topic_count": {
      "doc_count_error_upper_bound": 0,
      "sum_other_doc_count": 1461,
      "buckets": [
        {
          "key": "uk",
          "doc_count": 288
        },
        {
          "key": "banks",
          "doc_count": 84
        },
        {
          "key": "acquisitions",
          "doc_count": 67
        },
        {
          "key": "mergers",
          "doc_count": 67
        },
        {
          "key": "in",
          "doc_count": 52
        },
        {
          "key": "europe",
          "doc_count": 48
        },
        {
          "key": "britain",
          "doc_count": 46
        },
        {
          "key": "government",
          "doc_count": 38
        },
        {
          "key": "tax",
          "doc_count": 35
        },
        {
          "key": "european",
          "doc_count": 34
        }
      ]
    }
  }
},
  {
    "took": 846,
    "timed_out": false,
    "_shards": {
      "total": 59,
      "successful": 59,
      "failed": 0
    },
    "hits": {
      "total": 913114,
      "max_score": 6.090378,
      "hits": [
        {
          "_index": "article_page_view-2015-11-03",
          "_type": "logs",
          "_id": "AVDSDaagHC8qXHk_kKGi",
          "_score": 6.090378,
          "_source": {
            "@version": "1",
            "@timestamp": "2015-11-04T10:31:59.541Z",
            "tags": [
              "VIEW"
            ],
            "article_uuid": "34a35722-71ec-11e5-ad6d-f4ed76f0900a",
            "title": "Skiing gear guide",
            "initial_publish_date": "2015-10-16T19:58:26.000Z",
            "view_timestamp": "2015-11-03T14:48:52.000Z",
            "view_date": "2015-11-03",
            "time_since_publish": 25610,
            "user_cohort": "anonymous",
            "time_on_page": 0,
            "geo_country": "GBR",
            "geo_region": "UK",
            "channel": "",
            "referrer_type": "internal",
            "referrer_name": "",
            "referrer": "http://search.ft.com/search?queryText=lithic",
            "device_type": "Desktop",
            "is_first_visit": false,
            "is_last_page": false,
            "rfv_cluster": "",
            "next_internal_url": "",
            "next_internal_url_type": "",
            "authors": [],
            "genre": [
              "Features"
            ],
            "sections": [
              "Pink Snow: Ski Special",
              "Life & Arts",
              "Winter Sports",
              "FT Magazine"
            ],
            "topics": [],
            "is_subscription": false,
            "visitor_id": 0
          }
        },
        {
          "_index": "article_page_view-2015-11-03",
          "_type": "logs",
          "_id": "AVDSCr93HC8qXHk_jTV4",
          "_score": 6.090378,
          "_source": {
            "@version": "1",
            "@timestamp": "2015-11-04T10:28:46.867Z",
            "tags": [
              "VIEW"
            ],
            "article_uuid": "31f62d88-71ec-11e5-ad6d-f4ed76f0900a",
            "title": "High-altitude architecture",
            "initial_publish_date": "2015-10-16T19:58:16.000Z",
            "view_timestamp": "2015-11-03T11:53:37.000Z",
            "view_date": "2015-11-03",
            "time_since_publish": 25435,
            "user_cohort": "anonymous",
            "time_on_page": 0,
            "geo_country": "USA",
            "geo_region": "US",
            "channel": "",
            "referrer_type": "internal",
            "referrer_name": "",
            "referrer": "",
            "device_type": "Desktop",
            "is_first_visit": false,
            "is_last_page": false,
            "rfv_cluster": "",
            "next_internal_url": "",
            "next_internal_url_type": "",
            "authors": [],
            "genre": [
              "Features"
            ],
            "sections": [
              "Life & Arts",
              "Pink Snow: Ski Special",
              "Winter Sports",
              "FT Magazine"
            ],
            "topics": [],
            "is_subscription": false,
            "visitor_id": 0
          }
        },
        {
          "_index": "article_page_view-2015-11-03",
          "_type": "logs",
          "_id": "AVDSCr93HC8qXHk_jTZg",
          "_score": 6.090378,
          "_source": {
            "@version": "1",
            "@timestamp": "2015-11-04T10:28:47.140Z",
            "tags": [
              "VIEW"
            ],
            "article_uuid": "34a35722-71ec-11e5-ad6d-f4ed76f0900a",
            "title": "Skiing gear guide",
            "initial_publish_date": "2015-10-16T19:58:26.000Z",
            "view_timestamp": "2015-11-03T14:48:52.000Z",
            "view_date": "2015-11-03",
            "time_since_publish": 25610,
            "user_cohort": "anonymous",
            "time_on_page": 0,
            "geo_country": "GBR",
            "geo_region": "UK",
            "channel": "",
            "referrer_type": "internal",
            "referrer_name": "",
            "referrer": "http://search.ft.com/search?queryText=lithic",
            "device_type": "Desktop",
            "is_first_visit": false,
            "is_last_page": false,
            "rfv_cluster": "",
            "next_internal_url": "",
            "next_internal_url_type": "",
            "authors": [],
            "genre": [
              "Features"
            ],
            "sections": [
              "Pink Snow: Ski Special",
              "Life & Arts",
              "Winter Sports",
              "FT Magazine"
            ],
            "topics": [],
            "is_subscription": false,
            "visitor_id": 0
          }
        },
        {
          "_index": "article_page_view-2015-11-03",
          "_type": "logs",
          "_id": "AVDSCr96HC8qXHk_jTuA",
          "_score": 6.090378,
          "_source": {
            "@version": "1",
            "@timestamp": "2015-11-04T10:28:48.899Z",
            "tags": [
              "VIEW"
            ],
            "article_uuid": "31f62d88-71ec-11e5-ad6d-f4ed76f0900a",
            "title": "High-altitude architecture",
            "initial_publish_date": "2015-10-16T19:58:16.000Z",
            "view_timestamp": "2015-11-03T11:53:38.000Z",
            "view_date": "2015-11-03",
            "time_since_publish": 25435,
            "user_cohort": "anonymous",
            "time_on_page": 0,
            "geo_country": "USA",
            "geo_region": "US",
            "channel": "",
            "referrer_type": "internal",
            "referrer_name": "",
            "referrer": "",
            "device_type": "Desktop",
            "is_first_visit": false,
            "is_last_page": false,
            "rfv_cluster": "",
            "next_internal_url": "",
            "next_internal_url_type": "",
            "authors": [],
            "genre": [
              "Features"
            ],
            "sections": [
              "Life & Arts",
              "Pink Snow: Ski Special",
              "Winter Sports",
              "FT Magazine"
            ],
            "topics": [],
            "is_subscription": false,
            "visitor_id": 0
          }
        },
        {
          "_index": "article_page_view-2015-11-03",
          "_type": "logs",
          "_id": "AVDSCnWMHC8qXHk_jODo",
          "_score": 6.090378,
          "_source": {
            "@version": "1",
            "@timestamp": "2015-11-04T10:28:28.524Z",
            "tags": [
              "VIEW"
            ],
            "article_uuid": "30a340f6-71ec-11e5-ad6d-f4ed76f0900a",
            "title": "Warth: a world apart",
            "initial_publish_date": "2015-10-16T12:01:37.000Z",
            "view_timestamp": "2015-11-03T21:22:29.000Z",
            "view_date": "2015-11-03",
            "time_since_publish": 26481,
            "user_cohort": "anonymous",
            "time_on_page": 0,
            "geo_country": "NLD",
            "geo_region": "EUROPE",
            "channel": "",
            "referrer_type": "search",
            "referrer_name": "",
            "referrer": "https://www.google.nl/",
            "device_type": "Tablet",
            "is_first_visit": false,
            "is_last_page": false,
            "rfv_cluster": "",
            "next_internal_url": "",
            "next_internal_url_type": "",
            "authors": [],
            "genre": [
              "Features"
            ],
            "sections": [
              "Winter Sports",
              "Pink Snow: Ski Special",
              "FT Magazine",
              "Life & Arts"
            ],
            "topics": [],
            "is_subscription": false,
            "visitor_id": 0
          }
        },
        {
          "_index": "article_page_view-2015-11-03",
          "_type": "logs",
          "_id": "AVDSDXNfHC8qXHk_kFsF",
          "_score": 6.090378,
          "_source": {
            "@version": "1",
            "@timestamp": "2015-11-04T10:31:44.564Z",
            "tags": [
              "VIEW"
            ],
            "article_uuid": "af39c46c-72b4-11e5-bdb1-e6e4767162cc",
            "title": "The Alps first private resort",
            "initial_publish_date": "2015-10-16T12:01:51.000Z",
            "view_timestamp": "2015-11-03T14:58:28.000Z",
            "view_date": "2015-11-03",
            "time_since_publish": 26097,
            "user_cohort": "subscriber",
            "time_on_page": 0,
            "geo_country": "EU",
            "geo_region": "",
            "channel": "",
            "referrer_type": "internal",
            "referrer_name": "",
            "referrer": "http://www.ft.com/travel/winter-sports",
            "device_type": "Desktop",
            "is_first_visit": false,
            "is_last_page": false,
            "rfv_cluster": "1. FT Super Fans",
            "next_internal_url": "",
            "next_internal_url_type": "",
            "authors": [],
            "genre": [
              "Features"
            ],
            "sections": [
              "Life & Arts",
              "Winter Sports",
              "FT Magazine",
              "Pink Snow: Ski Special"
            ],
            "topics": [],
            "is_subscription": false,
            "visitor_id": 0
          }
        },
        {
          "_index": "article_page_view-2015-11-03",
          "_type": "logs",
          "_id": "AVDSDLEDHC8qXHk_j2ZT",
          "_score": 6.090378,
          "_source": {
            "@version": "1",
            "@timestamp": "2015-11-04T10:30:55.007Z",
            "tags": [
              "VIEW"
            ],
            "article_uuid": "30a340f6-71ec-11e5-ad6d-f4ed76f0900a",
            "title": "Warth: a world apart",
            "initial_publish_date": "2015-10-16T12:01:37.000Z",
            "view_timestamp": "2015-11-03T07:44:34.000Z",
            "view_date": "2015-11-03",
            "time_since_publish": 25663,
            "user_cohort": "subscriber",
            "time_on_page": 0,
            "geo_country": "HKG",
            "geo_region": "ASIA",
            "channel": "",
            "referrer_type": "internal",
            "referrer_name": "",
            "referrer": "",
            "device_type": "Desktop",
            "is_first_visit": false,
            "is_last_page": false,
            "rfv_cluster": "1. FT Super Fans",
            "next_internal_url": "",
            "next_internal_url_type": "",
            "authors": [],
            "genre": [
              "Features"
            ],
            "sections": [
              "Winter Sports",
              "Pink Snow: Ski Special",
              "FT Magazine",
              "Life & Arts"
            ],
            "topics": [],
            "is_subscription": false,
            "visitor_id": 0
          }
        },
        {
          "_index": "article_page_view-2015-11-03",
          "_type": "logs",
          "_id": "AVDSDLEGHC8qXHk_j2ok",
          "_score": 6.090378,
          "_source": {
            "@version": "1",
            "@timestamp": "2015-11-04T10:30:55.427Z",
            "tags": [
              "VIEW"
            ],
            "article_uuid": "31f62d88-71ec-11e5-ad6d-f4ed76f0900a",
            "title": "High-altitude architecture",
            "initial_publish_date": "2015-10-16T19:58:16.000Z",
            "view_timestamp": "2015-11-03T13:28:34.000Z",
            "view_date": "2015-11-03",
            "time_since_publish": 25530,
            "user_cohort": "anonymous",
            "time_on_page": 0,
            "geo_country": "GBR",
            "geo_region": "UK",
            "channel": "",
            "referrer_type": "search",
            "referrer_name": "",
            "referrer": "https://www.google.co.uk/",
            "device_type": "Desktop",
            "is_first_visit": false,
            "is_last_page": false,
            "rfv_cluster": "",
            "next_internal_url": "",
            "next_internal_url_type": "",
            "authors": [],
            "genre": [
              "Features"
            ],
            "sections": [
              "Life & Arts",
              "Pink Snow: Ski Special",
              "Winter Sports",
              "FT Magazine"
            ],
            "topics": [],
            "is_subscription": false,
            "visitor_id": 0
          }
        },
        {
          "_index": "article_page_view-2015-11-03",
          "_type": "logs",
          "_id": "AVDSDTPjHC8qXHk_kBHL",
          "_score": 6.090378,
          "_source": {
            "@version": "1",
            "@timestamp": "2015-11-04T10:31:29.822Z",
            "tags": [
              "VIEW"
            ],
            "article_uuid": "2b1277f6-71ec-11e5-ad6d-f4ed76f0900a",
            "title": "Inside Val dIseres underground snow factory",
            "initial_publish_date": "2015-10-16T12:02:02.000Z",
            "view_timestamp": "2015-11-03T17:51:17.000Z",
            "view_date": "2015-11-03",
            "time_since_publish": 26269,
            "user_cohort": "anonymous",
            "time_on_page": 0,
            "geo_country": "GBR",
            "geo_region": "UK",
            "channel": "",
            "referrer_type": "internal",
            "referrer_name": "",
            "referrer": "",
            "device_type": "",
            "is_first_visit": false,
            "is_last_page": false,
            "rfv_cluster": "",
            "next_internal_url": "",
            "next_internal_url_type": "",
            "authors": [],
            "genre": [
              "Features"
            ],
            "sections": [
              "Life & Arts",
              "Pink Snow: Ski Special",
              "Winter Sports",
              "FT Magazine"
            ],
            "topics": [],
            "is_subscription": false,
            "visitor_id": 0
          }
        },
        {
          "_index": "article_page_view-2015-11-03",
          "_type": "logs",
          "_id": "AVDSDVixHC8qXHk_kDsX",
          "_score": 6.090378,
          "_source": {
            "@version": "1",
            "@timestamp": "2015-11-04T10:31:39.402Z",
            "tags": [
              "VIEW"
            ],
            "article_uuid": "31f62d88-71ec-11e5-ad6d-f4ed76f0900a",
            "title": "High-altitude architecture",
            "initial_publish_date": "2015-10-16T19:58:16.000Z",
            "view_timestamp": "2015-11-03T08:08:11.000Z",
            "view_date": "2015-11-03",
            "time_since_publish": 25210,
            "user_cohort": "anonymous",
            "time_on_page": 0,
            "geo_country": "FRA",
            "geo_region": "EUROPE",
            "channel": "",
            "referrer_type": "",
            "referrer_name": "",
            "referrer": "http://www.scoop.it/t/alpine-trends",
            "device_type": "Desktop",
            "is_first_visit": false,
            "is_last_page": false,
            "rfv_cluster": "",
            "next_internal_url": "",
            "next_internal_url_type": "",
            "authors": [],
            "genre": [
              "Features"
            ],
            "sections": [
              "Life & Arts",
              "Pink Snow: Ski Special",
              "Winter Sports",
              "FT Magazine"
            ],
            "topics": [],
            "is_subscription": false,
            "visitor_id": 0
          }
        }
      ]
    },
    "aggregations": {
      "page_views_over_time": {
        "buckets": [
          {
            "key_as_string": "2015-10-01T00:00:00.000Z",
            "key": 1443657600000,
            "doc_count": 5
          },
          {
            "key_as_string": "2015-10-02T00:00:00.000Z",
            "key": 1443744000000,
            "doc_count": 0
          },
          {
            "key_as_string": "2015-10-03T00:00:00.000Z",
            "key": 1443830400000,
            "doc_count": 1
          },
          {
            "key_as_string": "2015-10-04T00:00:00.000Z",
            "key": 1443916800000,
            "doc_count": 1
          },
          {
            "key_as_string": "2015-10-05T00:00:00.000Z",
            "key": 1444003200000,
            "doc_count": 270
          }
        ]
      },
      "referrer": {
        "doc_count": 447093,
        "types": {
          "doc_count_error_upper_bound": 0,
          "sum_other_doc_count": 0,
          "buckets": [
            {
              "key": "",
              "doc_count": 289392
            },
            {
              "key": "search",
              "doc_count": 83155
            },
            {
              "key": "social-network",
              "doc_count": 59516
            },
            {
              "key": "partner",
              "doc_count": 8498
            },
            {
              "key": "news-sharing",
              "doc_count": 6171
            },
            {
              "key": "email",
              "doc_count": 324
            },
            {
              "key": "sister",
              "doc_count": 32
            },
            {
              "key": "aggregator",
              "doc_count": 4
            },
            {
              "key": "video-sharing",
              "doc_count": 1
            },
            {
              "key": "internal",
              "doc_count": 0
            }
          ]
        },
        "names": {
          "doc_count_error_upper_bound": 0,
          "sum_other_doc_count": 1716,
          "buckets": [
            {
              "key": "",
              "doc_count": 339143
            },
            {
              "key": "Google",
              "doc_count": 37030
            },
            {
              "key": "Facebook",
              "doc_count": 26329
            },
            {
              "key": "Twitter",
              "doc_count": 25399
            },
            {
              "key": "Yahoo",
              "doc_count": 5424
            },
            {
              "key": "Yahoo Finance",
              "doc_count": 5180
            },
            {
              "key": "Google News",
              "doc_count": 3486
            },
            {
              "key": "Reddit",
              "doc_count": 1537
            },
            {
              "key": "Linked-In",
              "doc_count": 1214
            },
            {
              "key": "Bing",
              "doc_count": 635
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
            "doc_count": 333723
          },
          {
            "key": "US",
            "doc_count": 281885
          },
          {
            "key": "UK",
            "doc_count": 171114
          },
          {
            "key": "ASIA",
            "doc_count": 69966
          },
          {
            "key": "MIDDLEEAST",
            "doc_count": 23542
          },
          {
            "key": "",
            "doc_count": 16477
          },
          {
            "key": "INDIA",
            "doc_count": 16407
          }
        ]
      },
      "devices": {
        "doc_count_error_upper_bound": 0,
        "sum_other_doc_count": 0,
        "buckets": [
          {
            "key": "Desktop",
            "doc_count": 538479
          },
          {
            "key": "Mobile Phone",
            "doc_count": 197464
          },
          {
            "key": "Tablet",
            "doc_count": 154005
          },
          {
            "key": "",
            "doc_count": 22673
          },
          {
            "key": "Media Player",
            "doc_count": 352
          },
          {
            "key": "Games Console",
            "doc_count": 88
          },
          {
            "key": "Set Top Box",
            "doc_count": 39
          },
          {
            "key": "TV",
            "doc_count": 12
          },
          {
            "key": "eReader",
            "doc_count": 2
          }
        ]
      },
      "is_subscription": {
        "doc_count_error_upper_bound": 0,
        "sum_other_doc_count": 0,
        "buckets": [
          {
            "key": "F",
            "doc_count": 913114
          }
        ]
      },
      "unique_visitors": {
        "value": 252750
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
      "is_first_visit": {
        "doc_count_error_upper_bound": 0,
        "sum_other_doc_count": 0,
        "buckets": [
          {
            "key": "F",
            "doc_count": 737979
          },
          {
            "key": "T",
            "doc_count": 175135
          }
        ]
      },
      "social_referrers": {
        "doc_count": 59516,
        "filtered": {
          "doc_count_error_upper_bound": 0,
          "sum_other_doc_count": 0,
          "buckets": [
            {
              "key": "Facebook",
              "doc_count": 26329
            },
            {
              "key": "Twitter",
              "doc_count": 25398
            },
            {
              "key": "",
              "doc_count": 7770
            },
            {
              "key": "Google Plus",
              "doc_count": 14
            },
            {
              "key": "Tumblr",
              "doc_count": 5
            },
            {
              "key": "247 Wall St",
              "doc_count": 0
            },
            {
              "key": "AOL",
              "doc_count": 0
            }
          ]
        }
      },
      "countries": {
        "doc_count_error_upper_bound": 0,
        "sum_other_doc_count": 0,
        "buckets": [
          {
            "key": "USA",
            "doc_count": 231212
          },
          {
            "key": "IRL",
            "doc_count": 174590
          },
          {
            "key": "GBR",
            "doc_count": 171114
          },
          {
            "key": "DEU",
            "doc_count": 19104
          },
          {
            "key": "CAN",
            "doc_count": 19089
          },
          {
            "key": "IND",
            "doc_count": 14821
          },
          {
            "key": "FRA",
            "doc_count": 14201
          },
          {
            "key": "ESP",
            "doc_count": 12959
          },
          {
            "key": "BRA",
            "doc_count": 10708
          },
          {
            "key": "SGP",
            "doc_count": 10575
          },
          {
            "key": "AUS",
            "doc_count": 10316
          },
          {
            "key": "NLD",
            "doc_count": 10082
          },
          {
            "key": "CHE",
            "doc_count": 9713
          },
          {
            "key": "PAK",
            "doc_count": 7888
          },
          {
            "key": "ITA",
            "doc_count": 7759
          },
          {
            "key": "ARE",
            "doc_count": 7609
          },
          {
            "key": "HKG",
            "doc_count": 7528
          },
          {
            "key": "BEL",
            "doc_count": 7033
          },
          {
            "key": "RUS",
            "doc_count": 6644
          },
          {
            "key": "JPN",
            "doc_count": 6185
          },
          {
            "key": "EU",
            "doc_count": 5540
          },
          {
            "key": "NOR",
            "doc_count": 5537
          },
          {
            "key": "PHL",
            "doc_count": 5265
          },
          {
            "key": "SWE",
            "doc_count": 5167
          },
          {
            "key": "FIN",
            "doc_count": 4979
          },
          {
            "key": "TUR",
            "doc_count": 4867
          },
          {
            "key": "MEX",
            "doc_count": 4668
          },
          {
            "key": "CHN",
            "doc_count": 4637
          },
          {
            "key": "ZAF",
            "doc_count": 4481
          },
          {
            "key": "MYS",
            "doc_count": 4465
          },
          {
            "key": "AUT",
            "doc_count": 4349
          },
          {
            "key": "SAU",
            "doc_count": 3932
          },
          {
            "key": "POL",
            "doc_count": 3410
          },
          {
            "key": "ROU",
            "doc_count": 3395
          },
          {
            "key": "THA",
            "doc_count": 3159
          },
          {
            "key": "NGA",
            "doc_count": 3041
          },
          {
            "key": "DNK",
            "doc_count": 2956
          },
          {
            "key": "PRT",
            "doc_count": 2895
          },
          {
            "key": "GRC",
            "doc_count": 2854
          },
          {
            "key": "KOR",
            "doc_count": 2719
          },
          {
            "key": "LUX",
            "doc_count": 2670
          },
          {
            "key": "HUN",
            "doc_count": 2558
          },
          {
            "key": "IDN",
            "doc_count": 2318
          },
          {
            "key": "ISR",
            "doc_count": 2309
          },
          {
            "key": "NZL",
            "doc_count": 2152
          },
          {
            "key": "CZE",
            "doc_count": 1995
          },
          {
            "key": "ARG",
            "doc_count": 1950
          },
          {
            "key": "EGY",
            "doc_count": 1921
          },
          {
            "key": "PER",
            "doc_count": 1905
          },
          {
            "key": "AP",
            "doc_count": 1853
          },
          {
            "key": "TWN",
            "doc_count": 1691
          },
          {
            "key": "QAT",
            "doc_count": 1625
          },
          {
            "key": "COL",
            "doc_count": 1607
          },
          {
            "key": "BGR",
            "doc_count": 1596
          },
          {
            "key": "BOL",
            "doc_count": 1505
          },
          {
            "key": "KEN",
            "doc_count": 1476
          },
          {
            "key": "SRB",
            "doc_count": 1326
          },
          {
            "key": "VNM",
            "doc_count": 1269
          },
          {
            "key": "UKR",
            "doc_count": 1257
          },
          {
            "key": "SVN",
            "doc_count": 1234
          },
          {
            "key": "HRV",
            "doc_count": 1232
          },
          {
            "key": "SVK",
            "doc_count": 1118
          },
          {
            "key": "CHL",
            "doc_count": 1088
          },
          {
            "key": "BGD",
            "doc_count": 1026
          },
          {
            "key": "KWT",
            "doc_count": 994
          },
          {
            "key": "NPL",
            "doc_count": 921
          },
          {
            "key": "TTO",
            "doc_count": 917
          },
          {
            "key": "LBN",
            "doc_count": 842
          },
          {
            "key": "IRN",
            "doc_count": 788
          },
          {
            "key": "CYP",
            "doc_count": 772
          },
          {
            "key": "DOM",
            "doc_count": 769
          },
          {
            "key": "VEN",
            "doc_count": 730
          },
          {
            "key": "GHA",
            "doc_count": 702
          },
          {
            "key": "MLT",
            "doc_count": 685
          },
          {
            "key": "ECU",
            "doc_count": 678
          },
          {
            "key": "LKA",
            "doc_count": 665
          },
          {
            "key": "EST",
            "doc_count": 658
          },
          {
            "key": "BHR",
            "doc_count": 657
          },
          {
            "key": "LTU",
            "doc_count": 641
          },
          {
            "key": "OMN",
            "doc_count": 620
          },
          {
            "key": "JAM",
            "doc_count": 617
          },
          {
            "key": "MAR",
            "doc_count": 541
          },
          {
            "key": "JOR",
            "doc_count": 523
          },
          {
            "key": "PRI",
            "doc_count": 510
          },
          {
            "key": "ZWE",
            "doc_count": 507
          },
          {
            "key": "KAZ",
            "doc_count": 494
          },
          {
            "key": "CRI",
            "doc_count": 462
          },
          {
            "key": "JEY",
            "doc_count": 456
          },
          {
            "key": "LVA",
            "doc_count": 444
          },
          {
            "key": "MUS",
            "doc_count": 440
          },
          {
            "key": "ISL",
            "doc_count": 394
          },
          {
            "key": "BHS",
            "doc_count": 386
          },
          {
            "key": "ALB",
            "doc_count": 370
          },
          {
            "key": "BRB",
            "doc_count": 362
          },
          {
            "key": "URY",
            "doc_count": 359
          },
          {
            "key": "DZA",
            "doc_count": 351
          },
          {
            "key": "ETH",
            "doc_count": 349
          },
          {
            "key": "TZA",
            "doc_count": 341
          },
          {
            "key": "BIH",
            "doc_count": 334
          },
          {
            "key": "AZE",
            "doc_count": 314
          },
          {
            "key": "IMN",
            "doc_count": 311
          },
          {
            "key": "PAN",
            "doc_count": 296
          },
          {
            "key": "GGY",
            "doc_count": 294
          },
          {
            "key": "GEO",
            "doc_count": 283
          },
          {
            "key": "UGA",
            "doc_count": 278
          },
          {
            "key": "KHM",
            "doc_count": 275
          },
          {
            "key": "MCO",
            "doc_count": 271
          },
          {
            "key": "MKD",
            "doc_count": 271
          },
          {
            "key": "IRQ",
            "doc_count": 270
          },
          {
            "key": "A1",
            "doc_count": 267
          },
          {
            "key": "PSE",
            "doc_count": 264
          },
          {
            "key": "ZMB",
            "doc_count": 238
          },
          {
            "key": "AGO",
            "doc_count": 237
          },
          {
            "key": "BWA",
            "doc_count": 230
          },
          {
            "key": "BMU",
            "doc_count": 227
          },
          {
            "key": "SLV",
            "doc_count": 221
          },
          {
            "key": "TUN",
            "doc_count": 217
          },
          {
            "key": "NAM",
            "doc_count": 216
          },
          {
            "key": "MAC",
            "doc_count": 198
          },
          {
            "key": "BRN",
            "doc_count": 184
          },
          {
            "key": "GTM",
            "doc_count": 184
          },
          {
            "key": "SOM",
            "doc_count": 180
          },
          {
            "key": "MDA",
            "doc_count": 172
          },
          {
            "key": "CIV",
            "doc_count": 169
          },
          {
            "key": "CYM",
            "doc_count": 165
          },
          {
            "key": "NIC",
            "doc_count": 155
          },
          {
            "key": "ARM",
            "doc_count": 152
          },
          {
            "key": "GUM",
            "doc_count": 152
          },
          {
            "key": "BLR",
            "doc_count": 143
          },
          {
            "key": "MWI",
            "doc_count": 140
          },
          {
            "key": "GIB",
            "doc_count": 127
          },
          {
            "key": "BLZ",
            "doc_count": 120
          },
          {
            "key": "SDN",
            "doc_count": 114
          },
          {
            "key": "AFG",
            "doc_count": 113
          },
          {
            "key": "MNG",
            "doc_count": 113
          },
          {
            "key": "VIR",
            "doc_count": 113
          },
          {
            "key": "MMR",
            "doc_count": 108
          },
          {
            "key": "GUY",
            "doc_count": 97
          },
          {
            "key": "RWA",
            "doc_count": 95
          },
          {
            "key": "CUW",
            "doc_count": 86
          },
          {
            "key": "MOZ",
            "doc_count": 86
          },
          {
            "key": "MNE",
            "doc_count": 83
          },
          {
            "key": "HND",
            "doc_count": 82
          },
          {
            "key": "LCA",
            "doc_count": 82
          },
          {
            "key": "ATG",
            "doc_count": 78
          },
          {
            "key": "MDV",
            "doc_count": 78
          },
          {
            "key": "HTI",
            "doc_count": 76
          },
          {
            "key": "ABW",
            "doc_count": 74
          },
          {
            "key": "SEN",
            "doc_count": 73
          },
          {
            "key": "PRY",
            "doc_count": 70
          },
          {
            "key": "PNG",
            "doc_count": 68
          },
          {
            "key": "AND",
            "doc_count": 67
          },
          {
            "key": "GRD",
            "doc_count": 66
          },
          {
            "key": "FJI",
            "doc_count": 65
          },
          {
            "key": "CMR",
            "doc_count": 64
          },
          {
            "key": "LAO",
            "doc_count": 59
          },
          {
            "key": "SWZ",
            "doc_count": 55
          },
          {
            "key": "A2",
            "doc_count": 54
          },
          {
            "key": "KNA",
            "doc_count": 51
          },
          {
            "key": "TCA",
            "doc_count": 51
          },
          {
            "key": "MDG",
            "doc_count": 47
          },
          {
            "key": "GMB",
            "doc_count": 45
          },
          {
            "key": "SUR",
            "doc_count": 45
          },
          {
            "key": "SYR",
            "doc_count": 45
          },
          {
            "key": "LBR",
            "doc_count": 44
          },
          {
            "key": "YEM",
            "doc_count": 42
          },
          {
            "key": "KGZ",
            "doc_count": 41
          },
          {
            "key": "DJI",
            "doc_count": 37
          },
          {
            "key": "VCT",
            "doc_count": 36
          },
          {
            "key": "LIE",
            "doc_count": 35
          },
          {
            "key": "LBY",
            "doc_count": 34
          },
          {
            "key": "REU",
            "doc_count": 34
          },
          {
            "key": "",
            "doc_count": 33
          },
          {
            "key": "BTN",
            "doc_count": 32
          },
          {
            "key": "DMA",
            "doc_count": 31
          },
          {
            "key": "LSO",
            "doc_count": 31
          },
          {
            "key": "BEN",
            "doc_count": 29
          },
          {
            "key": "PYF",
            "doc_count": 27
          },
          {
            "key": "GIN",
            "doc_count": 26
          },
          {
            "key": "SLE",
            "doc_count": 25
          },
          {
            "key": "COD",
            "doc_count": 24
          },
          {
            "key": "CUB",
            "doc_count": 24
          },
          {
            "key": "GNQ",
            "doc_count": 23
          },
          {
            "key": "VGB",
            "doc_count": 22
          },
          {
            "key": "GLP",
            "doc_count": 21
          },
          {
            "key": "MNP",
            "doc_count": 21
          },
          {
            "key": "SXM",
            "doc_count": 20
          },
          {
            "key": "SLB",
            "doc_count": 19
          },
          {
            "key": "SYC",
            "doc_count": 19
          },
          {
            "key": "TLS",
            "doc_count": 19
          },
          {
            "key": "VUT",
            "doc_count": 19
          },
          {
            "key": "NER",
            "doc_count": 18
          },
          {
            "key": "TJK",
            "doc_count": 17
          },
          {
            "key": "GAB",
            "doc_count": 16
          },
          {
            "key": "MLI",
            "doc_count": 16
          },
          {
            "key": "MTQ",
            "doc_count": 16
          },
          {
            "key": "TGO",
            "doc_count": 16
          },
          {
            "key": "ASM",
            "doc_count": 15
          },
          {
            "key": "FRO",
            "doc_count": 15
          },
          {
            "key": "CPV",
            "doc_count": 14
          },
          {
            "key": "AIA",
            "doc_count": 13
          },
          {
            "key": "BFA",
            "doc_count": 13
          },
          {
            "key": "COG",
            "doc_count": 13
          },
          {
            "key": "NCL",
            "doc_count": 13
          },
          {
            "key": "BDI",
            "doc_count": 12
          },
          {
            "key": "GRL",
            "doc_count": 12
          },
          {
            "key": "BES",
            "doc_count": 11
          },
          {
            "key": "GUF",
            "doc_count": 11
          },
          {
            "key": "COK",
            "doc_count": 10
          },
          {
            "key": "MHL",
            "doc_count": 10
          },
          {
            "key": "WSM",
            "doc_count": 9
          },
          {
            "key": "ALA",
            "doc_count": 8
          },
          {
            "key": "FLK",
            "doc_count": 7
          },
          {
            "key": "PRK",
            "doc_count": 5
          },
          {
            "key": "FSM",
            "doc_count": 4
          },
          {
            "key": "MRT",
            "doc_count": 3
          },
          {
            "key": "MSR",
            "doc_count": 3
          },
          {
            "key": "PLW",
            "doc_count": 3
          },
          {
            "key": "GNB",
            "doc_count": 2
          },
          {
            "key": "KIR",
            "doc_count": 2
          },
          {
            "key": "MAF",
            "doc_count": 2
          },
          {
            "key": "TKM",
            "doc_count": 2
          },
          {
            "key": "TON",
            "doc_count": 2
          },
          {
            "key": "NRU",
            "doc_count": 1
          },
          {
            "key": "SMR",
            "doc_count": 1
          },
          {
            "key": "STP",
            "doc_count": 1
          }
        ]
      },
      "rfv_cluster": {
        "doc_count_error_upper_bound": 0,
        "sum_other_doc_count": 0,
        "buckets": [
          {
            "key": "",
            "doc_count": 515729
          },
          {
            "key": "1. FT Super Fans",
            "doc_count": 276448
          },
          {
            "key": "2. FT Fans",
            "doc_count": 37786
          },
          {
            "key": "3. Engaged, Frequent and Free",
            "doc_count": 8019
          },
          {
            "key": "4. Borderline Engaged",
            "doc_count": 42670
          },
          {
            "key": "5. Half Engaged",
            "doc_count": 10117
          },
          {
            "key": "6. Occasional Skimmers",
            "doc_count": 17361
          },
          {
            "key": "7. Disengaged Long Tail",
            "doc_count": 4984
          }
        ]
      },
      "user_cohort": {
        "doc_count_error_upper_bound": 0,
        "sum_other_doc_count": 0,
        "buckets": [
          {
            "key": "anonymous",
            "doc_count": 679358
          },
          {
            "key": "subscriber",
            "doc_count": 203256
          },
          {
            "key": "registered",
            "doc_count": 30417
          },
          {
            "key": "weekend",
            "doc_count": 83
          },
          {
            "key": "",
            "doc_count": 0
          }
        ]
      },
      "topic_views": {
        "doc_count_error_upper_bound": 9378,
        "sum_other_doc_count": 13053545,
        "buckets": [
          {
            "key": "uk",
            "doc_count": 2502147
          },
          {
            "key": "banks",
            "doc_count": 854507
          },
          {
            "key": "acquisitions",
            "doc_count": 773343
          },
          {
            "key": "mergers",
            "doc_count": 773343
          },
          {
            "key": "in",
            "doc_count": 568755
          },
          {
            "key": "europe",
            "doc_count": 566829
          },
          {
            "key": "britain",
            "doc_count": 525605
          },
          {
            "key": "investment",
            "doc_count": 416051
          },
          {
            "key": "china",
            "doc_count": 405636
          },
          {
            "key": "politics",
            "doc_count": 393188
          }
        ]
      }
    }
  }];
