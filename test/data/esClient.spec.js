import { expect } from 'chai';
import * as esClient from '../../src/server/esClient';


describe('Elasticsearch Client', () => {
  it('should be a function', () => {
    expect(esClient).to.be.a.object;
    expect(esClient.getIndicies).to.be.a.function;
    expect(esClient.runArticleQuery).to.be.a.function;
    expect(esClient.runComparatorQuery).to.be.a.function;
    expect(esClient.runSearchQuery).to.be.a.function;
  });

  it('should return a rejected promise if given query to runArticleQuery', (done) => {
    esClient.runArticleQuery()
      .catch((error) => {
        expect(error.name).to.equal('MalformedQueryArgumentsError');
        done();
      })
  });
  it('should return a rejected promise if given query to runComparatorQuery', (done) => {
    esClient.runComparatorQuery()
      .catch((error) => {
        expect(error.name).to.equal('MalformedQueryArgumentsError');
        done();
      })
  });
  it('should return a rejected promise if given query to runSearchQuery', (done) => {
    esClient.runSearchQuery()
      .catch((error) => {
        expect(error.name).to.equal('MalformedQueryArgumentsError');
        done();
      })
  });


  it('should always return a promise', () => {
    let p = esClient.runArticleQuery({});
    expect(p.then).to.be.a.function;
    let q = esClient.runSearchQuery({});
    expect(q.then).to.be.a.function;
    let r = esClient.runComparatorQuery({});
    expect(q.then).to.be.a.function;
  });

});
