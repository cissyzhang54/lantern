import * as QueryUtils from '../utils/queryUtils'

export default function TopArticleEventQuery(query){

  QueryUtils.checkString(query,'dateFrom');
  QueryUtils.checkString(query,'dateTo');

  return {
    filtered : {
      query : {
        match_all : {  }
      },
      filter : {
        bool: {
          must: [
            {
              range: {
                event_timestamp: {
                  gt: 'now-1d/d',
                  lt: 'now/d'
                }
              }
            }
          ]
        }
      }
    }
  }
}
