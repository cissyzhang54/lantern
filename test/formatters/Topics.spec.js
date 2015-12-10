import {expect} from 'chai';
import TopicFormat from '../../src/server/formatters/Topics';
import results from '../fixtures/data/topic_results';

describe('Topic Formatter', function() {
  it('should be a function', function () {
    expect(TopicFormat).to.be.a('function');
  });
  it('should return a promise', function() {
    let p = TopicFormat();
    expect(p.then).to.be.a('function');
    p = TopicFormat(null);
    expect(p.then).to.be.a('function');
    p = TopicFormat(undefined);
    expect(p.then).to.be.a('function');
    p = TopicFormat(123);
    expect(p.then).to.be.a('function');
    p = TopicFormat('whats up');
    expect(p.then).to.be.a('function');
    p = TopicFormat([]);
    expect(p.then).to.be.a('function');
    p = TopicFormat({});
    expect(p.then).to.be.a('function');
  });
  it('should reject a promise with a MalformedArgumentsError if passed a string', function(done) {
    TopicFormat('donald trump')
      .catch((error) => {
        expect(error.name).to.equal('MalformedArgumentsError');
        expect(error.data).to.equal('donald trump');
        done();
      });
  });
  it('should reject the promise with a MalformedArgumentsError if passed an object', function(done) {
    TopicFormat({})
      .catch((error) => {
        expect(error.name).to.equal('MalformedArgumentsError');
        done();
      });
  });
  it('should parse results correctly', function(done) {
    TopicFormat(results)
      .then((data) => {
        expect(data).to.be.a('object');
        const props = [
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
          'sectionCount',
          'sectionViews'
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
