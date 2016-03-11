import * as QueryUtils from '../utils/queryUtils'
import moment from 'moment'

export default function sectionComparatorQuery(query){
  //This is always compared against the whole of the FT
  QueryUtils.checkString(query,'section');
  QueryUtils.checkString(query,'dateFrom');
  QueryUtils.checkString(query,'dateTo');
  QueryUtils.checkString(query,'comparator');
  QueryUtils.checkString(query,'comparatorType');

  let dateFrom = moment(query.dateFrom);
  let dateTo = moment(query.dateTo);

  if (query.comparatorType !== 'global') {
      let span = dateTo - dateFrom;

      dateFrom = dateFrom.clone().subtract(span, 'milliseconds'),
      dateTo = dateTo.clone().subtract(span, 'milliseconds')
  }

  dateFrom = dateFrom.format('YYYY-MM-DD');
  dateTo = dateTo.format('YYYY-MM-DD');

  let matchSection = {
    match : {  sections_not_analyzed: query.comparator  }
  }

  let filter = {
    bool: {
      must :  QueryUtils.mapFilters(query)
    }
  }

  let matchDates = {
    "range" : {
      "initial_publish_date" : {
        from: dateFrom,
        to: dateTo
      }
    }
  }

  let matchAll = {
    bool: {
      must: [matchDates, matchSection]
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
