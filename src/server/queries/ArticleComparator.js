import assert from 'assert';

export default function ComparatorPageViewsQuery(query) {

  assert.equal(typeof query, 'object',
    "argument 'query' should be an object");

  assert.equal(typeof query.dateFrom, 'string',
    "argument 'query' must contain a 'dateFrom' date string property");

  assert.equal(typeof query.dateTo, 'string',
    "argument 'query' must contain a 'dateTo' date property");

  return {
    "query" : {
      "filtered" : {
        "query" : {
          "match" : {
            "sections" : query.comparator
          }
        },
        "filter" : {
          "range": {
            "view_timestamp" : {
              "from" : query.dateFrom,
              "to" : query.dateTo
            }
          }
        }
      }
    },
    "size": 1,
    "aggs" : {
      "page_views_over_time" : {
        "date_histogram" : {
          "field" : "view_timestamp",
          "interval" : "day"
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
      }
    }
  }
}







