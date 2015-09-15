import assert from 'assert';

export default function PageViewsQuery(query) {

  assert.equal(typeof query, 'object',
    "argument 'query' should be an object");

  assert.equal(typeof query.uuid, 'string',
    "argument 'query' must contain a 'uuid' string property");

  assert.equal(typeof query.dateFrom, 'string',
    "argument 'query' must contain a 'dateFrom' date string property");

  assert.equal(typeof query.dateTo, 'string',
    "argument 'query' must contain a 'dateTo' date property");

  return {
    query : {
      filtered : {
        query : {
          match : {
            article_uuid: query.uuid
          }
        },
        filter : {
          range : {
            view_timestamp : {
              from: query.dateFrom,
              to: query.dateTo
            }
          }
        }
      }
    },
    size: 1,
    aggs : {
      page_views_over_time : {
        date_histogram : {
          field : "view_timestamp",
          interval : "hour"
        }
      }
    }
  };
}
