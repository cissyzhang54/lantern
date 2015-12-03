import * as QueryUtils from '../utils/queryUtils'

export default function sectionComparatorQuery(query){
  //This is always compared against the whole of the FT
  QueryUtils.checkString(query,'section');
  QueryUtils.checkString(query,'dateFrom');
  QueryUtils.checkString(query,'dateTo');
  QueryUtils.checkString(query,'comparator');
  QueryUtils.checkString(query,'comparatorType');

  let matchSection = {
    match : {  sections: query.comparator  }
  }

  let filter = {
    bool: {
      should :  QueryUtils.mapFilters(query)
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
      must: [matchDates, matchSection],
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
