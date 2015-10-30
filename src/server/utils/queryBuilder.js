import assert from 'assert';
import moment from 'moment';

export function articleQuery(query){

  assert.equal(typeof query.uuid, 'string',
    "argument 'query' must contain a 'uuid' string property");

  assert.equal(typeof query.dateFrom, 'string',
    "argument 'query' must contain a 'dateFrom' string property");

  assert.equal(typeof query.dateTo, 'string',
    "argument 'query' must contain a 'dateTo' string property");

  let match =  {  article_uuid: query.uuid  }
  let filter = {
    bool: {
      must : [
        {
          range : {
            view_timestamp : {
              from: query.dateFrom,
              to: query.dateTo
            }
          }
        }
      ],
      should : []
    }
  }

  for (var o in query.filters){
    if (query.filters[o]){
      query.filters[o].map((i) => {
        filter.bool.should.push({
          "term" : { [o]: i }
        })
      })
    }
  }

  return {
    filtered : {
      query : {
        match : match
      },
      filter : filter
    }
  }
}

export function comparatorQuery(query){;

  assert.equal(typeof query.uuid, 'string',
    "argument 'query' must contain a 'uuid' string property");

  assert.equal(typeof query.dateFrom, 'string',
    "argument 'query' must contain a 'dateFrom' string property");

  assert.equal(typeof query.dateTo, 'string',
    "argument 'query' must contain a 'dateTo' string property");

  assert.equal(typeof query.comparator, 'string',
    "argument 'query' must contain a 'comparator' string property");

  assert.equal(typeof query.comparatorType, 'string',
    "argument 'query' must contain a 'comparatorType' string property");

  assert.equal(typeof query.publishDate, 'string',
    "argument 'query' must contain a 'publishDate' string property")

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
      should : []
    }
  }

  for (var o in query.filters){
    if (query.filters[o]){
      query.filters[o].map((i) => {
        filter.bool.should.push({
          term : { [o]: i }
        })
      })
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
    delete filtered.query
  }

  return {
    "filtered" : filtered
  };
}

export function overviewQuery(query){;

  assert.equal(typeof query.dateFrom, 'string',
    "argument 'query' must contain a 'dateFrom' string property");

  assert.equal(typeof query.dateTo, 'string',
    "argument 'query' must contain a 'dateTo' string property");

  assert.equal(typeof query.overviewName, 'string',
    "argument 'query' must contain a 'overviewName' string property");

  assert.equal(typeof query.category, 'string',
    "argument 'query' must contain a 'category' string property");

  let categories = {
    genre : {  genre: query.overviewName  },
    section : {  sections: query.overviewName  },
    topic : {  topics: query.overviewName  },
    author : {  authors: query.overviewName  }
  }

  let matchCategory = {
    match : categories[query.category]
  }

  let filter = {
    bool: {
      should : []
    }
  }

  for (var o in query.filters){
    if (query.filters[o]){
      query.filters[o].map((i) => {
        filter.bool.should.push({
          term : { [o]: i }
        })
      })
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
      must: [matchDates, matchCategory ]
    }
  }

  let filtered = {
    query : matchAll,
    filter : filter
  }

  if (query.comparator === 'FT'){
    delete filtered.query
  }

  return {
    "filtered" : filtered
  };
}
