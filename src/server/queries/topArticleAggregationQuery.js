import * as QueryUtils from '../utils/queryUtils'
import moment from 'moment'

export default function TopArticleAggregationQuery(query){

  QueryUtils.checkString(query,'dateFrom');
  QueryUtils.checkString(query,'dateTo');

  return {
    filtered : {
      query : {
        "bool": {
          "must": [ {
            "match" : {
              "page_type": "article"
            }
          } ]
        }
      }
    }
  }
}
