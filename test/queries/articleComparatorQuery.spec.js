import {expect} from 'chai';
import moment from 'moment';
import ArticleComparatorQuery from '../../src/server/queries/articleComparatorQuery'

describe('Article Comparator Query', () => {
  describe('errors when trying to build a comparator query', () => {

    it('without a uuid', (done) => {
      try{
        ArticleComparatorQuery({})
      } catch(error) {
        expect(error.name).to.equal(`AssertionError`);
        expect(error.message).to.equal(`argument 'query' must contain a 'uuid' string property`);
        done();
      }
    });

    it('without a dateFrom', (done) => {
      try{
        ArticleComparatorQuery({uuid:'uuid'})
      } catch(error) {
        expect(error.name).to.equal(`AssertionError`);
        expect(error.message).to.equal(`argument 'query' must contain a 'dateFrom' string property`);
        done();
      }
    });

    it('without a dateTo', (done) => {
      try{
        ArticleComparatorQuery({uuid:'uuid', dateFrom:'11-mar-2015'})
      } catch(error) {
        expect(error.name).to.equal(`AssertionError`);
        expect(error.message).to.equal(`argument 'query' must contain a 'dateTo' string property`);
        done();
      }
    });

    it('without a comparator', (done) => {
      try{
        ArticleComparatorQuery({uuid:'uuid', dateFrom:'11-mar-2015', dateTo:'11-mar-2015'})
      } catch(error) {
        expect(error.name).to.equal(`AssertionError`);
        expect(error.message).to.equal(`argument 'query' must contain a 'comparator' string property`);
        done();
      }
    });

    it('without a comparatorType', (done) => {
      try{
        ArticleComparatorQuery({
          uuid:'uuid', dateFrom:'11-mar-2015', dateTo:'11-mar-2015', comparator:'comparator'
        })
      } catch(error) {
        expect(error.name).to.equal(`AssertionError`);
        expect(error.message).to.equal(`argument 'query' must contain a 'comparatorType' string property`);
        done();
      }
    });

    it('without a publishDate', (done) => {
      try{
        ArticleComparatorQuery({
          uuid:'uuid', dateFrom:'11-mar-2015', dateTo:'11-mar-2015', comparator:'comparator', comparatorType:'type'
        })
      } catch(error) {
        expect(error.name).to.equal(`AssertionError`);
        expect(error.message).to.equal(`argument 'query' must contain a 'publishDate' string property`);
        done();
      }
    });
  });



  describe('query object', () => {
    const sampleQuery = ArticleComparatorQuery({
      uuid:'uuid', dateFrom:'2015-09-16T19:58:26.000Z', dateTo:'2015-10-16T19:58:26.000Z',
      comparator:'comparator', comparatorType:'section',
      publishDate: '2015-09-16T19:58:26.000Z',
      filters:{cq1:['zx',12], cq2:['spectrum',45]}
    });

    const PATH_QUERY_FILTER = 'query.filtered.filter.bool';
    const PATH_QUERY_FILTER_MUST = PATH_QUERY_FILTER + '.must[0]';
    const PATH_QUERY_FILTER_SHOULD = PATH_QUERY_FILTER + '.should';
    const PATH_QUERY = 'query.filtered.query';

    it('filters by time_since_publish', () => {
      expect(sampleQuery).to.have.deep.property(
        PATH_QUERY_FILTER_MUST + '.range.time_since_publish'
      ).and.include({ to: 43200, from: 0 });
    });

    it('includes results from the previous [time_since_publish] days', () => {
      expect(sampleQuery).with.deep.property(PATH_QUERY + '.bool.must')
      .to.be.an('Array')
      .and.include({range:{
        initial_publish_date: {
          from: moment('2015-09-16T19:58:26.000Z').subtract(30,'days'),
          to : '2015-09-16T19:58:26.000Z'
        }
      }});
    });

    it('includes results from the correct section', () => {
      expect(sampleQuery).with.deep.property(PATH_QUERY + '.bool.must')
      .to.include({
        match: {
          sections_not_analyzed: 'comparator'
        }
      });
    });

    it('excludes results for the specified UUID', () => {
      expect(sampleQuery).with.deep.property(PATH_QUERY + '.bool.must_not')
      .to.deep.equal({
        match:{
          article_uuid: 'uuid'
        }
      });
    });

    it('adds term filters', () => {
      expect(sampleQuery).with.deep.property(PATH_QUERY_FILTER_SHOULD)
      .to.be.an('Array')
      .and.to.have.members([{
          term:{cq1:'zx'}
        },
        {
          term:{cq1:12}
        },
        {
          term:{cq2:'spectrum'}
        },
        {
          term:{cq2: 45}
        }]);
    })

  })
})
