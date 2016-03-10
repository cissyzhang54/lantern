import {expect} from 'chai';
import moment from 'moment';
import TopArticleQuery from '../../src/server/queries/topArticleQuery.js'

describe('Top Articles Query', () => {
  describe('errors when trying to build an section query', () => {

    it('without a dateFrom', (done) => {
      try{
        TopArticleQuery({})
      } catch(error) {
        expect(error.name).to.equal(`AssertionError`);
        expect(error.message).to.equal(`argument 'query' must contain a 'dateFrom' string property`);
        done();
      }
    });

    it('without a dateTo', (done) => {
      try{
        TopArticleQuery({dateFrom:'11-mar-2015'})
      } catch(error) {
        expect(error.name).to.equal(`AssertionError`);
        expect(error.message).to.equal(`argument 'query' must contain a 'dateTo' string property`);
        done();
      }
    });

  });

  describe('builds an section query', () => {

    it('with the mandatory fields', () => {
      let comparatorQuery = TopArticleQuery({
        dateFrom:'2015-09-16T19:58:26.000Z', dateTo:'2015-10-16T19:58:26.000Z',
      })
      expect(comparatorQuery).to.deep.equal({
        filtered : {
          query : {
            match_all : {  }
          },
          filter : {
            bool: {
              must_not: [
                {
                  range: {
                    initial_publish_date: {
                      gt: moment().startOf('day').toISOString(),
                      lt: moment().endOf('day').toISOString()
                    }
                  }
                }
              ],
              must: [
                {
                  range: {
                    event_timestamp: {
                      gt: moment().subtract(1, 'day').startOf('day').toISOString(),
                      lt: moment().subtract(1, 'day').endOf('day').toISOString()
                    }
                  }
                },
                {
                  term: {
                    page_type: "article"
                  }
                }
              ]
            }
          }
        }
      })
    });
  })
})
