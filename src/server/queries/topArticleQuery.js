import * as QueryUtils from '../utils/queryUtils'

export default function TopArticleQuery(query){

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
                view_timestamp: {
                  "from": query.dateFrom,
                  "to": query.dateTo
                }
              }
            }
          ]
        }
      }
    }
  }
}
