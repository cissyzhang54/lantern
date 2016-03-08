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
      .then((alldata) => {
        let data = alldata.data;
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
          'genre',
          'sections',
          'topics',
          'channels',
          'referrerTypes',
          'referrerNames',
          'referrerUrls',
          'socialReferrers',
          'devices',
          'countries',
          'regions',
          'isLastPage',
          'userCohort',
          'rfvCluster',
          'isFirstVisit',
          'internalReferrerUrls',
          'internalReferrerTypes',
          'nextInternalUrl',
          'isSubscription',
          'socialSharesTotal',
          'socialSharesTypes',
          'totalLinksClicked',
          'totalCommentsPosted',
          'totalCommentsViewed',
          'scrollDepth',
          'linkClickCategories',
          'uniqueVisitors'
        ];
        for (let i = 0; i < props.length; i++){
          try{
            expect(data.hasOwnProperty(props[i])).to.equal(true);
            expect(data[props[i]]).not.to.equal(undefined);
          } catch(e){
            expect(props[i] + ' Should exist in the formatted output').to.equal(true);
          }
        }
        expect(Array.isArray(data.linkClickCategories.buckets)).to.equal(true)
        //did not remove search
        //did remove news-sharing
        expect(data.referrerTypes).to.deep.equal([
          [ 'Unknown', 1308 ],
          [ 'search', 265 ],
          [ 'social media', 122 ],
          [ 'news-sharing', 1 ],
          [ 'email', 0 ],
          [ 'partner', 0]
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
        expect(data.data.scrollDepth).to.equal(83);
        done();
      })
      .catch((error) => {
        console.error('error', error);
        done(error);
      });
  });
});
