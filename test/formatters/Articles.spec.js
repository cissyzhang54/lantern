import {expect} from 'chai';
import ArticleFormat from '../../src/server/formatters/Articles';
import ESArticleResults from '../fixtures/data/article_results';

describe('Article Formatter', function() {
  it('should be a function', function () {
    expect(ArticleFormat).to.be.a.function;
  });
  it('should return a promise', function() {
    let p = ArticleFormat();
    expect(p.then).to.be.a.function;
    p = ArticleFormat(null);
    expect(p.then).to.be.a.function;
    p = ArticleFormat(undefined);
    expect(p.then).to.be.a.function;
    p = ArticleFormat(123);
    expect(p.then).to.be.a.function;
    p = ArticleFormat('whats up');
    expect(p.then).to.be.a.function;
    p = ArticleFormat([]);
    expect(p.then).to.be.a.function;
    p = ArticleFormat({});
    expect(p.then).to.be.a.function;
  });
  it('should reject a promise with a MalformedArgumentsError', function(done) {
    ArticleFormat('donald trump')
      .catch((error) => {
        expect(error.name).to.equal('MalformedArgumentsError');
        expect(error.data).to.equal('donald trump');
        done();
      });
  });
  it('should reject the promise with a DataParsingError', function(done) {
    ArticleFormat({})
      .catch((error) => {
        expect(error.name).to.equal('DataParsingError');
        done();
      });
  });
  it('should parse results correctly', function(done) {
    ArticleFormat(ESArticleResults)
      .then((data) => {
        expect(data.article).to.be.a.object;
        done();
      });
  });
});
