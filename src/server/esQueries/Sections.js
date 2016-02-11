import assert from 'assert';
import SectionAggregation from '../aggregations/Sections';
import SectionQuery from '../queries/sectionQuery';
import ArticleListQuery from './ArticleList';

export default function SectionESQuery(query) {

  assert.equal(typeof query, 'object',
    "argument 'query' should be an object");

  let sectionQuery = SectionQuery(query)

  let largerThanZeroPublish = {
    range : {
      time_since_publish : {
        gte: 0
      }
    }
  }
  // this clause ensures no articles with negative publish
  // date are returned
  sectionQuery.filtered.query.bool.must.push(largerThanZeroPublish);

  let esQuery = {
    query : sectionQuery,
    aggs: SectionAggregation(query)
  };

  let articleListQuery = ArticleListQuery(query);

  Object.assign(esQuery.aggs, articleListQuery.aggs);

  return esQuery
}
