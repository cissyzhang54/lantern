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

  let matchComparatorType = {
    match : comparatorTypes[query.comparatorType]
  }

  let filter = {
    bool: {
      must : [
        {
          range : {
            time_since_publish : {
              from: fromDuration,
              to: toDuration
            }
          }
        }
      ],
      should :  QueryUtils.mapFilters(query)
    }
  }

  let matchPublishDate = {
    "range" : {
      "initial_publish_date" : {
        from: moment(query.publishDate).subtract(30,'days'),
        to: query.publishDate
      }
    }
  }

  let matchAll = {
    bool: {
      must: [matchPublishDate, matchComparatorType ],
      "must_not": {
        "match": {
          "article_uuid": query.uuid
        }
      }
    }
  }

  let filtered = {
    query : matchAll,
    filter : filter
  }

  if (query.comparator === 'FT'){
    filtered.query.bool.must = [matchPublishDate];
  }

  return {
    "filtered" : filtered
  };
}
