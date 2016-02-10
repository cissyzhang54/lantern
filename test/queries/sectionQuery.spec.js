import {expect} from 'chai';
import moment from 'moment';
import SectionQuery from '../../src/server/queries/sectionQuery.js'

describe('Section Query', () => {
  describe('errors when trying to build an section query', () => {

    it('without a dateFrom', (done) => {
      try{
        SectionQuery({})
      } catch(error) {
        expect(error.name).to.equal(`AssertionError`);
        expect(error.message).to.equal(`argument 'query' must contain a 'dateFrom' string property`);
        done();
      }
    });

    it('without a dateTo', (done) => {
      try{
        SectionQuery({dateFrom:'11-mar-2015'})
      } catch(error) {
        expect(error.name).to.equal(`AssertionError`);
        expect(error.message).to.equal(`argument 'query' must contain a 'dateTo' string property`);
        done();
      }
    });

    it('without a section', (done) => {
      try{
        SectionQuery({ dateFrom:'11-mar-2015', dateTo:'11-mar-2015'})
      } catch(error) {
        expect(error.name).to.equal(`AssertionError`);
        expect(error.message).to.equal(`argument 'query' must contain a 'section' string property`);
        done();
      }
    });

  });

  describe('builds an section query', () => {

    it('with the mandatory fields', () => {
      let comparatorQuery = SectionQuery({
        dateFrom:'2015-09-16T19:58:26.000Z', dateTo:'2015-10-16T19:58:26.000Z',
        section:'sectionName',
        publishDate: '2015-09-16T19:58:26.000Z'
      })
      expect(comparatorQuery).to.deep.equal({
        filtered: {
          filter:{
            bool:{
              should:[]
            }
          },
          query:{
            bool: {
              must:[
                {
                  range:{
                    initial_publish_date: {
                      "from": '2015-09-16T19:58:26.000Z',
                      to : '2015-10-16T19:58:26.000Z'
                    }
                  }
                },
                {
                  match: {
                    primary_section: 'sectionName'
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
