import assert from 'assert';
import moment from 'moment';

export default function ComparatorPageViewsQuery(query) {

  assert.equal(typeof query, 'object',
    "argument 'query' should be an object");

  assert.equal(typeof query.comparator, 'string',
    "argument 'query' must contain a 'comparator' string property");

  assert.equal(typeof query.dateFrom, 'string',
    "argument 'query' must contain a 'dateFrom' date string property");

  assert.equal(typeof query.dateTo, 'string',
    "argument 'query' must contain a 'dateTo' date property");

  let match = {
      "match" : {  sections: query.comparator  }
  }
  let filter = {
    "and" : [
      {
        range : {
          view_timestamp : {
            from: query.dateFrom,
            to: query.dateTo
          }
        }
      }
    ]
  }
  for (var o in query.filters){
    if (query.filters[o]){
      filter.and.push({
        "term" : { [o]: query.filters[o] }
      })
    }
  }
  let filtered = {
    "query" : match,
    "filter" : filter
  }
  if (query.comparator === 'FT'){
    delete filtered.query
  }

  return {
    "query" : {
      "filtered" : filtered
    },
    "size": 1,
    "aggs" : {
      "page_views_over_time" : {
        "date_histogram" : {
          "field" : "view_timestamp",
          interval : calculateInterval(query),
          min_doc_count : 0
        }
      },
      avg_time_on_page : {
        avg : {
          field: "time_on_page"
        }
      },
      "page_view_total_count" : {
        "value_count" : {
          "field" : "article_uuid"
        }
      },
      "distinct_articles" : {
        "cardinality" : {
          "field" : "article_uuid"
        }
      },
      referrer_types : {
        filter : {
          not : {
            term : {
              referrer_type : "internal"
            }
          }
        },
        aggs: {
          filtered : {
            terms: {
              field: "referrer_type",
              min_doc_count : 0
            }
          }
        }
      },
      social_referrers : {
        filter : {
          term : {
            referrer_type : 'social-network'
          }
        },
        aggs: {
          filtered: {
            terms : {
              field : 'referrer_name',
              min_doc_count : 0,
              size: 200000000
            }
          }
        }
      },
      is_last_page: {
        terms: {
          field: 'is_last_page',
          min_doc_count : 0
        }
      },
      user_cohort : {
        terms : {
          field : 'user_cohort',
          min_doc_count : 0
        }
      },
      rfv_cluster: {
        terms : {
          field : "rfv_cluster",
          min_doc_count : 0
        }
      },
      is_first_visit : {
        terms: {
          field: "is_first_visit",
          min_doc_count : 0
        }
      },
      "regions" : {
        "terms": {
          "field": "geo_region"
        }
      },
      internal_referrer_types: {
        filter : {
          term : {
            referrer_type : "internal"
          }
        },
        aggs : {
          filtered : {
            terms : {
              field : "referrer_name"
            }
          }
        }
      }
    }
  }
}

function calculateInterval(query) {
  let from = moment(query.dateFrom);
  let to = moment(query.dateTo);
  let span = moment.duration(to - from);

  if (span <= moment.duration(1, 'day')) {
    return 'hour';
  } else if (span <= moment.duration(1, 'week')) {
    return 'day';
  } else if (span <= moment.duration(6, 'month')) {
    return 'day';
  } else {
    return 'week';
  }
}
