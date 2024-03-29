import * as QueryUtils from '../utils/queryUtils'

export default function sectionMetadataQuery(query){
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
