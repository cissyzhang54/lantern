import {expect} from 'chai';
import ArticleFormat from '../../src/server/formatters/Articles';
import ESArticleResults from '../fixtures/data/article_results';

describe('Article Formatter', function() {
  it('should be a function', function () {
    expect(ArticleFormat).to.be.a('function');
  });
  it('should return a promise', function() {
    let p = ArticleFormat();
    expect(p.then).to.be.a('function');
    p = ArticleFormat(null);
    expect(p.then).to.be.a('function');
    p = ArticleFormat(undefined);
    expect(p.then).to.be.a('function');
    p = ArticleFormat(123);
    expect(p.then).to.be.a('function');
    p = ArticleFormat('whats up');
    expect(p.then).to.be.a('function');
    p = ArticleFormat([]);
    expect(p.then).to.be.a('function');
    p = ArticleFormat({});
    expect(p.then).to.be.a('function');
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
  it('should parse results correctly', function(done) {
    ArticleFormat(ESArticleResults)
      .then((data) => {
        expect(data).to.be.a('object');
        const props = [
          'title',
          'uuid',
          'author',
          'published',
          'published_human',
          'pageViews',
          'timeOnPage',
          'readTimes',
          'readTimesSincePublish',
          'genre',
          'sections',
          'topics',
          'channels',
          'referrer_types',
          'referrer_names',
          'referrer_urls',
          'social_referrers',
          'devices',
          'countries',
          'regions',
          'is_last_page',
          'user_cohort',
          'rfv_cluster',
          'is_first_visit',
          'internal_referrer_urls',
          'internal_referrer_types',
          'next_internal_url',
          'is_subscription',
          'social_shares_total',
          'social_shares_types',
          'total_links_clicked',
          'total_comments_posted',
          'total_comments_viewed',
          'scroll_depth',
          'link_click_categories',
          'unique_visitors'
        ];
        for (let i = 0; i < props.length; i++){
          try{
            expect(data.hasOwnProperty(props[i])).to.equal(true);
            expect(data[props[i]]).not.to.equal(undefined);
          } catch(e){
            expect(props[i] + ' Should exist in the formatted output').to.equal(true);
          }
        }
        expect(Array.isArray(data.link_click_categories.buckets)).to.equal(true)
        //did not remove search
        //did remove news-sharing
        expect(data.referrer_types).to.deep.equal([
          [ 'Unknown', 17097 ],
          [ 'social-network', 14796 ],
          [ 'search', 0 ],
          [ 'partner', 1146 ],
          [ 'email', 47 ]
        ])
        done();
      })
      .catch((error) => {
        console.error('error', error);
        done(error);
      });
  });

  it('round numbers correctly', function(done) {
    ArticleFormat(ESArticleResults)
      .then((data) => {
        expect(data.scroll_depth).to.equal(85);
        done();
      })
      .catch((error) => {
        console.error('error', error);
        done(error);
      });
  });
});
