import {expect} from 'chai';
import getField from '../../src/server/utils/universalDataFormatter';
import section_results from '../fixtures/data/section_results';
import article_results from '../fixtures/data/article_results';
import article_comparator_results from '../fixtures/data/article_comparator_results';

describe('universalDataFormatter', function() {

  let [sectionMetaData, sectionData] = section_results
  let [articleData, eventData]  = article_results
  let [articleComparatorData, comparatorEventData]  = article_comparator_results

  /* Section MetaData Tests Start */
  describe('should parse sectionData correctly', function() {

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

    it('should parse format function with a divisor', function() {

      expect(getField(sectionMetaData, 'topicCount')).to.be.a('array')
      expect(getField(sectionMetaData, 'topicCount', 2)).to.deep.equal([
        ["uk", 144],
        ["banks", 42],
        ["acquisitions", 34],
        ["mergers", 34],
        ["in", 26],
        ["europe", 24],
        ["britain", 23],
        ["government", 19],
        ["tax", 18],
        ["european", 17]
      ])
    });

    xit('should error when data can not be found', function(){
      expect(getField(sectionMetaData, 'readTimes')).to.throw()
      expect(getField(sectionMetaData, 'readTimes')).to.throw()
    });
  });
  /* Section MetaData Tests End */

  /* Section Data Tests Start */
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
  /* Section Data Tests End */

  /* Article Data Tests Start */
  describe('should parse articleData correctly', function() {

    it('should parse timeOnPage', function() {
      expect(getField(articleData, 'timeOnPage')).to.be.a('number')
      expect(getField(articleData, 'timeOnPage')).to.equal(52.87718548805419)
    });

    it('should parse readTimesSincePublish correctly', function() {
      expect(getField(articleData, 'readTimesSincePublish')).to.be.a('array');
      expect(getField(articleData, 'readTimesSincePublish')).to.deep.equal([
        [ 27180, 3 ], [ 27240, 3 ], [ 27300, 1 ], [ 27360, 2 ], [ 27420, 2 ],
        [ 27480, 1 ], [ 27540, 7 ], [ 27660, 1 ], [ 27720, 6 ], [ 27780, 2 ],
        [ 27840, 9 ], [ 27900, 7 ], [ 27960, 1 ], [ 28020, 3 ], [ 28080, 4 ],
        [ 28200, 5 ], [ 28260, 12 ], [ 28320, 3 ], [ 28380, 4 ], [ 28440, 1 ],
        [ 28500, 1 ], [ 28620, 1 ], [ 28740, 1 ], [ 28860, 1 ], [ 28920, 5 ],
        [ 28980, 3 ], [ 29100, 1 ], [ 29160, 1 ], [ 29220, 4 ], [ 29280, 3 ],
        [ 29340, 2 ], [ 29400, 3 ], [ 29580, 2 ], [ 29640, 2 ], [ 29700, 1 ],
        [ 29760, 4 ], [ 29820, 1 ], [ 29880, 3 ], [ 29940, 4 ], [ 30000, 7 ],
        [ 30060, 1 ], [ 30120, 9 ], [ 30240, 6 ], [ 30300, 3 ], [ 30480, 2 ],
        [ 30600, 7 ], [ 30660, 2 ], [ 30720, 2 ], [ 30780, 2 ], [ 30840, 2 ],
        [ 30900, 6 ], [ 30960, 1 ], [ 31020, 2 ], [ 31080, 1 ], [ 31140, 4 ],
        [ 31200, 5 ], [ 31260, 3 ], [ 31380, 3 ], [ 31620, 1 ], [ 31680, 2 ],
        [ 31740, 2 ], [ 31800, 2 ], [ 31860, 5 ], [ 31920, 4 ], [ 31980, 1 ],
        [ 32040, 9 ], [ 32100, 4 ], [ 32160, 3 ], [ 32220, 3 ], [ 32280, 7 ],
        [ 32340, 4 ], [ 32400, 7 ], [ 32460, 14 ], [ 32520, 7 ], [ 32580, 5 ],
        [ 32640, 2 ], [ 32700, 4 ], [ 32760, 1 ], [ 32820, 7 ], [ 32880, 2 ]
      ]);
    });

    it('should parse channels correctly', function() {
      expect(getField(articleData, 'channels')).to.be.a('array');
      expect(getField(articleData, 'channels')).to.deep.equal([
        ['ft.com', 26205],
        ['Unknown', 5091],
        ['FT app', 936],
        ['next', 540],
        ['Unknown', 1]
      ]);
    });

    it('should parse referrerUrls correctly', function() {
      expect(getField(articleData, 'referrerUrls')).to.be.a('array');
      expect(getField(articleData, 'referrerUrls')).to.deep.equal([
        ['Unknown', 5153],
        ['http://www.bloombergview.com/articles/2015-09-29/ritholtz-s-reads-seven-reasons-vw-may-be-worse-than-enron', 2674],
        ['http://blogs.elconfidencial.com/mercados/valor-anadido/2015-09-29/volkswagen-puede-desaparecer-su-fraude-es-aun-peor-que-el-de-enron_1040790/', 1584],
        ['http://www.ritholtz.com/blog/2015/09/10-tuesday-am-reads-179/', 565],
        ['http://lnkd.in', 524],
        ['http://www.ft.com/home/uk', 463],
        ['http://www.theautomaticearth.com/2015/09/debt-rattle-september-28-2015/', 410],
        ['http://www.svd.se/darfor-ar-volkswagen-skandalen-varre-an-enron', 375],
        ['http://www.ritholtz.com/blog/', 338],
        ['http://www.businessinsider.com/volkswagens-scandal-is-worse-than-enron-and-reports-say-the-company-was-warned-about-cheat-devices-2015-9', 291]
      ]);
    });

    it('should parse nextInternalUrl correctly', function() {
      expect(getField(articleData, 'nextInternalUrl')).to.be.a('array');
      expect(getField(articleData, 'nextInternalUrl')).to.deep.equal([
        ['Unknown', 73],
        ['http://www.ft.com/cms/s/0/0049a468-4be5-11e5-b558-8a9722977189.html', 4],
        ['http://www.ft.com/cms/s/0049a468-4be5-11e5-b558-8a9722977189,Authorised=false.html?siteedition=uk&_i_location=http%3A%2F%2Fwww.ft.com%2Fcms%2Fs%2F0%2F0049a468-4be5-11e5-b558-8a9722977189.html%3Fsiteedition%3Duk&_i_referer=http%3A%2F%2Fwww.google.co.uk%2Furl%3Fsa%3Dt%26rct%3Dj%26q%3D%26esrc%3Ds%26frm%3D1%26source%3Dweb%26cd%3D4%26ved%3D0CDkQFjADahUKEwitxcmxiLDIAhWJqx4KHcJmByA%26url%3Dhttp%253A%252F%252Fwww.ft.com%252Fcms%252Fs%252F0%252F0049a468-4be5-11e5-b558-8a9722977189.html%26usg%3DAFQjCNG31f1iiplUDLMQ8LxTuqbNA4aKow%26bvm%3Dbv.104615367%2Cd.dmo&classification=conditional_standard&iab=barrier-app#axzz3nsDhmdf7', 2],
        ['http://www.ft.com/intl/cms/s/6da817bc-6d12-11e5-8171-ba1968cf791a,Authorised=false.html?ftcamp=published_links%2Frss%2Fcompanies%2Ffeed%2F%2Fproduct&_i_location=http%3A%2F%2Fwww.ft.com%2Fintl%2Fcms%2Fs%2F0%2F6da817bc-6d12-11e5-8171-ba1968cf791a.html%3Fftcamp%3Dpublished_links%252Frss%252Fcompanies%252Ffeed%252F%252Fproduct&_i_referer=&classification=conditional_standard&iab=barrier-app', 2],
        ['https://next.ft.com/content/f7cd3f4c-6472-11e5-9846-de406ccb37f2', 2],
        ['http://app.ft.com/cms/s/170fa5f2-708a-11e5-9b9e-690fdae72044.html?sectionid=companies', 1],
        ['http://app.ft.com/cms/s/c9545f9e-e522-11e4-bb4b-00144feab7de', 1],
        ['http://www.ft.com/cms/s/0/22d8cf50-6129-11e5-a28b-50226830d644.html', 1],
        ['http://www.ft.com/cms/s/0/72c34344-592b-11e4-a722-00144feab7de.html', 1],
        ['http://www.ft.com/cms/s/0/a4ef85fa-5540-11e5-b029-b9d50a74fd14.html', 1]
      ]);
    });

    it('should parse internalReferrerUrls correctly', function() {
      expect(getField(articleData, 'internalReferrerUrls')).to.be.a('array');
      expect(getField(articleData, 'internalReferrerUrls')).to.deep.equal([
        ['Unknown', 30399],
        ['http://www.ft.com/home/uk', 3840],
        ['http://www.ft.com/home/us', 3574],
        ['http://www.ft.com/home/europe', 2170],
        ['http://www.ft.com/home/asia', 1190],
        ['http://www.ft.com/intl/vw-emissions-scandal', 618],
        ['http://www.ft.com/vw-emissions-scandal', 292 ],
        ['http://www.ft.com/intl/cms/s/0/8f2eb94c-62ac-11e5-a28b-50226830d644.html', 202],
        ['http://www.ft.com/cms/s/0/8f2eb94c-62ac-11e5-a28b-50226830d644.html', 193],
        ['http://www.ft.com/cms/s/0/2eea3106-65c2-11e5-9846-de406ccb37f2.html', 183]
      ]);
    });

    it('should parse isLastPage correctly', function() {
      expect(getField(articleData, 'isLastPage')).to.be.a('array');
      expect(getField(articleData, 'isLastPage')).to.deep.equal([
        [ 'T', 3158 ],
        [ 'F', 2568 ]
      ]);
    });
  });
  /* Article Data Tests End */

  /* Article Event Data Tests Start */
  describe('should parse articleComparatorEventData correctly', function() {
    it('should parse scrollDepth correctly', function() {
      expect(getField(comparatorEventData, 'scrollDepth')).to.be.a('number')
      expect(getField(comparatorEventData, 'scrollDepth') % 1 != 0).to.equal(true)
    });

    it('should parse totalLinksClicked', function() {
      expect(getField(comparatorEventData, 'totalLinksClicked')).to.be.a('number')
    });

    it('should parse socialSharesTotal', function() {
      expect(getField(comparatorEventData, 'socialSharesTotal')).to.be.a('number')
      expect(getField(comparatorEventData, 'socialSharesTotal')).to.equal(1)
    });

    it('should parse socialSharesTypes', function() {
      expect(getField(comparatorEventData, 'socialSharesTypes')).to.be.a('array')
      expect(getField(comparatorEventData, 'socialSharesTypes')).to.deep.equal([
        ["twitter", 1]
      ])
    });

    it('should parse totalCommentsPosted', function() {
      expect(getField(comparatorEventData, 'totalCommentsPosted')).to.be.a('number')
      expect(getField(comparatorEventData, 'totalCommentsPosted')).to.equal(3)
    });

    it('should parse totalCommentsViewed', function() {
      expect(getField(comparatorEventData, 'totalCommentsViewed')).to.be.a('number')
      expect(getField(comparatorEventData, 'totalCommentsViewed')).to.equal(1)
    });

  });
  /* Article Event Data Tests End */

  /* Article Comparator Data Tests Start */
  describe('should parse articleComparatorData correctly', function() {
    it('should parse divide function with a divisor', function () {
      expect(getField(articleComparatorData, 'categoryAverageViewCount')).to.be.a('number')
      expect(getField(articleComparatorData, 'categoryAverageViewCount')).to.deep.equal(172)
      expect(getField(articleComparatorData, 'categoryAverageViewCount', 2)).to.be.a('number')
      expect(getField(articleComparatorData, 'categoryAverageViewCount', 2)).to.deep.equal(86)
    });
  });
  /* Article Comparator Data Tests End */


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
  });

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
    });

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
    });

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
  });
});
