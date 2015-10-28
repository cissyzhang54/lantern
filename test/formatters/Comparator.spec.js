import {expect} from 'chai';
import ArticleFormat from '../../src/server/formatters/Comparators';
import ESArticleResults from '../fixtures/data/article_comparator_results';

describe('Comparator Formatter', function() {
  it('should be a function', function () {
    expect(ArticleFormat).to.be.a('function');
  });
  it('should return a promise', function() {
    let p = ArticleFormat();
    expect(p.then).to.be.a('function')
    p = ArticleFormat(null);
    expect(p.then).to.be.a('function')
    p = ArticleFormat(undefined);
    expect(p.then).to.be.a('function')
    p = ArticleFormat(123);
    expect(p.then).to.be.a('function')
    expect(p.then).to.be.a('function')
    p = ArticleFormat('whats up');
    expect(p.then).to.be.a('function')
    p = ArticleFormat([]);
    expect(p.then).to.be.a('function')
    p = ArticleFormat({});
    expect(p.then).to.be.a('function')
  });
  it('should reject a promise with a MalformedArgumentsError if passed a string', function(done) {
    ArticleFormat('donald trump')
      .catch((error) => {
        expect(error.name).to.equal('MalformedArgumentsError');
        expect(error.data).to.equal('donald trump');
        done();
      });
  });
  it('should reject the promise with a MalformedArgumentsError if passed an object', function(done) {
    ArticleFormat({})
      .catch((error) => {
        expect(error.name).to.equal('MalformedArgumentsError');
        done();
      });
  });
  xit('should parse results correctly', function(done) {
    ArticleFormat(ESArticleResults)
      .then((data) => {
        expect(data.article).to.be.a('object');
        const props = [
          'comparator',
          'timeOnPage',
          'page_views_over_time',
          'category_total_view_count',
          'category_article_count',
          'category_average_view_count',
          'readTimes',
          'referrer_types',
          'social_referrers',
          'regions',
          'is_last_page',
          'user_cohort',
          'rfv_cluster',
          'is_first_visit',
          'internal_referrer_types',
          'social_shares_total',
          'social_shares_types',
          'total_links_clicked',
          'total_comments_posted'
        ];
        for (let i = 0; i < props.length; i++){
          expect(data.article.hasOwnProperty(props[i])).to.be.truthy;
        }
        done();
      })
      .catch((error) => {
        console.error('error', error);
        done(error);
      });
  });
});
