import assert from 'assert';
import moment from 'moment';
import ArticlesAggregation from '../aggregations/Articles'
import ArticleQuery from '../queries/articleQuery.js'

export default function ArticlesESQuery(query) {

  assert.equal(typeof query, 'object',
    "argument 'query' should be an object");

  let articleQuery = ArticleQuery(query)

  return {
    query : articleQuery,
    size: 1,
    aggs: ArticlesAggregation(query)
  };
}
