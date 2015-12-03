import * as QueryUtils from '../utils/queryUtils'

export default function sectionQuery(query){
  QueryUtils.checkString(query,'dateFrom');
  QueryUtils.checkString(query,'dateTo');
  QueryUtils.checkString(query,'section');

  let matchCategory = {
    match : {  sections: query.section  }
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

  if (query.comparator === 'FT'){
    filtered.query.bool.must = [matchDates];
  }

  return {
    "filtered" : filtered
  };
}
