import * as QueryUtils from '../utils/queryUtils'

export default function sectionQuery(query){
  QueryUtils.checkString(query,'dateFrom');
  QueryUtils.checkString(query,'dateTo');
  QueryUtils.checkString(query,'section');

  let matchCategory = {
    match : {  sections_not_analyzed: query.section  }
  }

  let filter = {
    bool: {
      must : QueryUtils.mapFilters(query)
    }
  }

  let matchDates = {
    range : {
      view_timestamp : {
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
