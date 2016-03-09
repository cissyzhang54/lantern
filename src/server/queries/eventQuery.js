import * as QueryUtils from '../utils/queryUtils';
import _ from 'underscore';

export default function EventQuery(query){
  QueryUtils.checkString(query,'uuid');
  QueryUtils.checkString(query,'dateFrom');
  QueryUtils.checkString(query,'dateTo');

  let filters = [
    {
      range: {
        event_timestamp: {
          from: query.dateFrom,
          to: query.dateTo
        }
      }
    }
  ]

  filters = _.union(filters, QueryUtils.mapFilters(query))

  return {
    filtered : {
      query : {
        match : {  article_uuid: query.uuid  }
      },
      filter : {
        bool: {
          must: filters
        }
      }
    }
  }
}
