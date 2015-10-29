import {expect} from 'chai';
import moment from 'moment';
import * as build from '../../src/server/utils/queryBuilder';

describe('#queryBuilder', () => {

  describe('errors when trying to build and article query', () => {

    it('without a uuid', (done) => {
      try{
        build.articleQuery({})
      } catch(error) {
        expect(error.name).to.equal(`AssertionError`);
        expect(error.message).to.equal(`argument 'query' must contain a 'uuid' string property`);
        done();
      }
    });

    it('without a dateFrom', (done) => {
      try{
        build.articleQuery({uuid:'uuid'})
      } catch(error) {
        expect(error.name).to.equal(`AssertionError`);
        expect(error.message).to.equal(`argument 'query' must contain a 'dateFrom' string property`);
        done();
      }
    });

    it('without a dateTo', (done) => {
      try{
        build.articleQuery({uuid:'uuid', dateFrom:'11-mar-2015'})
      } catch(error) {
        expect(error.name).to.equal(`AssertionError`);
        expect(error.message).to.equal(`argument 'query' must contain a 'dateTo' string property`);
        done();
      }
    });

  });

  describe('errors when trying to build and comparator query', () => {


    it('without a uuid', (done) => {
      try{
        build.comparatorQuery({})
      } catch(error) {
        expect(error.name).to.equal(`AssertionError`);
        expect(error.message).to.equal(`argument 'query' must contain a 'uuid' string property`);
        done();
      }
    });

    it('without a dateFrom', (done) => {
      try{
        build.comparatorQuery({uuid:'uuid'})
      } catch(error) {
        expect(error.name).to.equal(`AssertionError`);
        expect(error.message).to.equal(`argument 'query' must contain a 'dateFrom' string property`);
        done();
      }
    });

    it('without a dateTo', (done) => {
      try{
        build.comparatorQuery({uuid:'uuid', dateFrom:'11-mar-2015'})
      } catch(error) {
        expect(error.name).to.equal(`AssertionError`);
        expect(error.message).to.equal(`argument 'query' must contain a 'dateTo' string property`);
        done();
      }
    });

    it('without a comparator', (done) => {
      try{
        build.comparatorQuery({uuid:'uuid', dateFrom:'11-mar-2015', dateTo:'11-mar-2015'})
      } catch(error) {
        expect(error.name).to.equal(`AssertionError`);
        expect(error.message).to.equal(`argument 'query' must contain a 'comparator' string property`);
        done();
      }
    });

    it('without a comparatorType', (done) => {
      try{
        build.comparatorQuery({
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
        build.comparatorQuery({
          uuid:'uuid', dateFrom:'11-mar-2015', dateTo:'11-mar-2015', comparator:'comparator', comparatorType:'type'
        })
      } catch(error) {
        expect(error.name).to.equal(`AssertionError`);
        expect(error.message).to.equal(`argument 'query' must contain a 'publishDate' string property`);
        done();
      }
    });
  });

  describe('builds and article query', () => {

    it('with the mandatory fields', () => {
      let query = build.articleQuery({uuid:'1234', dateFrom:'11-mar-2014', dateTo:'12-mar-2015'})
      expect(query).to.deep.equal({
        filtered: {
          filter:{
            bool:{
              must:[
                {
                  range:{
                    view_timestamp:{
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
      let query = build.articleQuery({
        uuid:'1234', dateFrom:'11-mar-2014', dateTo:'12-mar-2015', filters:{oa:[12,'ab'], ob:[34,'bc']}
      })
      expect(query).to.deep.equal({
        filtered: {
          filter:{
            bool:{
              must:[
                {
                  range:{
                    view_timestamp:{
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


  describe('builds and comparator query', () => {

    it('with the mandatory fields', () => {
      let comparatorQuery = build.comparatorQuery({
          uuid:'uuid', dateFrom:'2015-09-16T19:58:26.000Z', dateTo:'2015-10-16T19:58:26.000Z',
          comparator:'comparator', comparatorType:'section',
          publishDate: '2015-09-16T19:58:26.000Z'
        })
      expect(comparatorQuery).to.deep.equal({
        filtered: {
          filter:{
            bool:{
              must:[
                {
                  range:{
                    time_since_publish:{
                      from:0,
                      to:43200
                    }
                  }
                }
              ],
              should:[]
            }
          },
          query:{
            bool: {
              must:[
                {
                  range:{
                    initial_publish_date: {
                      "from": moment('2015-09-16T19:58:26.000Z').subtract(30,'days'),
                      to : '2015-09-16T19:58:26.000Z'
                    }
                  }
                },
                {
                  match: {
                    sections: 'comparator'
                  }
                }
              ],
              must_not: {
                match:{
                  article_uuid: 'uuid'
                }
              }
            }
          }
        }
      })
    });

    it('with filters', () => {
      let comparatorQuery = build.comparatorQuery({
        uuid:'uuid', dateFrom:'2015-09-16T19:58:26.000Z', dateTo:'2015-10-16T19:58:26.000Z',
        comparator:'comparator', comparatorType:'section',
        publishDate: '2015-09-16T19:58:26.000Z',
        filters:{cq1:['zx',12], cq2:['spectrum',45]}
      })

      expect(comparatorQuery).to.deep.equal({
        filtered: {
          filter:{
            bool:{
              must:[
                {
                  range:{
                    time_since_publish:{
                      from:0,
                      to:43200
                    }
                  }
                }
              ],
              should:[
                {
                  term:{cq1:'zx'}
                },
                {
                  term:{cq1:12}
                },
                {
                  term:{cq2:'spectrum'}
                },
                {
                  term:{cq2:45}
                },
              ]
            }
          },
          query:{
            bool: {
              must:[
                {
                  range:{
                    initial_publish_date: {
                      "from": moment('2015-09-16T19:58:26.000Z').subtract(30,'days'),
                      to : '2015-09-16T19:58:26.000Z'
                    }
                  }
                },
                {
                  match: {
                    sections: 'comparator'
                  }
                }
              ],
              must_not: {
                match:{
                  article_uuid: 'uuid'
                }
              }
            }
          }
        }
      })
    })
  })

});
