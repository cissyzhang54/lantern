import moment from 'moment';
import * as QueryUtils from '../utils/queryUtils'

export default function ArticleComparatorQuery(query){
  QueryUtils.checkString(query,'uuid');
  QueryUtils.checkString(query,'dateFrom');
  QueryUtils.checkString(query,'dateTo');
  QueryUtils.checkString(query,'comparator');
  QueryUtils.checkString(query,'comparatorType');
  QueryUtils.checkString(query,'publishDate');

  let msFrom = moment(query.dateFrom).diff(moment(query.publishDate));
  let msTo = moment(query.dateTo).diff(moment(query.publishDate));
  let fromDuration = moment.duration(msFrom).asMinutes();
  let toDuration = moment.duration(msTo).asMinutes();

  let comparatorTypes = {
    genre : {  genre: query.comparator  },
    section : {  sections: query.comparator  },
    topic : {  topics: query.comparator  },
    author : {  authors: query.comparator  }
  }

  var filters = [
    { "range" : { "initial_publish_date" : { from: moment(query.publishDate).subtract(30,'days'), to: query.publishDate }}},
    { "range" : { "time_since_publish" : { from: Math.round(fromDuration), to: Math.round(toDuration) }}},
    { "not": { "term": { "article_uuid": query.uuid}}}
  ].concat(QueryUtils.mapFilters(query));

  if (query.comparator !== 'FT') {
    filters.push({ "term": comparatorTypes[query.comparatorType] });
  }

  return {
    filtered : {
      filter : filters
    }
  }
}
