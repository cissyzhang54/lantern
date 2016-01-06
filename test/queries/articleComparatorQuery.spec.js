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



  describe('builds and comparator query', () => {

    it('with the mandatory fields', () => {
      let comparatorQuery = ArticleComparatorQuery({
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
      let comparatorQuery = ArticleComparatorQuery({
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

    it('with filters', () => {
      let comparatorQuery = ArticleComparatorQuery({
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
})
