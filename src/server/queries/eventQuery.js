import * as QueryUtils from '../utils/queryUtils'

export default function EventQuery(query){
  QueryUtils.checkString(query,'uuid');
  QueryUtils.checkString(query,'dateFrom');
  QueryUtils.checkString(query,'dateTo');

  return {
    filtered : {
      query : {
        match : {  article_uuid: query.uuid  }
      },
      filter : {
        bool: {
          must: [
            {
              range: {
                event_timestamp: {
                  from: query.dateFrom,
                  to: query.dateTo
                }
              }
            }
          ],
          should:  QueryUtils.mapFilters(query)
        }
      }
    }
  }
}
