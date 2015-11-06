import {expect} from 'chai';
import getField from '../../src/server/utils/universalDataFormatter';
import section_results from '../fixtures/data/section_results';
import article_results from '../fixtures/data/article_results';
import article_comparator_results from '../fixtures/data/article_comparator_results';

describe('universalDataFormatter', function() {

  let [sectionMetaData, sectionData] = section_results

  it('should parse sectionMetaData correctly', function() {
    expect(getField(sectionMetaData, 'articleCount')).to.be.a('number')
    expect(getField(sectionMetaData, 'articleCount')).to.deep.equal(252)

    expect(getField(sectionMetaData, 'topicsCovered')).to.be.a('number')
    expect(getField(sectionMetaData, 'topicsCovered')).to.deep.equal(108)

    expect(getField(sectionMetaData, 'topic_count')).to.be.a('array')
    expect(getField(sectionMetaData, 'topic_count')).to.deep.equal([
      ["uk", 288],
      ["banks", 84],
      ["acquisitions", 67],
      ["mergers", 67],
      ["in", 52],
      ["europe", 48],
      ["britain", 46],
      ["government", 38],
      ["tax", 35],
      ["european", 34]
    ])
  });

  xit('should error when data can not be found', function(){
    expect(getField(sectionMetaData, 'readTimes')).to.be.a('function')
    expect(getField(sectionMetaData, 'readTimes')).to.be.a('function')
  });

  describe('should parse sectionData correctly', function() {
    //[ 'devices', 'countries',
    //  'regions', 'user_cohort',
    //  'rfv_cluster', 'is_first_visit', 'internal_referrer_types',
    //  'is_subscription', 'unique_visitors',
    //  'topic_views'
    //]
    it('formats readTimes', function(){
      expect(getField(sectionData, 'readTimes')).to.be.a('array')
      expect(getField(sectionData, 'readTimes')).to.deep.equal([
        ["2015-10-01T00:00:00.000Z", 5],
        ["2015-10-02T00:00:00.000Z", 0],
        ["2015-10-03T00:00:00.000Z", 1],
        ["2015-10-04T00:00:00.000Z", 1],
        ["2015-10-05T00:00:00.000Z", 270]
      ])
    })


    it('formats pageViews', function(){
      expect(getField(sectionData, 'pageViews')).to.be.a('number')
      expect(getField(sectionData, 'pageViews')).to.deep.equal(913114)
    })

    it('formats referrer_types', function(){
      expect(getField(sectionData, 'referrer_types')).to.be.a('array')
      expect(getField(sectionData, 'referrer_types')).to.deep.equal([
        ["Unknown", 289392],
        ["search", 83155],
        ["social-network", 59516],
        ["partner", 8498],
        ["news-sharing", 6171],
        ["email", 324],
        ["sister", 32],
        ["aggregator",4],
        ["video-sharing", 1]
      ])
    })

    it('formats referrer_names', function(){
      expect(getField(sectionData, 'referrer_names')).to.be.a('array')
      expect(getField(sectionData, 'referrer_names')).to.deep.equal([
        ["Unknown", 339143],
        ["Google", 37030],
        ["Facebook", 26329],
        ["Twitter", 25399],
        ["Yahoo", 5424],
        ["Yahoo Finance", 5180],
        ["Google News",3486],
        ["Reddit", 1537],
        ["Linked-In",1214],
        ["Bing", 635]
      ])
    })

    it('formats social_referrers', function(){
      expect(getField(sectionData, 'social_referrers')).to.be.a('array')
      expect(getField(sectionData, 'social_referrers')).to.deep.equal([
        ["Facebook", 26329],
        ["Twitter", 25398],
        ["Unknown", 7770],
        ["Google Plus", 14],
        ["Tumblr", 5]
      ])
    })

  });



  describe('reformats referrer_types correctly', function(){

    it('by renaming blank to unknown ', function(){
      expect(getField({aggregations:{
        "referrer": {
          "types": {
            "buckets": [
              {"key": "","doc_count": 289392}
            ]
          }
        }}}, 'referrer_types')).to.deep.equal([["Unknown", 289392]])
    })
    it('by removing results with zeros', function(){
      expect(getField({aggregations:{
        "referrer": {
          "types": {
            "buckets": [
              {"key": "","doc_count": 0},
              {"key": "pete","doc_count": 0},
              {"key": "billy-bob","doc_count": 0}
            ]
          }
        }}}, 'referrer_types')).to.deep.equal([])
    })
    it('by keeping specific results with zeros', function(){
      expect(getField({aggregations:{
        "referrer": {
          "types": {
            "buckets": [
              {"key": "search","doc_count": 0},
              {"key": "unknown","doc_count": 0},
              {"key": "partner","doc_count": 0},
              {"key": "social-network","doc_count": 0},
              {"key": "email","doc_count": 0}
            ]
          }
        }}}, 'referrer_types')).to.deep.equal([
          ["search", 0],
          ["unknown",0],
          ["partner", 0],
          ["social-network", 0],
          ["email", 0]
      ]);
    })

  })



  describe('reformats social_referrers correctly', function(){

    it('by renaming blank to unknown ', function(){
      expect(getField({aggregations:{
        "social_referrers": {
          "filtered": {
            "buckets": [
              {"key": "","doc_count": 289392}
            ]
          }
        }}}, 'social_referrers')).to.deep.equal([["Unknown", 289392]])
    })
    it('by removing results with zeros', function(){
      expect(getField({aggregations:{
        "social_referrers": {
          "filtered": {
            "buckets": [
              {"key": "","doc_count": 0},
              {"key": "pete","doc_count": 0},
              {"key": "billy-bob","doc_count": 0}
            ]
          }
        }}}, 'social_referrers')).to.deep.equal([])
    })
    it('by keeping specific results with zeros', function(){
      expect(getField({aggregations:{
        "social_referrers": {
          "filtered": {
            "buckets": [
              {"key": "Facebook","doc_count": 0},
              {"key": "Twitter","doc_count": 0},
              {"key": "Linked-In","doc_count": 0},
            ]
          }
        }}}, 'social_referrers')).to.deep.equal([
          ["Facebook", 0],
          ["Twitter",0],
          ["Linked-In", 0],
      ]);
    })

  })


});
