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

  assert.equal(typeof query.comparatorType, 'string',
    "argument 'query' must contain a 'comparatorType' string property");

  let comparatorTypes = {
    genre : {  genre: query.comparator  },
    section : {  sections: query.comparator  },
    topic : {  topics: query.comparator  },
    author : {  authors: query.comparator  }
  }
  let match = {
      "match" : comparatorTypes[query.comparatorType]
  }
  let filter = {
    "and" : [
      {
        range : {
          event_date : {
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
      social_shares : {
        filter: {
          term: {
            "event_type" : "social share"
          }
        },
        aggs: {
          filtered: {
            terms: {
              field: "event_category"
            }
          }
        }
      },
      page_clicks : {
        filter: {
          term: {
            "event_type" : "links clicked"
          }
        },
        aggs: {
          total_links_clicked : {
            sum: {
              "field" : "event_value"
            }
          }
        }
      },
      page_comments : {
        filter: {
          term: {
            "event_type": "comment",
            "event_category": "posted"
          }
        },
        aggs: {
          total: {
            sum: {
              "field": "event_value"
            }
          }
        }
      },
      "scroll_depth" : {
        "filter": {
          "term": {
            "event_type" : "scroll"
          }
        },
        "aggs": {
          "average_scroll" : {
            "avg":{
              "field": "event_value"
            }
          }
        }
      }
    }
  }
}
