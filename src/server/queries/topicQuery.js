import * as QueryUtils from '../utils/queryUtils'

export default function topicQuery(query){
  QueryUtils.checkString(query,'dateFrom');
  QueryUtils.checkString(query,'dateTo');
  QueryUtils.checkString(query,'topic');

  let matchTopic = {
    match : {  topics: query.topic  }
  }

  let filter = {
    bool: {
      should : QueryUtils.mapFilters(query)
    }
  }

  let matchDates = {
    "range" : {
      "initial_publish_date" : {
        from: query.dateFrom,
        to: query.dateTo
      }
    }
  }

  let matchAll = {
    bool: {
      must: [matchDates, matchTopic ]
    }
  }

  let filtered = {
    query : matchAll,
    filter : filter
  }

  return {
    "filtered" : filtered
  };
}
