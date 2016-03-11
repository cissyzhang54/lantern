import moment from 'moment';
import * as QueryUtils from '../utils/queryUtils';
import calculateIndices from '../utils/calculateIndices.js';
import ArticleComparatorAggregation from '../aggregations/ArticleComparator';
import _ from 'underscore';

export function _getDateRangeFromQuery(query) {
  return {
    from: moment(query.publishDate).subtract(30,'days'),
    to: query.publishDate
  }
}

export function ArticleComparatorQueryHeader(query) {
  const dateRange = _getDateRangeFromQuery(query);

  return {
    index: calculateIndices({
      dateFrom: dateRange.from,
      dateTo: dateRange.to
    }, process.env.ES_INDEX_ROOT),
    ignore_unavailable: true,
    search_type: 'count'
  }
}

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
    section : {  sections_not_analyzed: query.comparator  },
    topic : {  topics_not_analyzed: query.comparator  },
    author : {  authors: query.comparator  }
  }

  let matchComparatorType = {
    match : comparatorTypes[query.comparatorType]
  }

  let dateRange = [
    {
      range : {
        time_since_publish : {
          from: fromDuration,
          to: toDuration
        }
      }
    }
  ]

  let filtersAndRange = _.union(dateRange, QueryUtils.mapFilters(query));

  let filters = {
    bool : {
      must : filtersAndRange
    }
  }

  let matchPublishDate = {
    "range" : {
      "initial_publish_date" : _getDateRangeFromQuery(query)
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
    filter : filters
  }

  if (query.comparator === 'FT'){
    filtered.query.bool.must = [matchPublishDate];
  }

  return {
    "query" : {
      "filtered" : filtered
    },
    "size": 1,
    "aggs" : ArticleComparatorAggregation(query)
  }

}
