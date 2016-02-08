import * as QueryUtils from '../utils/queryUtils'

export default function ArticleQuery(query){
  QueryUtils.checkString(query,'uuid');
  QueryUtils.checkString(query,'dateFrom');
  QueryUtils.checkString(query,'dateTo');

  var filters = [
    { range: {
      view_timestamp: {
        from: query.dateFrom,
        to: query.dateTo
      }
    }},
    { term: { article_uuid: query.uuid } }
  ].concat(QueryUtils.mapFilters(query));

  return {
    filtered : {
      filter : filters
    }
  }
}
