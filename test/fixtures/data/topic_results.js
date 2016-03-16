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
    ],
    "aggregations": {
      "articles_published_over_time": {
        "buckets": [
          {
            "key_as_string": "2016-03-11T00:00:00.000Z",
            "key": 1457654400000,
            "doc_count": 2
          }
        ]
      },
      "distinct_articles_published": {
        "value": 2
      }
    }
  }
}, {
    "took": 451,
    "timed_out": false,
    "_shards": {
      "total": 72,
      "successful": 6,
      "failed": 0
    },
    "hits": {
      "total": 492236,
      "max_score": 3.6236136,
      "hits": [
        {
          "_index": "article_page_view-2015-10-10",
          "_type": "logs",
          "_id": "AVCkSBn2dQYQZRnESmC2",
          "_score": 3.6236136,
          "_source": {
            "@version": "1",
            "@timestamp": "2015-10-26T13:13:17.213Z",
            "tags": [
              "VIEW"
            ],
            "article_uuid": "bcdcbcca-6dcb-11e5-8171-ba1968cf791a",
            "title": "Andrew Tyrie intervenes on small bank supertax",
            "initial_publish_date": "2015-10-08T23:03:39.000Z",
            "view_timestamp": "2015-10-10T06:55:12.000Z",
            "view_date": "2015-10-10",
            "time_since_publish": 1912,
            "user_cohort": "anonymous",
            "time_on_page": 2,
            "geo_country": "IRL",
            "geo_region": "EUROPE",
            "channel": "FT app",
            "referrer_type": "",
            "referrer_name": "",
            "referrer": "",
            "device_type": "Tablet",
            "is_first_visit": false,
            "is_last_page": false,
            "rfv_cluster": "1. FT Super Fans",
            "next_internal_url": "http://app.ft.com/#cms/s/bcdcbcca-6dcb-11e5-8171-ba1968cf791a.html?sectionid=uk",
            "next_internal_url_type": "story",
            "authors": [
              "Caroline Binham"
            ],
            "genre": [
              "News"
            ],
            "sections": [
              "UK",
              "UK Business & Economy",
              "UK Politics & Policy",
              "Banks",
              "Financials"
            ],
            "topics": [
              "UK banks"
            ],
            "is_subscription": false,
            "visitor_id": 9097615
          }
        }
      ]
    },
    "aggregations": {
      "page_views_over_time": {
        "buckets": [
          {
            "key_as_string": "2015-09-13T00:00:00.000Z",
            "key": 1442102400000,
            "doc_count": 5
          },
          {
            "key_as_string": "2015-09-14T00:00:00.000Z",
            "key": 1442188800000,
            "doc_count": 0
          },
          {
            "key_as_string": "2015-09-15T00:00:00.000Z",
            "key": 1442275200000,
            "doc_count": 0
          },
          {
            "key_as_string": "2015-09-16T00:00:00.000Z",
            "key": 1442361600000,
            "doc_count": 0
          },
          {
            "key_as_string": "2015-09-17T00:00:00.000Z",
            "key": 1442448000000,
            "doc_count": 0
          },
          {
            "key_as_string": "2015-09-18T00:00:00.000Z",
            "key": 1442534400000,
            "doc_count": 0
          },
          {
            "key_as_string": "2015-09-19T00:00:00.000Z",
            "key": 1442620800000,
            "doc_count": 0
          },
          {
            "key_as_string": "2015-09-20T00:00:00.000Z",
            "key": 1442707200000,
            "doc_count": 0
          },
          {
            "key_as_string": "2015-09-21T00:00:00.000Z",
            "key": 1442793600000,
            "doc_count": 0
          },
          {
            "key_as_string": "2015-09-22T00:00:00.000Z",
            "key": 1442880000000,
            "doc_count": 0
          },
          {
            "key_as_string": "2015-09-23T00:00:00.000Z",
            "key": 1442966400000,
            "doc_count": 0
          },
          {
            "key_as_string": "2015-09-24T00:00:00.000Z",
            "key": 1443052800000,
            "doc_count": 0
          },
          {
            "key_as_string": "2015-09-25T00:00:00.000Z",
            "key": 1443139200000,
            "doc_count": 0
          },
          {
            "key_as_string": "2015-09-26T00:00:00.000Z",
            "key": 1443225600000,
            "doc_count": 0
          },
          {
            "key_as_string": "2015-09-27T00:00:00.000Z",
            "key": 1443312000000,
            "doc_count": 0
          },
          {
            "key_as_string": "2015-09-28T00:00:00.000Z",
            "key": 1443398400000,
            "doc_count": 0
          },
          {
            "key_as_string": "2015-09-29T00:00:00.000Z",
            "key": 1443484800000,
            "doc_count": 0
          },
          {
            "key_as_string": "2015-09-30T00:00:00.000Z",
            "key": 1443571200000,
            "doc_count": 0
          },
          {
            "key_as_string": "2015-10-01T00:00:00.000Z",
            "key": 1443657600000,
            "doc_count": 0
          },
          {
            "key_as_string": "2015-10-02T00:00:00.000Z",
            "key": 1443744000000,
            "doc_count": 0
          },
          {
            "key_as_string": "2015-10-03T00:00:00.000Z",
            "key": 1443830400000,
            "doc_count": 133913
          },
          {
            "key_as_string": "2015-10-04T00:00:00.000Z",
            "key": 1443916800000,
            "doc_count": 0
          },
          {
            "key_as_string": "2015-10-05T00:00:00.000Z",
            "key": 1444003200000,
            "doc_count": 0
          },
          {
            "key_as_string": "2015-10-06T00:00:00.000Z",
            "key": 1444089600000,
            "doc_count": 293868
          },
          {
            "key_as_string": "2015-10-07T00:00:00.000Z",
            "key": 1444176000000,
            "doc_count": 0
          },
          {
            "key_as_string": "2015-10-08T00:00:00.000Z",
            "key": 1444262400000,
            "doc_count": 0
          },
          {
            "key_as_string": "2015-10-09T00:00:00.000Z",
            "key": 1444348800000,
            "doc_count": 0
          },
          {
            "key_as_string": "2015-10-10T00:00:00.000Z",
            "key": 1444435200000,
            "doc_count": 64450
          }
        ]
      },
      "regions": {
        "doc_count_error_upper_bound": 0,
        "sum_other_doc_count": 0,
        "buckets": [
          {
            "key": "EUROPE",
            "doc_count": 238216
          },
          {
            "key": "UK",
            "doc_count": 111968
          },
          {
            "key": "US",
            "doc_count": 102544
          },
          {
            "key": "ASIA",
            "doc_count": 25341
          },
          {
            "key": "",
            "doc_count": 5502
          },
          {
            "key": "INDIA",
            "doc_count": 4362
          },
          {
            "key": "MIDDLEEAST",
            "doc_count": 4298
          }
        ]
      },
      "devices": {
        "doc_count_error_upper_bound": 0,
        "sum_other_doc_count": 0,
        "buckets": [
          {
            "key": "Desktop",
            "doc_count": 199155
          },
          {
            "key": "Mobile Phone",
            "doc_count": 150334
          },
          {
            "key": "Tablet",
            "doc_count": 135949
          },
          {
            "key": "",
            "doc_count": 6530
          },
          {
            "key": "Media Player",
            "doc_count": 226
          },
          {
            "key": "Games Console",
            "doc_count": 34
          },
          {
            "key": "Set Top Box",
            "doc_count": 3
          }
        ]
      },
      "is_subscription": {
        "doc_count_error_upper_bound": 0,
        "sum_other_doc_count": 0,
        "buckets": [
          {
            "key": "F",
            "doc_count": 492231
          }
        ]
      },
      "unique_visitors": {
        "value": 155212
      },
      "internal_referrer": {
        "doc_count": 205836,
        "urls": {
          "doc_count_error_upper_bound": 76,
          "sum_other_doc_count": 42722,
          "buckets": [
            {
              "key": "",
              "doc_count": 91437
            },
            {
              "key": "http://www.ft.com/home/uk",
              "doc_count": 35397
            },
            {
              "key": "http://www.ft.com/home/us",
              "doc_count": 11520
            },
            {
              "key": "http://www.ft.com/home/europe",
              "doc_count": 9887
            },
            {
              "key": "http://www.ft.com/home/asia",
              "doc_count": 5432
            },
            {
              "key": "https://next.ft.com/uk",
              "doc_count": 3590
            },
            {
              "key": "http://www.ft.com/world/uk",
              "doc_count": 1933
            },
            {
              "key": "http://www.ft.com/intl/markets",
              "doc_count": 1705
            },
            {
              "key": "http://www.ft.com/intl/comment",
              "doc_count": 1114
            },
            {
              "key": "http://www.ft.com/comment",
              "doc_count": 1099
            }
          ]
        },
        "types": {
          "doc_count_error_upper_bound": 0,
          "sum_other_doc_count": 0,
          "buckets": [
            {
              "key": "",
              "doc_count": 87165
            },
            {
              "key": "front",
              "doc_count": 51202
            },
            {
              "key": "story",
              "doc_count": 45333
            },
            {
              "key": "section",
              "doc_count": 16935
            },
            {
              "key": "search",
              "doc_count": 2784
            },
            {
              "key": "page",
              "doc_count": 1783
            },
            {
              "key": "topic",
              "doc_count": 464
            },
            {
              "key": "video",
              "doc_count": 105
            },
            {
              "key": "report",
              "doc_count": 43
            },
            {
              "key": "blog",
              "doc_count": 22
            }
          ]
        }
      },
      "countries": {
        "doc_count_error_upper_bound": 0,
        "sum_other_doc_count": 0,
        "buckets": [
          {
            "key": "IRL",
            "doc_count": 194027
          },
          {
            "key": "GBR",
            "doc_count": 111968
          },
          {
            "key": "USA",
            "doc_count": 91371
          },
          {
            "key": "CAN",
            "doc_count": 6040
          },
          {
            "key": "FRA",
            "doc_count": 5006
          },
          {
            "key": "SGP",
            "doc_count": 4923
          },
          {
            "key": "HKG",
            "doc_count": 4807
          },
          {
            "key": "DEU",
            "doc_count": 4379
          },
          {
            "key": "AUS",
            "doc_count": 4317
          },
          {
            "key": "IND",
            "doc_count": 4232
          },
          {
            "key": "JPN",
            "doc_count": 4059
          },
          {
            "key": "CHE",
            "doc_count": 3859
          },
          {
            "key": "ITA",
            "doc_count": 3727
          },
          {
            "key": "ESP",
            "doc_count": 3696
          },
          {
            "key": "NLD",
            "doc_count": 3018
          },
          {
            "key": "RUS",
            "doc_count": 2419
          },
          {
            "key": "BEL",
            "doc_count": 2389
          },
          {
            "key": "EU",
            "doc_count": 2137
          },
          {
            "key": "BRA",
            "doc_count": 1946
          },
          {
            "key": "ARE",
            "doc_count": 1611
          },
          {
            "key": "SWE",
            "doc_count": 1547
          },
          {
            "key": "MYS",
            "doc_count": 1290
          },
          {
            "key": "KOR",
            "doc_count": 1272
          },
          {
            "key": "TUR",
            "doc_count": 1257
          },
          {
            "key": "CHN",
            "doc_count": 1249
          },
          {
            "key": "ZAF",
            "doc_count": 1224
          },
          {
            "key": "PRT",
            "doc_count": 1188
          },
          {
            "key": "AP",
            "doc_count": 1072
          },
          {
            "key": "GRC",
            "doc_count": 1038
          },
          {
            "key": "THA",
            "doc_count": 975
          },
          {
            "key": "NOR",
            "doc_count": 927
          },
          {
            "key": "FIN",
            "doc_count": 899
          },
          {
            "key": "NZL",
            "doc_count": 866
          },
          {
            "key": "DNK",
            "doc_count": 847
          },
          {
            "key": "MEX",
            "doc_count": 820
          },
          {
            "key": "POL",
            "doc_count": 723
          },
          {
            "key": "NGA",
            "doc_count": 671
          },
          {
            "key": "AUT",
            "doc_count": 627
          },
          {
            "key": "TWN",
            "doc_count": 624
          },
          {
            "key": "PHL",
            "doc_count": 623
          },
          {
            "key": "PER",
            "doc_count": 561
          },
          {
            "key": "LUX",
            "doc_count": 520
          },
          {
            "key": "SAU",
            "doc_count": 512
          },
          {
            "key": "ISR",
            "doc_count": 507
          },
          {
            "key": "IDN",
            "doc_count": 491
          },
          {
            "key": "ARG",
            "doc_count": 394
          },
          {
            "key": "VNM",
            "doc_count": 394
          },
          {
            "key": "CZE",
            "doc_count": 372
          },
          {
            "key": "QAT",
            "doc_count": 358
          },
          {
            "key": "PAK",
            "doc_count": 354
          },
          {
            "key": "ROU",
            "doc_count": 344
          },
          {
            "key": "CYP",
            "doc_count": 322
          },
          {
            "key": "EGY",
            "doc_count": 313
          },
          {
            "key": "CHL",
            "doc_count": 276
          },
          {
            "key": "HUN",
            "doc_count": 257
          },
          {
            "key": "BGR",
            "doc_count": 244
          },
          {
            "key": "UKR",
            "doc_count": 243
          },
          {
            "key": "COL",
            "doc_count": 226
          },
          {
            "key": "KEN",
            "doc_count": 224
          },
          {
            "key": "JEY",
            "doc_count": 221
          },
          {
            "key": "LBN",
            "doc_count": 203
          },
          {
            "key": "MLT",
            "doc_count": 176
          },
          {
            "key": "KAZ",
            "doc_count": 155
          },
          {
            "key": "SRB",
            "doc_count": 149
          },
          {
            "key": "GHA",
            "doc_count": 148
          },
          {
            "key": "HRV",
            "doc_count": 147
          },
          {
            "key": "KWT",
            "doc_count": 140
          },
          {
            "key": "SVN",
            "doc_count": 140
          },
          {
            "key": "GGY",
            "doc_count": 139
          },
          {
            "key": "BHR",
            "doc_count": 137
          },
          {
            "key": "SVK",
            "doc_count": 129
          },
          {
            "key": "LVA",
            "doc_count": 125
          },
          {
            "key": "LTU",
            "doc_count": 119
          },
          {
            "key": "MCO",
            "doc_count": 119
          },
          {
            "key": "MUS",
            "doc_count": 117
          },
          {
            "key": "IRN",
            "doc_count": 116
          },
          {
            "key": "EST",
            "doc_count": 114
          },
          {
            "key": "MAR",
            "doc_count": 112
          },
          {
            "key": "BGD",
            "doc_count": 107
          },
          {
            "key": "ISL",
            "doc_count": 107
          },
          {
            "key": "OMN",
            "doc_count": 104
          },
          {
            "key": "ALB",
            "doc_count": 87
          },
          {
            "key": "LKA",
            "doc_count": 83
          },
          {
            "key": "TTO",
            "doc_count": 83
          },
          {
            "key": "BRB",
            "doc_count": 80
          },
          {
            "key": "JOR",
            "doc_count": 80
          },
          {
            "key": "BMU",
            "doc_count": 79
          },
          {
            "key": "IMN",
            "doc_count": 79
          },
          {
            "key": "AZE",
            "doc_count": 76
          },
          {
            "key": "CYM",
            "doc_count": 76
          },
          {
            "key": "URY",
            "doc_count": 73
          },
          {
            "key": "PAN",
            "doc_count": 67
          },
          {
            "key": "BRN",
            "doc_count": 61
          },
          {
            "key": "ZWE",
            "doc_count": 53
          },
          {
            "key": "CRI",
            "doc_count": 51
          },
          {
            "key": "ECU",
            "doc_count": 49
          },
          {
            "key": "TUN",
            "doc_count": 49
          },
          {
            "key": "TZA",
            "doc_count": 49
          },
          {
            "key": "KHM",
            "doc_count": 47
          },
          {
            "key": "NPL",
            "doc_count": 47
          },
          {
            "key": "BWA",
            "doc_count": 46
          },
          {
            "key": "BHS",
            "doc_count": 45
          },
          {
            "key": "GEO",
            "doc_count": 42
          },
          {
            "key": "VEN",
            "doc_count": 42
          },
          {
            "key": "AGO",
            "doc_count": 41
          },
          {
            "key": "JAM",
            "doc_count": 41
          },
          {
            "key": "SEN",
            "doc_count": 41
          },
          {
            "key": "ZMB",
            "doc_count": 39
          },
          {
            "key": "PRI",
            "doc_count": 37
          },
          {
            "key": "BIH",
            "doc_count": 35
          },
          {
            "key": "A1",
            "doc_count": 33
          },
          {
            "key": "UGA",
            "doc_count": 32
          },
          {
            "key": "DOM",
            "doc_count": 31
          },
          {
            "key": "MMR",
            "doc_count": 31
          },
          {
            "key": "MAC",
            "doc_count": 29
          },
          {
            "key": "BLR",
            "doc_count": 28
          },
          {
            "key": "CIV",
            "doc_count": 27
          },
          {
            "key": "GIB",
            "doc_count": 26
          },
          {
            "key": "MNG",
            "doc_count": 26
          },
          {
            "key": "AND",
            "doc_count": 25
          },
          {
            "key": "LIE",
            "doc_count": 25
          },
          {
            "key": "MNE",
            "doc_count": 25
          },
          {
            "key": "MOZ",
            "doc_count": 24
          },
          {
            "key": "ARM",
            "doc_count": 22
          },
          {
            "key": "ETH",
            "doc_count": 22
          },
          {
            "key": "RWA",
            "doc_count": 22
          },
          {
            "key": "BOL",
            "doc_count": 19
          },
          {
            "key": "GTM",
            "doc_count": 18
          },
          {
            "key": "KGZ",
            "doc_count": 18
          },
          {
            "key": "MDA",
            "doc_count": 18
          },
          {
            "key": "MKD",
            "doc_count": 18
          },
          {
            "key": "DZA",
            "doc_count": 17
          },
          {
            "key": "MWI",
            "doc_count": 16
          },
          {
            "key": "A2",
            "doc_count": 15
          },
          {
            "key": "TJK",
            "doc_count": 15
          },
          {
            "key": "IRQ",
            "doc_count": 14
          },
          {
            "key": "LBY",
            "doc_count": 14
          },
          {
            "key": "FJI",
            "doc_count": 13
          },
          {
            "key": "LAO",
            "doc_count": 13
          },
          {
            "key": "MDV",
            "doc_count": 13
          },
          {
            "key": "VGB",
            "doc_count": 13
          },
          {
            "key": "BEN",
            "doc_count": 12
          },
          {
            "key": "HTI",
            "doc_count": 12
          },
          {
            "key": "NAM",
            "doc_count": 12
          },
          {
            "key": "SLV",
            "doc_count": 12
          },
          {
            "key": "CMR",
            "doc_count": 11
          },
          {
            "key": "SUR",
            "doc_count": 11
          },
          {
            "key": "NIC",
            "doc_count": 10
          },
          {
            "key": "PSE",
            "doc_count": 9
          },
          {
            "key": "SDN",
            "doc_count": 9
          },
          {
            "key": "GMB",
            "doc_count": 8
          },
          {
            "key": "HND",
            "doc_count": 8
          },
          {
            "key": "PRY",
            "doc_count": 8
          },
          {
            "key": "BFA",
            "doc_count": 7
          },
          {
            "key": "AFG",
            "doc_count": 6
          },
          {
            "key": "CUB",
            "doc_count": 6
          },
          {
            "key": "GUY",
            "doc_count": 6
          },
          {
            "key": "KNA",
            "doc_count": 6
          },
          {
            "key": "",
            "doc_count": 5
          },
          {
            "key": "BLZ",
            "doc_count": 5
          },
          {
            "key": "CPV",
            "doc_count": 5
          },
          {
            "key": "MDG",
            "doc_count": 5
          },
          {
            "key": "MTQ",
            "doc_count": 5
          },
          {
            "key": "NCL",
            "doc_count": 5
          },
          {
            "key": "PYF",
            "doc_count": 5
          },
          {
            "key": "SLE",
            "doc_count": 5
          },
          {
            "key": "COD",
            "doc_count": 4
          },
          {
            "key": "CUW",
            "doc_count": 4
          },
          {
            "key": "NER",
            "doc_count": 4
          },
          {
            "key": "SOM",
            "doc_count": 4
          },
          {
            "key": "TGO",
            "doc_count": 4
          },
          {
            "key": "YEM",
            "doc_count": 4
          },
          {
            "key": "ALA",
            "doc_count": 3
          },
          {
            "key": "FRO",
            "doc_count": 3
          },
          {
            "key": "GLP",
            "doc_count": 3
          },
          {
            "key": "GRD",
            "doc_count": 3
          },
          {
            "key": "GUM",
            "doc_count": 3
          },
          {
            "key": "PNG",
            "doc_count": 3
          },
          {
            "key": "PRK",
            "doc_count": 3
          },
          {
            "key": "SYC",
            "doc_count": 3
          },
          {
            "key": "TLS",
            "doc_count": 3
          },
          {
            "key": "VIR",
            "doc_count": 3
          },
          {
            "key": "BTN",
            "doc_count": 2
          },
          {
            "key": "COG",
            "doc_count": 2
          },
          {
            "key": "COK",
            "doc_count": 2
          },
          {
            "key": "FLK",
            "doc_count": 2
          },
          {
            "key": "FSM",
            "doc_count": 2
          },
          {
            "key": "GIN",
            "doc_count": 2
          },
          {
            "key": "GNQ",
            "doc_count": 2
          },
          {
            "key": "GRL",
            "doc_count": 2
          },
          {
            "key": "LCA",
            "doc_count": 2
          },
          {
            "key": "MNP",
            "doc_count": 2
          },
          {
            "key": "MRT",
            "doc_count": 2
          },
          {
            "key": "SWZ",
            "doc_count": 2
          },
          {
            "key": "SYR",
            "doc_count": 2
          },
          {
            "key": "VCT",
            "doc_count": 2
          },
          {
            "key": "ATG",
            "doc_count": 1
          },
          {
            "key": "DMA",
            "doc_count": 1
          },
          {
            "key": "GAB",
            "doc_count": 1
          },
          {
            "key": "LBR",
            "doc_count": 1
          },
          {
            "key": "MHL",
            "doc_count": 1
          },
          {
            "key": "REU",
            "doc_count": 1
          },
          {
            "key": "SLB",
            "doc_count": 1
          },
          {
            "key": "SMR",
            "doc_count": 1
          },
          {
            "key": "STP",
            "doc_count": 1
          },
          {
            "key": "SXM",
            "doc_count": 1
          }
        ]
      },
      "section_views": {
        "doc_count_error_upper_bound": 820,
        "sum_other_doc_count": 1777679,
        "buckets": [
          {
            "key": "uk",
            "doc_count": 227302
          },
          {
            "key": "economy",
            "doc_count": 225170
          },
          {
            "key": "politics",
            "doc_count": 173569
          },
          {
            "key": "policy",
            "doc_count": 173164
          },
          {
            "key": "markets",
            "doc_count": 170959
          },
          {
            "key": "companies",
            "doc_count": 137671
          },
          {
            "key": "financials",
            "doc_count": 135808
          },
          {
            "key": "global",
            "doc_count": 124440
          },
          {
            "key": "banks",
            "doc_count": 117873
          },
          {
            "key": "comment",
            "doc_count": 108739
          }
        ]
      },
      "rfv_cluster": {
        "doc_count_error_upper_bound": 0,
        "sum_other_doc_count": 0,
        "buckets": [
          {
            "key": "",
            "doc_count": 136695
          },
          {
            "key": "1. FT Super Fans",
            "doc_count": 274395
          },
          {
            "key": "2. FT Fans",
            "doc_count": 31036
          },
          {
            "key": "3. Engaged, Frequent and Free",
            "doc_count": 4603
          },
          {
            "key": "4. Borderline Engaged",
            "doc_count": 26203
          },
          {
            "key": "5. Half Engaged",
            "doc_count": 6744
          },
          {
            "key": "6. Occasional Skimmers",
            "doc_count": 10494
          },
          {
            "key": "7. Disengaged Long Tail",
            "doc_count": 2061
          }
        ]
      },
      "referrer": {
        "doc_count": 286400,
        "types": {
          "doc_count_error_upper_bound": 0,
          "sum_other_doc_count": 0,
          "buckets": [
            {
              "key": "",
              "doc_count": 236045
            },
            {
              "key": "search",
              "doc_count": 25171
            },
            {
              "key": "social-network",
              "doc_count": 17126
            },
            {
              "key": "news-sharing",
              "doc_count": 5996
            },
            {
              "key": "partner",
              "doc_count": 1863
            },
            {
              "key": "email",
              "doc_count": 93
            },
            {
              "key": "aggregator",
              "doc_count": 80
            },
            {
              "key": "sister",
              "doc_count": 21
            },
            {
              "key": "internal",
              "doc_count": 0
            },
            {
              "key": "video-sharing",
              "doc_count": 0
            }
          ]
        },
        "names": {
          "doc_count_error_upper_bound": 0,
          "sum_other_doc_count": 644,
          "buckets": [
            {
              "key": "",
              "doc_count": 236089
            },
            {
              "key": "Google",
              "doc_count": 22780
            },
            {
              "key": "Twitter",
              "doc_count": 8818
            },
            {
              "key": "Facebook",
              "doc_count": 8288
            },
            {
              "key": "Google News",
              "doc_count": 5957
            },
            {
              "key": "Yahoo",
              "doc_count": 1810
            },
            {
              "key": "Yahoo Finance",
              "doc_count": 1399
            },
            {
              "key": "Bing",
              "doc_count": 401
            },
            {
              "key": "Linked-In",
              "doc_count": 119
            },
            {
              "key": "abnormalreturns.com",
              "doc_count": 90
            }
          ]
        }
      },
      "is_first_visit": {
        "doc_count": 192,
        "anonymous": {
          "doc_count_error_upper_bound": 0,
          "sum_other_doc_count": 0,
          "buckets": [
            {
              "key": "F",
              "doc_count": 109
            },
            {
              "key": "T",
              "doc_count": 83
            }
          ]
        }
      },
      "social_referrers": {
        "doc_count": 17126,
        "filtered": {
          "doc_count_error_upper_bound": 0,
          "sum_other_doc_count": 0,
          "buckets": [
            {
              "key": "Twitter",
              "doc_count": 8818
            },
            {
              "key": "Facebook",
              "doc_count": 8288
            },
            {
              "key": "",
              "doc_count": 10
            },
            {
              "key": "Google Plus",
              "doc_count": 6
            },
            {
              "key": "Tumblr",
              "doc_count": 4
            },
            {
              "key": "247 Wall St",
              "doc_count": 0
            },
            {
              "key": "AOL",
              "doc_count": 0
            },
            {
              "key": "AOL Mail",
              "doc_count": 0
            },
            {
              "key": "AOL Money",
              "doc_count": 0
            },
            {
              "key": "AOL UK",
              "doc_count": 0
            },
            {
              "key": "About",
              "doc_count": 0
            },
            {
              "key": "Ask",
              "doc_count": 0
            },
            {
              "key": "BBC News",
              "doc_count": 0
            },
            {
              "key": "BNET",
              "doc_count": 0
            },
            {
              "key": "Baidu",
              "doc_count": 0
            },
            {
              "key": "Bing",
              "doc_count": 0
            },
            {
              "key": "Breaking News",
              "doc_count": 0
            },
            {
              "key": "Breitbart",
              "doc_count": 0
            },
            {
              "key": "Business of Fashion",
              "doc_count": 0
            },
            {
              "key": "CBS News",
              "doc_count": 0
            },
            {
              "key": "CNBC",
              "doc_count": 0
            },
            {
              "key": "CNN",
              "doc_count": 0
            },
            {
              "key": "CNN Edition",
              "doc_count": 0
            },
            {
              "key": "CNN Money",
              "doc_count": 0
            },
            {
              "key": "Calculated Risk Blog",
              "doc_count": 0
            },
            {
              "key": "Christies",
              "doc_count": 0
            },
            {
              "key": "Commodities Now",
              "doc_count": 0
            },
            {
              "key": "Daum",
              "doc_count": 0
            },
            {
              "key": "Dealbreaker",
              "doc_count": 0
            },
            {
              "key": "Digg",
              "doc_count": 0
            },
            {
              "key": "Dogpile",
              "doc_count": 0
            },
            {
              "key": "Drudge Report",
              "doc_count": 0
            },
            {
              "key": "Etoro",
              "doc_count": 0
            },
            {
              "key": "Excite",
              "doc_count": 0
            },
            {
              "key": "FT Chinese",
              "doc_count": 0
            },
            {
              "key": "Gmail",
              "doc_count": 0
            },
            {
              "key": "Google",
              "doc_count": 0
            },
            {
              "key": "Google News",
              "doc_count": 0
            },
            {
              "key": "Huffington Post",
              "doc_count": 0
            },
            {
              "key": "Investors' Chronicle",
              "doc_count": 0
            },
            {
              "key": "Linked-In",
              "doc_count": 0
            },
            {
              "key": "Look Smart",
              "doc_count": 0
            },
            {
              "key": "MBA.com",
              "doc_count": 0
            },
            {
              "key": "MSN",
              "doc_count": 0
            },
            {
              "key": "Marginal Revolution",
              "doc_count": 0
            },
            {
              "key": "Merger Market",
              "doc_count": 0
            },
            {
              "key": "Morning Star",
              "doc_count": 0
            },
            {
              "key": "My Search",
              "doc_count": 0
            },
            {
              "key": "My Yahoo",
              "doc_count": 0
            },
            {
              "key": "Naver",
              "doc_count": 0
            },
            {
              "key": "Net vibes",
              "doc_count": 0
            },
            {
              "key": "Other Search",
              "doc_count": 0
            },
            {
              "key": "Other email",
              "doc_count": 0
            },
            {
              "key": "PBS",
              "doc_count": 0
            },
            {
              "key": "Publication Samachar",
              "doc_count": 0
            },
            {
              "key": "Rambler",
              "doc_count": 0
            },
            {
              "key": "Real Clear Markets",
              "doc_count": 0
            },
            {
              "key": "Real Clear Politics",
              "doc_count": 0
            },
            {
              "key": "Reddit",
              "doc_count": 0
            },
            {
              "key": "Rediff",
              "doc_count": 0
            },
            {
              "key": "Sogou",
              "doc_count": 0
            },
            {
              "key": "Soso",
              "doc_count": 0
            },
            {
              "key": "Steel on the net",
              "doc_count": 0
            },
            {
              "key": "Stumble Upon",
              "doc_count": 0
            },
            {
              "key": "Techmeme",
              "doc_count": 0
            },
            {
              "key": "The Banker",
              "doc_count": 0
            },
            {
              "key": "The Business Insider",
              "doc_count": 0
            },
            {
              "key": "The Globe and Mail",
              "doc_count": 0
            },
            {
              "key": "Topix",
              "doc_count": 0
            },
            {
              "key": "Virgilio",
              "doc_count": 0
            },
            {
              "key": "Virgin Media",
              "doc_count": 0
            },
            {
              "key": "Washington Post",
              "doc_count": 0
            },
            {
              "key": "Windows Live Mail",
              "doc_count": 0
            },
            {
              "key": "Yahoo",
              "doc_count": 0
            },
            {
              "key": "Yahoo Biz",
              "doc_count": 0
            },
            {
              "key": "Yahoo Finance",
              "doc_count": 0
            },
            {
              "key": "Yahoo Mail",
              "doc_count": 0
            },
            {
              "key": "Yahoo News",
              "doc_count": 0
            },
            {
              "key": "Yandex",
              "doc_count": 0
            },
            {
              "key": "YouTube",
              "doc_count": 0
            },
            {
              "key": "abnormalreturns.com",
              "doc_count": 0
            },
            {
              "key": "blog",
              "doc_count": 0
            },
            {
              "key": "front",
              "doc_count": 0
            },
            {
              "key": "ise.com",
              "doc_count": 0
            },
            {
              "key": "moneycontrol.com",
              "doc_count": 0
            },
            {
              "key": "page",
              "doc_count": 0
            },
            {
              "key": "pinterest",
              "doc_count": 0
            },
            {
              "key": "report",
              "doc_count": 0
            },
            {
              "key": "search",
              "doc_count": 0
            },
            {
              "key": "section",
              "doc_count": 0
            },
            {
              "key": "story",
              "doc_count": 0
            },
            {
              "key": "thestreet.com",
              "doc_count": 0
            },
            {
              "key": "theweek.com",
              "doc_count": 0
            },
            {
              "key": "topic",
              "doc_count": 0
            },
            {
              "key": "video",
              "doc_count": 0
            }
          ]
        }
      },
      "user_cohort": {
        "doc_count_error_upper_bound": 0,
        "sum_other_doc_count": 0,
        "buckets": [
          {
            "key": "anonymous",
            "doc_count": 343224
          },
          {
            "key": "subscriber",
            "doc_count": 134042
          },
          {
            "key": "registered",
            "doc_count": 14937
          },
          {
            "key": "weekend",
            "doc_count": 29
          }
        ]
      }
    }
  }
];
