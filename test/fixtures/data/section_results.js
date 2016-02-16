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
      "articles": {
      "doc_count_error_upper_bound": 51126,
      "sum_other_doc_count": 21048817,
      "buckets": [
        {
          "key": "b6d1fc34-ce9f-11e5-831d-09f7778e7377",
          "doc_count": 347203,
          "metadata": {
            "hits": {
              "total": 347203,
              "max_score": null,
              "hits": [
                {
                  "_index": "article_page_view-2016-02-08",
                  "_type": "logs",
                  "_id": "cikei2x1900023q38w0mftvth",
                  "_score": null,
                  "_source": {
                    "article_uuid": "b6d1fc34-ce9f-11e5-831d-09f7778e7377",
                    "initial_publish_date": "2016-02-08T20:56:25.000Z",
                    "title": "Michael Bloomberg considers joining race for the White House",
                    "primary_section": "US Election 2016"
                  },
                  "sort": [
                    "b6d1fc34-ce9f-11e5-831d-09f7778e7377"
                  ]
                }
              ]
            }
          },
          "avg_time_on_page": {
            "value": 39.11566432317693
          },
          "retention": {
            "doc_count": 85650
          }
        },
        {
          "key": "b57fee24-cb3c-11e5-be0b-b7ece4e953a0",
          "doc_count": 166583,
          "metadata": {
            "hits": {
              "total": 166583,
              "max_score": null,
              "hits": [
                {
                  "_index": "article_page_view-2016-02-07",
                  "_type": "logs",
                  "_id": "cikd19bd400037639wib4jl0q",
                  "_score": null,
                  "_source": {
                    "article_uuid": "b57fee24-cb3c-11e5-be0b-b7ece4e953a0",
                    "initial_publish_date": "2016-02-07T12:46:20.000Z",
                    "title": "An old-school reply to an advertisers retro threat",
                    "primary_section": "Management"
                  },
                  "sort": [
                    "b57fee24-cb3c-11e5-be0b-b7ece4e953a0"
                  ]
                }
              ]
            }
          },
          "avg_time_on_page": {
            "value": 51.93876926216961
          },
          "retention": {
            "doc_count": 38561
          }
        },
        {
          "key": "646f7384-b623-11e5-b147-e5e5bba42e51",
          "doc_count": 143827,
          "metadata": {
            "hits": {
              "total": 143827,
              "max_score": null,
              "hits": [
                {
                  "_index": "article_page_view-2016-01-24",
                  "_type": "logs",
                  "_id": "t1453674014722h2r253.56436963193119",
                  "_score": null,
                  "_source": {
                    "article_uuid": "646f7384-b623-11e5-b147-e5e5bba42e51",
                    "initial_publish_date": "2016-01-24T20:05:02.000Z",
                    "title": "Global MBA ranking 2016  analysis and school profiles"
                  },
                  "sort": [
                    "646f7384-b623-11e5-b147-e5e5bba42e51"
                  ]
                }
              ]
            }
          },
          "avg_time_on_page": {
            "value": 62.05159670993624
          },
          "retention": {
            "doc_count": 32973
          }
        },
        {
          "key": "fcb4202a-c04d-11e5-846f-79b0e3d20eaf",
          "doc_count": 136169,
          "metadata": {
            "hits": {
              "total": 136169,
              "max_score": null,
              "hits": [
                {
                  "_index": "article_page_view-2016-01-25",
                  "_type": "logs",
                  "_id": "t1453719086359h12r729.0424692910165",
                  "_score": null,
                  "_source": {
                    "article_uuid": "fcb4202a-c04d-11e5-846f-79b0e3d20eaf",
                    "initial_publish_date": "2016-01-25T09:06:01.000Z",
                    "title": "Talk of Fed policy error grows"
                  },
                  "sort": [
                    "fcb4202a-c04d-11e5-846f-79b0e3d20eaf"
                  ]
                }
              ]
            }
          },
          "avg_time_on_page": {
            "value": 41.317568609595426
          },
          "retention": {
            "doc_count": 33662
          }
        },
        {
          "key": "8acceda4-ba0b-11e5-bf7e-8a339b6f2164",
          "doc_count": 128071,
          "metadata": {
            "hits": {
              "total": 128071,
              "max_score": null,
              "hits": [
                {
                  "_index": "article_page_view-2016-01-17",
                  "_type": "logs",
                  "_id": "cijiyras600032z3864z5bj60",
                  "_score": null,
                  "_source": {
                    "article_uuid": "8acceda4-ba0b-11e5-bf7e-8a339b6f2164",
                    "initial_publish_date": "2016-01-17T13:11:23.000Z",
                    "title": "Deloitte chiefs new year memo is a classic in demotivation"
                  },
                  "sort": [
                    "8acceda4-ba0b-11e5-bf7e-8a339b6f2164"
                  ]
                }
              ]
            }
          },
          "avg_time_on_page": {
            "value": 43.18778646219675
          },
          "retention": {
            "doc_count": 48635
          }
        },
        {
          "key": "59c763a8-c24c-11e5-b3b1-7b2481276e45",
          "doc_count": 123920,
          "metadata": {
            "hits": {
              "total": 123920,
              "max_score": null,
              "hits": [
                {
                  "_index": "article_page_view-2016-01-24",
                  "_type": "logs",
                  "_id": "t1453661728248h3r237.81065503135324",
                  "_score": null,
                  "_source": {
                    "article_uuid": "59c763a8-c24c-11e5-b3b1-7b2481276e45",
                    "initial_publish_date": "2016-01-24T13:57:52.000Z",
                    "title": "Apple results: talk swirls of iPhone decline"
                  },
                  "sort": [
                    "59c763a8-c24c-11e5-b3b1-7b2481276e45"
                  ]
                }
              ]
            }
          },
          "avg_time_on_page": {
            "value": 59.04701420271142
          },
          "retention": {
            "doc_count": 46686
          }
        },
        {
          "key": "cdcc295c-c290-11e5-b3b1-7b2481276e45",
          "doc_count": 96433,
          "metadata": {
            "hits": {
              "total": 96433,
              "max_score": null,
              "hits": [
                {
                  "_index": "article_page_view-2016-01-24",
                  "_type": "logs",
                  "_id": "t1453676598688h3r373.4026844613254",
                  "_score": null,
                  "_source": {
                    "article_uuid": "cdcc295c-c290-11e5-b3b1-7b2481276e45",
                    "initial_publish_date": "2016-01-24T12:25:31.000Z",
                    "title": "Iran plans to buy 114 Airbus jets on Rouhanis Europe visit"
                  },
                  "sort": [
                    "cdcc295c-c290-11e5-b3b1-7b2481276e45"
                  ]
                }
              ]
            }
          },
          "avg_time_on_page": {
            "value": 48.08618419005942
          },
          "retention": {
            "doc_count": 34035
          }
        },
        {
          "key": "ef24be04-be8d-11e5-9fdb-87b8d15baec2",
          "doc_count": 95908,
          "metadata": {
            "hits": {
              "total": 95908,
              "max_score": null,
              "hits": [
                {
                  "_index": "article_page_view-2016-01-20",
                  "_type": "logs",
                  "_id": "t1453276368312h12r219.8961975518614",
                  "_score": null,
                  "_source": {
                    "article_uuid": "ef24be04-be8d-11e5-9fdb-87b8d15baec2",
                    "initial_publish_date": "2016-01-19T14:51:17.000Z",
                    "title": "Davos 2016: The 4 big themes facing the World Economic Forum"
                  },
                  "sort": [
                    "ef24be04-be8d-11e5-9fdb-87b8d15baec2"
                  ]
                }
              ]
            }
          },
          "avg_time_on_page": {
            "value": 51.28589898652876
          },
          "retention": {
            "doc_count": 29049
          }
        },
        {
          "key": "b33d75fe-cc5a-11e5-be0b-b7ece4e953a0",
          "doc_count": 86541,
          "metadata": {
            "hits": {
              "total": 86541,
              "max_score": null,
              "hits": [
                {
                  "_index": "article_page_view-2016-02-07",
                  "_type": "logs",
                  "_id": "t1454874682421h2r444.625711068511",
                  "_score": null,
                  "_source": {
                    "article_uuid": "b33d75fe-cc5a-11e5-be0b-b7ece4e953a0",
                    "initial_publish_date": "2016-02-07T18:43:14.000Z",
                    "title": "Google pushes further into virtual reality with new headset",
                    "primary_section": "Technology"
                  },
                  "sort": [
                    "b33d75fe-cc5a-11e5-be0b-b7ece4e953a0"
                  ]
                }
              ]
            }
          },
          "avg_time_on_page": {
            "value": 37.696918223732105
          },
          "retention": {
            "doc_count": 34401
          }
        },
        {
          "key": "4ea4deb4-baaf-11e5-bf7e-8a339b6f2164",
          "doc_count": 81685,
          "metadata": {
            "hits": {
              "total": 81685,
              "max_score": null,
              "hits": [
                {
                  "_index": "article_page_view-2016-01-24",
                  "_type": "logs",
                  "_id": "cijt0v2so00037038b45zlan6",
                  "_score": null,
                  "_source": {
                    "article_uuid": "4ea4deb4-baaf-11e5-bf7e-8a339b6f2164",
                    "initial_publish_date": "2016-01-24T17:02:17.000Z",
                    "title": "Inseads 1-year MBA tops FT rankings"
                  },
                  "sort": [
                    "4ea4deb4-baaf-11e5-bf7e-8a339b6f2164"
                  ]
                }
              ]
            }
          },
          "avg_time_on_page": {
            "value": 43.887066168819246
          },
          "retention": {
            "doc_count": 30220
          }
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
          }
        ]
      },
      "distinct_articles": {
        "value": 657
      }
    }
  }];
