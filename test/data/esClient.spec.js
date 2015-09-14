import { expect } from 'chai';
import Client from '../../src/server/esClient';


describe('Elasticsearch Client', () => {
  it('should be a function', () => {
    expect(Client).to.be.a.function;
  });

  it('should return a rejected promise if given no category and query', (done) => {
    Client()
      .catch((error) => {
        expect(error.name).to.equal('MalformedQueryArgumentsError');
        done();
      })
  });

  it('should return a rejected promise if passed an unsupported category', (done) => {
    Client('boo', {})
      .catch((error) => {
        expect(error.name).to.equal('CategoryNotFoundError');
        done();
      })
  });

  it('should always return a promise', () => {
    let p = Client('articles', {});
    expect(p.then).to.be.a.function;
    let q = Client('search', {});
    expect(q.then).to.be.a.function;
    let r = Client();
    expect(q.then).to.be.a.function;
    let s = Client('boo');
    expect(q.then).to.be.a.function;
  });

});
