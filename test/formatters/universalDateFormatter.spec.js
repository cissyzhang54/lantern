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

    expect(getField(sectionMetaData, 'topicCount')).to.be.a('array')
    expect(getField(sectionMetaData, 'topicCount')).to.deep.equal([
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
      expect(getField(sectionData, 'referrerTypes')).to.be.a('array')
      expect(getField(sectionData, 'referrerTypes')).to.deep.equal([
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
      expect(getField(sectionData, 'referrerNames')).to.be.a('array')
      expect(getField(sectionData, 'referrerNames')).to.deep.equal([
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
      expect(getField(sectionData, 'socialReferrers')).to.be.a('array')
      expect(getField(sectionData, 'socialReferrers')).to.deep.equal([
        ["Facebook", 26329],
        ["Twitter", 25398],
        ["Unknown", 7770],
        ["Google Plus", 14],
        ["Tumblr", 5]
      ])
    })

    it('formats devices', function(){
      expect(getField(sectionData, 'devices')).to.be.a('array')
      expect(getField(sectionData, 'devices')).to.deep.equal([
        ["Desktop",538479],
        ["Mobile Phone", 197464],
        ["Tablet", 154005],
        ["Unknown", 22673],
        ["Media Player", 352]
      ])
    })

    it('formats countries', function(){
      expect(getField(sectionData, 'countries')).to.be.a('array')
      expect(getField(sectionData, 'countries')).to.deep.equal([
        ["USA", 231212],
        ["IRL", 174590],
        ["GBR", 171114]
      ])
    })

    it('formats regions', function(){
      expect(getField(sectionData, 'regions')).to.be.a('array')
      expect(getField(sectionData, 'regions')).to.deep.equal([
        ["EUROPE", 333723],
        ["US", 281885],
        ["UK", 171114],
        ["ASIA", 69966],
        ["MIDDLEEAST", 23542],
        ["Unknown", 16477],
        ["INDIA", 16407]
      ])
    })

    it('formats user_cohort', function(){
      expect(getField(sectionData, 'userCohort')).to.be.a('array')
      expect(getField(sectionData, 'userCohort')).to.deep.equal([
        ["anonymous", 679358],
        ["subscriber", 203256],
        ["registered", 30417],
        ["weekend", 83],
        ["Unknown", 0]
      ])
    })

    it('formats rfv_cluster', function(){
      expect(getField(sectionData, 'rfvCluster')).to.be.a('array')
      expect(getField(sectionData, 'rfvCluster')).to.deep.equal([
        ["Unknown", 515729],
        ["1. FT Super Fans", 276448],
        ["2. FT Fans", 37786],
        ["3. Engaged, Frequent and Free", 8019],
        ["4. Borderline Engaged", 42670],
        ["5. Half Engaged", 10117],
        ["6. Occasional Skimmers", 17361],
        ["7. Disengaged Long Tail", 4984]
      ])
    })

    it('formats is_first_visit', function(){
      expect(getField(sectionData, 'isFirstVisit')).to.be.a('array')
      expect(getField(sectionData, 'isFirstVisit')).to.deep.equal([
        ["F", 737979],
        ["T", 175135]
      ])
    })

    it('formats is_first_visit', function(){
      expect(getField(sectionData, 'isFirstVisit')).to.be.a('array')
      expect(getField(sectionData, 'isFirstVisit')).to.deep.equal([
        ["F", 737979],
        ["T", 175135]
      ])
    })

    it('formats internal_referrer_types', function(){
      expect(getField(sectionData, 'internalReferrerTypes')).to.be.a('array')
      expect(getField(sectionData, 'internalReferrerTypes')).to.deep.equal( [
        ["FT", 48493],
        ["Unknown", 2298],
        ["story", 954],
        ["front", 290]
      ])
    })

    it('formats is_subscription', function(){
      expect(getField(sectionData, 'isSubscription')).to.be.a('array')
      expect(getField(sectionData, 'isSubscription')).to.deep.equal( [
        ["F", 913114]
      ])
    })

    it('formats unique_visitors', function(){
      expect(getField(sectionData, 'uniqueVisitors')).to.be.a('number')
      expect(getField(sectionData, 'uniqueVisitors')).to.deep.equal(252750)
    })

    it('formats topic_views', function(){
      expect(getField(sectionData, 'topicViews')).to.be.a('array')
      expect(getField(sectionData, 'topicViews')).to.deep.equal([
        ["uk",2502147],
        ["banks", 854507],
        ["acquisitions", 773343]
      ])
    })

  });



  describe('re-formats referrerTypes correctly', function(){

    it('by renaming blank to unknown ', function(){
      expect(getField({aggregations:{
        "referrer": {
          "types": {
            "buckets": [
              {"key": "","doc_count": 289392}
            ]
          }
        }}}, 'referrerTypes')).to.deep.equal([["Unknown", 289392]])
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
        }}}, 'referrerTypes')).to.deep.equal([])
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
        }}}, 'referrerTypes')).to.deep.equal([
          ["search", 0],
          ["unknown",0],
          ["partner", 0],
          ["social-network", 0],
          ["email", 0]
      ]);
    })

  })



  describe('re-formats social_referrers correctly', function(){

    it('by renaming blank to unknown ', function(){
      expect(getField({aggregations:{
        "social_referrers": {
          "filtered": {
            "buckets": [
              {"key": "","doc_count": 289392}
            ]
          }
        }}}, 'socialReferrers')).to.deep.equal([["Unknown", 289392]])
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
        }}}, 'socialReferrers')).to.deep.equal([])
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
        }}}, 'socialReferrers')).to.deep.equal([
          ["Facebook", 0],
          ["Twitter",0],
          ["Linked-In", 0],
      ]);
    })

  })


});
