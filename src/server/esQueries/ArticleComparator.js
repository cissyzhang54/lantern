import assert from 'assert';
import moment from 'moment';
import ArticleComparatorAggregation from '../aggregations/ArticleComparator';
import ArticleEventsComparatorAggregation from '../aggregations/ArticleEventsComparator';
import ArticleComparatorQuery from '../queries/articleComparatorQuery';
import assign from 'object-assign';

export default function ArticleComparatorESQuery(query) {
  assert.equal(typeof query, 'object',
    "argument 'query' should be an object");

  let comparatorQuery = ArticleComparatorQuery(query)
  // let must = comparatorQuery.filtered.query.bool.must;
  //
  // if (must.length <= 1) {
  //   delete comparatorQuery.filtered.query.bool.must;
  // } else {
  //   comparatorQuery.filtered.query.bool.must.splice(0,1);
  // }

  console.log('article', JSON.stringify(comparatorQuery));

  let esQuery = {
    "query" : comparatorQuery,
    "size": 1,
    "aggs" : assign({}, ArticleComparatorAggregation(query), ArticleEventsComparatorAggregation(query))
  }
  return esQuery
}
