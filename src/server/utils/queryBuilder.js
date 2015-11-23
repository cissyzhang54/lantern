import assert from 'assert';
import moment from 'moment';

function checkString(query, prop){
  assert.equal(typeof query[prop], 'string',
    `argument 'query' must contain a '${prop}' string property`);
}

function mapFilters(query){
  let filter = []
  for (var o in query.filters) {
    if (query.filters[o]) {
      query.filters[o].map((i) => {
        filter.push({
          "term": {[o]: i}
        })
      })
    }
  }
  return filter;
}

export function articleQuery(query){
  checkString(query,'uuid');
  checkString(query,'dateFrom');
  checkString(query,'dateTo');

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
                view_timestamp: {
                  from: query.dateFrom,
                  to: query.dateTo
                }
              }
            }
          ],
          should: mapFilters(query)
        }
      }
    }
  }
}

export function eventQuery(query){
  checkString(query,'uuid');
  checkString(query,'dateFrom');
  checkString(query,'dateTo');

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
                event_date: {
                  from: query.dateFrom,
                  to: query.dateTo
                }
              }
            }
          ],
          should:  mapFilters(query)
        }
      }
    }
  }
}

export function articleComparatorQuery(query){
  checkString(query,'uuid');
  checkString(query,'dateFrom');
  checkString(query,'dateTo');
  checkString(query,'comparator');
  checkString(query,'comparatorType');
  checkString(query,'publishDate');

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
      should :  mapFilters(query)
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
export function sectionComparatorQuery(query){
  //This is always compared against the whole of the FT
  checkString(query,'section');
  checkString(query,'dateFrom');
  checkString(query,'dateTo');
  checkString(query,'comparator');
  checkString(query,'comparatorType');

  let matchSection = {
    match : {  sections: query.comparator  }
  }

  let filter = {
    bool: {
      should :  mapFilters(query)
    }
  }

  let matchDates = {
    "range" : {
      "initial_publish_date" : {
        from: query.dateFrom,
        to: query.dateTo
      }
    }
  }

  let matchAll = {
    bool: {
      must: [matchDates, matchSection],
    }
  }

  let filtered = {
    query : matchAll,
    filter : filter
  }

  return {
    "filtered" : filtered
  };
}

export function sectionQuery(query){
  checkString(query,'dateFrom');
  checkString(query,'dateTo');
  checkString(query,'section');

  let matchCategory = {
    match : {  sections: query.section  }
  }

  let filter = {
    bool: {
      should : mapFilters(query)
    }
  }

  let matchDates = {
    range : {
      initial_publish_date : {
        from: query.dateFrom,
        to: query.dateTo
      }
    }
  }

  let matchAll = {
    bool: {
      must: [matchDates, matchCategory ]
    }
  }

  let filtered = {
    query : matchAll,
    filter : filter
  }

  if (query.comparator === 'FT'){
   filtered.query.bool.must = [matchDates];
  }

  return {
    "filtered" : filtered
  };
}

export function topicQuery(query){
  checkString(query,'dateFrom');
  checkString(query,'dateTo');
  checkString(query,'topic');

  let matchTopic = {
    match : {  topics: query.topic  }
  }

  let filter = {
    bool: {
      should : mapFilters(query)
    }
  }

  let matchDates = {
    "range" : {
      "initial_publish_date" : {
        from: query.dateFrom,
        to: query.dateTo
      }
    }
  }

  let matchAll = {
    bool: {
      must: [matchDates, matchTopic ]
    }
  }

  let filtered = {
    query : matchAll,
    filter : filter
  }

  return {
    "filtered" : filtered
  };
}

export function topicComparatorQuery(query){
  checkString(query,'topic');
  checkString(query,'dateFrom');
  checkString(query,'dateTo');
  checkString(query,'comparator');
  checkString(query,'comparatorType');

  let matchTopic = {
    match : {  topics: query.comparator  }
  }

  let filter = {
    bool: {
      should :  mapFilters(query)
    }
  }

  let matchDates = {
    "range" : {
      "initial_publish_date" : {
        from: query.dateFrom,
        to: query.dateTo
      }
    }
  }

  let matchAll = {
    bool: {
      must: [matchDates, matchTopic],
    }
  }

  let filtered = {
    query : matchAll,
    filter : filter
  }

  return {
    "filtered" : filtered
  };
}
