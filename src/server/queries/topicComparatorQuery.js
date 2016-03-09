import * as QueryUtils from '../utils/queryUtils'
import moment from 'moment';

export default function topicComparatorQuery(query){
  QueryUtils.checkString(query,'topic');
  QueryUtils.checkString(query,'dateFrom');
  QueryUtils.checkString(query,'dateTo');
  QueryUtils.checkString(query,'comparator');
  QueryUtils.checkString(query,'comparatorType');

  let dateFrom = moment(query.dateFrom);
  let dateTo = moment(query.dateTo);

  if (query.comparatorType !== 'global') {
    let span = dateTo - dateFrom;

    dateFrom = dateFrom.clone().subtract(span, 'milliseconds');
    dateTo = dateTo.clone().subtract(span, 'milliseconds');
  }

  dateFrom = dateFrom.format('YYYY-MM-DD');
  dateTo = dateTo.format('YYYY-MM-DD');


  let matchTopic = {
    match : {  topics_not_analyzed : query.comparator  }
  }

  let filter = {
    bool: {
      should :  QueryUtils.mapFilters(query)
    }
  }

  let matchDates = {
    range : {
      view_timestamp : {
        from: dateFrom,
        to: dateTo
      }
    }
  }


  let must = [matchDates];

  if (query.comparatorType !== 'global') {
    must.push(matchTopic)
  }

  let matchAll = {
    bool: {
      must: must
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
