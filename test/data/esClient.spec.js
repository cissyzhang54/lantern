import { expect } from 'chai';
import * as esClient from '../../src/server/esClient';


describe('Elasticsearch Client', () => {
  it('should be a function', () => {
    expect(esClient).to.be.a('object');
    expect(esClient.getIndicies).to.be.a('function');
    expect(esClient.runArticleQuery).to.be.a('function');
    expect(esClient.runSearchQuery).to.be.a('function');
  });

  it('should return a rejected promise if given query to runArticleQuery', (done) => {
    esClient.runArticleQuery()
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
    expect(p.then).to.be.a('function');
    let q = esClient.runSearchQuery({});
    expect(q.then).to.be.a('function');
  });

  describe('_normalisePrimarySection method', () => {

    it('should pick the first primary section where an array of primary sections are supplied', () => {
      expect(esClient._normalisePrimarySection(['hamsters', 'wabbits'])).to.equal('hamsters');
    });

    it('should pick the first primary section where a comma separated list of primary sections are supplied', () => {
      expect(esClient._normalisePrimarySection('hamsters', 'wabbits')).to.equal('hamsters');
    });

    it('should return a single primary section where one primary section is supplied', () => {
      expect(esClient._normalisePrimarySection('hamsters')).to.equal('hamsters');
    });

    it('should leave the primary section as undefined when not available', () => {
      expect(esClient._normalisePrimarySection(null)).to.equal(undefined);
    });

  });

  describe('_getComparatorFromPrimarySection', () => {

    it('returns a valid section comparator from a primary section', () => {
      expect(esClient._getComparatorFromPrimarySection('cheesy_wotsits')).to.deep.equal({
        comparatorType: 'section',
        comparator: 'cheesy_wotsits'
      });
    });

    it('returns the global comparator when there is no primary section', () => {
      expect(esClient._getComparatorFromPrimarySection(undefined)).to.deep.equal({
        comparatorType: 'global',
        comparator: 'FT'
      });
    });
  });

});
