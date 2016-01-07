import {expect} from 'chai';
import moment from 'moment';
import EventQuery from '../../src/server/queries/eventQuery'

describe('Event Query', () => {
  describe('errors when trying to build an event query', () => {

    it('without a uuid', (done) => {
      try{
        EventQuery({})
      } catch(error) {
        expect(error.name).to.equal(`AssertionError`);
        expect(error.message).to.equal(`argument 'query' must contain a 'uuid' string property`);
        done();
      }
    });

    it('without a dateFrom', (done) => {
      try{
        EventQuery({uuid:'uuid'})
      } catch(error) {
        expect(error.name).to.equal(`AssertionError`);
        expect(error.message).to.equal(`argument 'query' must contain a 'dateFrom' string property`);
        done();
      }
    });

    it('without a dateTo', (done) => {
      try{
        EventQuery({uuid:'uuid', dateFrom:'11-mar-2015'})
      } catch(error) {
        expect(error.name).to.equal(`AssertionError`);
        expect(error.message).to.equal(`argument 'query' must contain a 'dateTo' string property`);
        done();
      }
    });

  });

  describe('builds an events query', () => {

    it('with the mandatory fields', () => {
      let query = EventQuery({uuid:'1234', dateFrom:'11-mar-2014', dateTo:'12-mar-2015'})
      expect(query).to.deep.equal({
        filtered: {
          filter:{
            bool:{
              must:[
                {
                  range:{
                    event_date:{
                      from:"11-mar-2014",
                      to:"12-mar-2015"
                    }
                  }
                }
              ],
              should:[]
            }
          },
          query:{
            match:{
              article_uuid: '1234'
            }
          }
        }
      })
    });

    it('with filters', () => {
      let query = EventQuery({
        uuid:'1234', dateFrom:'11-mar-2014', dateTo:'12-mar-2015', filters:{oa:[12,'ab'], ob:[34,'bc']}
      })
      expect(query).to.deep.equal({
        filtered: {
          filter:{
            bool:{
              must:[
                {
                  range:{
                    event_date:{
                      from:"11-mar-2014",
                      to:"12-mar-2015"
                    }
                  }
                }
              ],
              should:[
                {
                  term:{oa:12}
                },
                {
                  term:{oa:'ab'}
                },
                {
                  term:{ob:34}
                },
                {
                  term:{ob:'bc'}
                },
              ]
            }
          },
          query:{
            match:{
              article_uuid: '1234'
            }
          }
        }
      })
    })
  })
})
