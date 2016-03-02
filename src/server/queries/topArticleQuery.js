import * as QueryUtils from '../utils/queryUtils'
import moment from 'moment'

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
          must_not: [
            {
              range: {
                initial_publish_date: {
                  gt: moment().startOf('day').toISOString(),
                  lt: moment().endOf('day').toISOString()
                }
              }
            }
          ],
          must: [
            {
              range: {
                event_timestamp: {
                  gt: 'now-1d/d',
                  lt: 'now/d'
                }
              }
            },
            {
              term: {
                page_type: 'article'
              }
            }
          ]
        }
      }
    }
  }
}
