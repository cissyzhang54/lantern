import * as QueryUtils from '../utils/queryUtils'

export default function topicMetadataQuery(query){
  QueryUtils.checkString(query,'dateFrom');
  QueryUtils.checkString(query,'dateTo');
  QueryUtils.checkString(query,'topic');

  let matchCategory = {
    match : {  topics_not_analyzed: query.topic  }
  }

  let filter = {
    bool: {
      should : QueryUtils.mapFilters(query)
    }
  }

  let matchDates = {
    range : {
      initial_publish_date : {
        from: query.dateFrom,
        to: query.dateTo
      }
    }
  }

  let matchAll = {
    bool: {
      must: [matchDates, matchCategory ]
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
