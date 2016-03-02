import {expect} from 'chai';
import TopArticlesFormat from '../../src/server/formatters/TopArticles';
import results from '../fixtures/data/top_articles_results';

describe('Top Articles Formatter', function() {
  it('should be a function', function () {
    expect(TopArticlesFormat).to.be.a('function');
  });
  it('should return a promise', function() {
    let p = TopArticlesFormat();
    expect(p.then).to.be.a('function');
    p = TopArticlesFormat(null);
    expect(p.then).to.be.a('function');
    p = TopArticlesFormat(undefined);
    expect(p.then).to.be.a('function');
    p = TopArticlesFormat(123);
    expect(p.then).to.be.a('function');
    p = TopArticlesFormat('whats up');
    expect(p.then).to.be.a('function');
    p = TopArticlesFormat([]);
    expect(p.then).to.be.a('function');
    p = TopArticlesFormat({});
    expect(p.then).to.be.a('function');
  });
  it('should reject a promise with a MalformedArgumentsError if passed a string', function(done) {
    TopArticlesFormat('donald trump')
      .catch((error) => {
        expect(error.name).to.equal('MalformedArgumentsError');
        expect(error.data).to.equal('donald trump');
        done();
      });
  });
  it('should reject the promise with a MalformedArgumentsError if passed an array', function(done) {
    TopArticlesFormat([])
      .catch((error) => {
        expect(error.name).to.equal('MalformedArgumentsError');
        done();
      });
  });
  it('should parse results correctly', function(done) {
    TopArticlesFormat(results)
      .then((data) => {
        expect(data).to.be.a('object');
        const props = [
          'timeOnPageTop'
        ];
        for (let i = 0; i < props.length; i++){
          try{
            expect(data.data.hasOwnProperty(props[i])).to.equal(true);
            expect(data.data[props[i]]).not.to.equal(undefined);
          } catch(e){
            expect(props[i] + ' Should exist in the formatted output').to.equal(true);
          }
        }
        done();
      })
      .catch((error) => {
        console.error('error', error);
        done(error);
      });
  });

});
