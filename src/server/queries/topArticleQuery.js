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
                initial_publish_date: {
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
