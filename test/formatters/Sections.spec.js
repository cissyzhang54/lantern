import {expect} from 'chai';
import SectionFormat from '../../src/server/formatters/Sections';
import results from '../fixtures/data/section_results';

describe('Section Formatter', function() {
  it('should be a function', function () {
    expect(SectionFormat).to.be.a('function');
  });
  it('should return a promise', function() {
    let p = SectionFormat();
    expect(p.then).to.be.a('function');
    p = SectionFormat(null);
    expect(p.then).to.be.a('function');
    p = SectionFormat(undefined);
    expect(p.then).to.be.a('function');
    p = SectionFormat(123);
    expect(p.then).to.be.a('function');
    p = SectionFormat('whats up');
    expect(p.then).to.be.a('function');
    p = SectionFormat([]);
    expect(p.then).to.be.a('function');
    p = SectionFormat({});
    expect(p.then).to.be.a('function');
  });
  it('should reject a promise with a MalformedArgumentsError if passed a string', function(done) {
    SectionFormat('donald trump')
      .catch((error) => {
        expect(error.name).to.equal('MalformedArgumentsError');
        expect(error.data).to.equal('donald trump');
        done();
      });
  });
  it('should reject the promise with a MalformedArgumentsError if passed an object', function(done) {
    SectionFormat({})
      .catch((error) => {
        expect(error.name).to.equal('MalformedArgumentsError');
        done();
      });
  });
  it('should parse results correctly', function(done) {
    SectionFormat(results)
      .then((data) => {
        expect(data).to.be.a('object');
        const props = [
          'articleCount',
          'pageViews',
          'genre',
          'sections',
          'topics',
          'referrerTypes',
          'referrerNames',
          'socialReferrers',
          'devices',
          'countries',
          'regions',
          'userCohort',
          'rfvCluster',
          'isFirstVisit',
          'internalReferrerTypes',
          'isSubscription',
          'uniqueVisitors',
          'topicCount',
          'topicViews',
          'articlePublishCount',
          'articleList'
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
