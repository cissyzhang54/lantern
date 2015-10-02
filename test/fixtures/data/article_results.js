export default [{
  "took": 7,
  "timed_out": false,
  "_shards": {
    "total": 25,
    "successful": 25,
    "failed": 0
  },
  "hits": {
    "total": 51,
    "max_score": 12.243617,
    "hits": [
      {
        "_index": "article_page_view-2015-09-29",
        "_type": "logs",
        "_id": "AVAeBBiryhEyehZAoNFt",
        "_score": 12.243617,
        "_source": {
          "@version": "1",
          "@timestamp": "2015-09-30T11:29:52.058Z",
          "tags": [
            "VIEW"
          ],
          "article_uuid": "0049a468-4be5-11e5-b558-8a9722977189",
          "title": "Private equity secondaries evolve with Palamon deal",
          "initial_publish_date": "2015-08-26T17:32:01.000Z",
          "view_timestamp": "2015-09-29T03:02:22.000Z",
          "view_date": "2015-09-29",
          "user_cohort": "anonymous",
          "time_on_page": 0,
          "geo_country": "USA",
          "geo_region": "US",
          "channel": "ft.com",
          "referrer_type": "social-network",
          "referrer_name": "Twitter",
          "referrer": "http://t.co/XNYTj1jIzq",
          "device_type": "Mobile Phone",
          "authors": [
            "Joseph Cotterill"
          ],
          "genre": [
            "News"
          ],
          "sections": [
            "Companies",
            "Financials",
            "Financial Services",
            "Investment Strategy",
            "UK Companies"
          ],
          "topics": [
            "Private equity"
          ]
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
          "doc_count": 30
        },
        {
          "key_as_string": "2015-09-30T00:00:00.000Z",
          "key": 1443571200000,
          "doc_count": 21
        }
      ]
    },
    "referrer_names": {
      "doc_count_error_upper_bound": 0,
      "sum_other_doc_count": 0,
      "buckets": [
        {
          "key": "Google",
          "doc_count": 29
        },
        {
          "key": "FT",
          "doc_count": 16
        },
        {
          "key": "",
          "doc_count": 4
        },
        {
          "key": "Twitter",
          "doc_count": 2
        }
      ]
    },
    "referrer_types": {
      "doc_count_error_upper_bound": 0,
      "sum_other_doc_count": 0,
      "buckets": [
        {
          "key": "search",
          "doc_count": 29
        },
        {
          "key": "internal",
          "doc_count": 16
        },
        {
          "key": "",
          "doc_count": 4
        },
        {
          "key": "social-network",
          "doc_count": 2
        }
      ]
    },
    "regions": {
      "doc_count_error_upper_bound": 0,
      "sum_other_doc_count": 0,
      "buckets": [
        {
          "key": "UK",
          "doc_count": 21
        },
        {
          "key": "EUROPE",
          "doc_count": 11
        },
        {
          "key": "US",
          "doc_count": 11
        },
        {
          "key": "ASIA",
          "doc_count": 8
        }
      ]
    },
    "channels": {
      "doc_count_error_upper_bound": 0,
      "sum_other_doc_count": 0,
      "buckets": [
        {
          "key": "ft.com",
          "doc_count": 41
        },
        {
          "key": "",
          "doc_count": 8
        },
        {
          "key": "next",
          "doc_count": 2
        }
      ]
    },
    "devices": {
      "doc_count_error_upper_bound": 0,
      "sum_other_doc_count": 0,
      "buckets": [
        {
          "key": "Desktop",
          "doc_count": 36
        },
        {
          "key": "Mobile Phone",
          "doc_count": 11
        },
        {
          "key": "",
          "doc_count": 2
        },
        {
          "key": "Tablet",
          "doc_count": 2
        }
      ]
    },
    "avg_time_on_page": {
      "value": 2.450980392156863
    },
    "countries": {
      "doc_count_error_upper_bound": 0,
      "sum_other_doc_count": 0,
      "buckets": [
        {
          "key": "GBR",
          "doc_count": 21
        },
        {
          "key": "USA",
          "doc_count": 11
        },
        {
          "key": "ITA",
          "doc_count": 7
        },
        {
          "key": "SGP",
          "doc_count": 4
        },
        {
          "key": "AUS",
          "doc_count": 2
        },
        {
          "key": "CHE",
          "doc_count": 2
        },
        {
          "key": "HKG",
          "doc_count": 2
        },
        {
          "key": "NGA",
          "doc_count": 2
        }
      ]
    },
    "referrer_url": {
      "doc_count_error_upper_bound": 0,
      "sum_other_doc_count": 8,
      "buckets": [
        {
          "key": "",
          "doc_count": 15
        },
        {
          "key": "https://www.google.co.uk/",
          "doc_count": 10
        },
        {
          "key": "https://www.google.com/",
          "doc_count": 4
        },
        {
          "key": "http://lnkd.in",
          "doc_count": 2
        },
        {
          "key": "http://localhost:3000/articles/0049a468-4be5-11e5-b558-8a9722977189",
          "doc_count": 2
        },
        {
          "key": "http://t.co/XNYTj1jIzq",
          "doc_count": 2
        },
        {
          "key": "http://www.google.co.uk/url?sa=t&rct=j&q=&esrc=s&source=web&cd=5&cad=rja&uact=8&ved=0CDoQFjAEahUKEwjf8efynJzIAhXJ2BoKHf3YAxs&url=http%3A%2F%2Fwww.ft.com%2Fcms%2Fs%2F0%2F0049a468-4be5-11e5-b558-8a9722977189.html&usg=AFQjCNG31f1iiplUDLMQ8LxTuqbNA4aKow&sig2=C-PnoY0bDpTvLhp1pMeohg",
          "doc_count": 2
        },
        {
          "key": "http://www.google.co.uk/url?sa=t&rct=j&q=&esrc=s&source=web&cd=8&ved=0CDYQFjAHahUKEwiAteSWnJ7IAhVIWBQKHcPFDbI&url=http%3A%2F%2Fwww.ft.com%2Fcms%2Fs%2F0%2F0049a468-4be5-11e5-b558-8a9722977189.html&usg=AFQjCNG31f1iiplUDLMQ8LxTuqbNA4aKow",
          "doc_count": 2
        },
        {
          "key": "https://www.google.ch",
          "doc_count": 2
        },
        {
          "key": "https://www.google.com.au/",
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
