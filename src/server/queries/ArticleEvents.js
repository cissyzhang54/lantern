import assert from 'assert';
import moment from 'moment';

export default function PageEventsQuery(query) {

  assert.equal(typeof query, 'object',
    "argument 'query' should be an object");

  assert.equal(typeof query.uuid, 'string',
    "argument 'query' must contain a 'uuid' string property");

  assert.equal(typeof query.dateFrom, 'string',
    "argument 'query' must contain a 'dateFrom' date string property");

  assert.equal(typeof query.dateTo, 'string',
    "argument 'query' must contain a 'dateTo' date property");

  let match =  {  article_uuid: query.uuid  }
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

  return {
    query : {
      filtered : {
        query : {
          match : match
        },
        filter : filter
      }
    },
    "size": 1,
    "aggs" : {
      social_shares: {
        terms: {
          field: "social_share",
          min_doc_count: 0
        }
      }
    }
  };
}
