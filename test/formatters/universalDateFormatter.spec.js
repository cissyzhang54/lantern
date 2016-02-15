import {expect} from 'chai';
import getField from '../../src/server/utils/universalDataFormatter';
import section_results from '../fixtures/data/section_results';
import article_results from '../fixtures/data/article_results';
import article_comparator_results from '../fixtures/data/article_comparator_results';

describe('universalDataFormatter', function() {

  let [sectionMetaData, sectionData] = section_results
  let [metaData, articleData, eventData, articleComparatorData, comparatorEventData] = article_results;

  /* Section MetaData Tests Start */
  describe('should parse sectionData correctly', function () {

    it('should parse sectionMetaData correctly', function () {
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

    it('should parse format function with a divisor', function () {

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

    xit('should error when data can not be found', function () {
      expect(getField(sectionMetaData, 'readTimes')).to.throw()
      expect(getField(sectionMetaData, 'readTimes')).to.throw()
    });
  });
  /* Section MetaData Tests End */

  /* Section Data Tests Start */
  describe('should parse sectionData correctly', function () {

    it('formats readTimes', function () {
      expect(getField(sectionData, 'readTimes')).to.be.a('array')
      expect(getField(sectionData, 'readTimes')).to.deep.equal([
        ["2015-10-01T00:00:00.000Z", 5],
        ["2015-10-02T00:00:00.000Z", 0],
        ["2015-10-03T00:00:00.000Z", 1],
        ["2015-10-04T00:00:00.000Z", 1],
        ["2015-10-05T00:00:00.000Z", 270]
      ])
    })

    it('formats pageViews', function () {
      expect(getField(sectionData, 'pageViews')).to.be.a('number')
      expect(getField(sectionData, 'pageViews')).to.deep.equal(913114)
    })

    it('formats referrer_types', function () {
      expect(getField(sectionData, 'referrerTypes')).to.be.a('array')
      expect(getField(sectionData, 'referrerTypes')).to.deep.equal([
        ["Unknown", 289392],
        ["search", 83155],
        ["social-network", 59516],
        ["partner", 8498],
        ["news-sharing", 6171],
        ["email", 324],
        ["sister", 32],
        ["aggregator", 4],
        ["video-sharing", 1]
      ])
    })

    it('formats referrer_names', function () {
      expect(getField(sectionData, 'referrerNames')).to.be.a('array')
      expect(getField(sectionData, 'referrerNames')).to.deep.equal([
        ["Unknown", 339143],
        ["Google", 37030],
        ["Facebook", 26329],
        ["Twitter", 25399],
        ["Yahoo", 5424],
        ["Yahoo Finance", 5180],
        ["Google News", 3486],
        ["Reddit", 1537],
        ["Linked-In", 1214],
        ["Bing", 635]
      ])
    })

    it('formats social_referrers', function () {
      expect(getField(sectionData, 'socialReferrers')).to.be.a('array')
      expect(getField(sectionData, 'socialReferrers')).to.deep.equal([
        ["Facebook", 26329],
        ["Twitter", 25398],
        ["Unknown", 7770],
        ["Google Plus", 14],
        ["Tumblr", 5]
      ])
    })

    it('formats devices', function () {
      expect(getField(sectionData, 'devices')).to.be.a('array')
      expect(getField(sectionData, 'devices')).to.deep.equal([
        ["Desktop", 538479],
        ["Mobile Phone", 197464],
        ["Tablet", 154005],
        ["Unknown", 22673],
        ["Media Player", 352]
      ])
    })

    it('formats countries', function () {
      expect(getField(sectionData, 'countries')).to.be.a('array')
      expect(getField(sectionData, 'countries')).to.deep.equal([
        ["USA", 231212],
        ["IRL", 174590],
        ["GBR", 171114]
      ])
    })

    it('formats regions', function () {
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

    it('formats user_cohort', function () {
      expect(getField(sectionData, 'userCohort')).to.be.a('array')
      expect(getField(sectionData, 'userCohort')).to.deep.equal([
        ["anonymous", 679358],
        ["subscriber", 203256],
        ["registered", 30417],
        ["weekend", 83],
        ["Unknown", 0]
      ])
    })

    it('formats rfv_cluster', function () {
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

    it('formats is_first_visit', function () {
      expect(getField(sectionData, 'isFirstVisit')).to.be.a('array')
      expect(getField(sectionData, 'isFirstVisit')).to.deep.equal([
        ["F", 737979],
        ["T", 175135]
      ])
    })

    it('formats is_first_visit', function () {
      expect(getField(sectionData, 'isFirstVisit')).to.be.a('array')
      expect(getField(sectionData, 'isFirstVisit')).to.deep.equal([
        ["F", 737979],
        ["T", 175135]
      ])
    })

    it('formats internal_referrer_types', function () {
      expect(getField(sectionData, 'internalReferrerTypes')).to.be.a('array')
      expect(getField(sectionData, 'internalReferrerTypes')).to.deep.equal([
        ["FT", 48493],
        ["Unknown", 2298],
        ["story", 954],
        ["front", 290]
      ])
    })

    it('formats is_subscription', function () {
      expect(getField(sectionData, 'isSubscription')).to.be.a('array')
      expect(getField(sectionData, 'isSubscription')).to.deep.equal([
        ["F", 913114]
      ])
    })

    it('formats unique_visitors', function () {
      expect(getField(sectionData, 'uniqueVisitors')).to.be.a('number')
      expect(getField(sectionData, 'uniqueVisitors')).to.deep.equal(252750)
    })

    it('formats topic_views', function () {
      expect(getField(sectionData, 'topicViews')).to.be.a('array')
      expect(getField(sectionData, 'topicViews')).to.deep.equal([
        ["uk", 2502147],
        ["banks", 854507],
        ["acquisitions", 773343]
      ])
    })
  });
  /* Section Data Tests End */

  /* Article Data Tests Start */
  describe('should parse articleData correctly', function () {

    it('should parse timeOnPage', function () {
      expect(getField(articleData, 'timeOnPage')).to.be.a('number')
      expect(getField(articleData, 'timeOnPage')).to.equal(67.64478311840563)
    });

    it('should parse readTimesSincePublish correctly', function () {
      const data = getField(articleData, 'readTimesSincePublish');
      expect(data).to.be.a('array');
      expect(data).to.deep.equal(
[[0,2],[60,13],[120,14],[180,6],[240,7],[300,8],[360,15],[420,7],[480,3],[540,0],[600,2],[660,13],[720,10],[780,14],[840,345],[900,313],[960,150],[1020,83],[1080,57],[1140,58],[1200,28],[1260,0],[1320,1],[1380,39],[1440,63],[1500,65],[1560,73],[1620,84],[1680,58],[1740,47],[1800,64],[1860,71],[1920,42],[1980,47],[2040,43],[2100,39],[2160,34],[2220,43],[2280,37],[2340,40],[2400,44],[2460,23],[2520,18],[2580,26],[2640,17],[2700,6],[2760,12],[2820,33],[2880,23],[2940,29],[3000,52],[3060,29],[3120,28],[3180,18],[3240,22],[3300,7],[3360,2],[3420,0],[3480,21],[3540,16],[3600,15],[3660,16],[3720,12],[3780,10],[3840,9],[3900,3],[3960,13],[4020,9],[4080,4],[4140,3],[4200,1]]
      );
    });

    it('should parse channels correctly', function () {
      const data = getField(articleData, 'channels');
      expect(data).to.be.a('array');
      expect(data).to.deep.equal([
        [
          "FT app",
          1306
        ],
        [
          "ft.com",
          1102
        ],
        [
          "next",
          149
        ],
        [
          "Membership",
          2
        ]
      ]);
    });

    it('should parse referrerUrls correctly', function () {
      const data = getField(articleData, 'referrerUrls');
      expect(data).to.be.a('array');
      expect(data).to.deep.equal([
        [
          "Unknown",
          1296
        ],
        [
          "http://www.sasapost.com/translation/britains-bombing-against-isis-5-questions/",
          3
        ],
        [
          "http://www.financearch.com/",
          2
        ],
        [
          "http://172.16.109.1/cgi-bin/wms.cgi?fn=rl&sid=46063616364626464646f42636068666f48626969696969696f79696f79696f79696f783528353f7c30383d3021363520322f75292f3f7f49686f44676666616962696768646869676&info=946ff27f766501352990d0ce3b11076d27a036291fc4f2ee5f887bd404b5a11f616989da6ee31910&to=&cc=&bcc=&subject=&body=&version=40400&ajax=true&type=",
          1
        ],
        [
          "http://news.google.com/",
          1
        ],
        [
          "http://view.ed4.net/v/EB8122/I901EV/WIETS1/EWD8OQ/?ftcamp=crm/email/2015124/nbe/WorldNews/product",
          1
        ],
        [
          "http://www.financearch.com/category/stock-market/",
          1
        ],
        [
          "http://www.financearch.com/investing-in-government-debt-where-others-fear-to-tread/",
          1
        ],
        [
          "http://www.financearch.com/sitemap/",
          1
        ],
        [
          "http://www.michelbrouwers.com/rssfeeds/",
          1
        ]
      ]);
    });

    it('should parse nextInternalUrl correctly', function () {
      const data = getField(articleData, 'nextInternalUrl');
      expect(data).to.be.a('array');
      expect(data).to.deep.equal([
        [
          "http://app.ft.com/cms/s/3451177a-cd52-11e5-92a1-c5e23ef99c77.html?sectionid=home",
          2135
        ],
        [
          "http://app.ft.com/cms/s/d48d0394-cc1b-11e5-a8ef-ea66e967dd44.html?sectionid=home",
          713
        ],
        [
          "http://app.ft.com/cms/s/12ef2de6-cc72-11e5-be0b-b7ece4e953a0.html?sectionid=home",
          670
        ],
        [
          "http://app.ft.com/cms/s/51bc0958-cc1e-11e5-a8ef-ea66e967dd44.html?sectionid=home",
          669
        ],
        [
          "http://app.ft.com/cms/s/38d1b3b2-cc22-11e5-a8ef-ea66e967dd44.html?sectionid=home",
          612
        ],
        [
         "http://app.ft.com/cms/s/b33d75fe-cc5a-11e5-be0b-b7ece4e953a0.html?sectionid=home",
          475
        ],
        [
           "http://app.ft.com/cms/s/feec9014-cdbf-11e5-92a1-c5e23ef99c77.html?sectionid=world",
          412
        ],
        [
          "http://app.ft.com/cms/s/2f52094a-cc27-11e5-be0b-b7ece4e953a0.html?sectionid=home",
          394
        ],
        [
          "http://www.ft.com/intl/cms/s/3451177a-cd52-11e5-92a1-c5e23ef99c77,Authorised=false.html?siteedition=intl&_i_location=http%3A%2F%2Fwww.ft.com%2Fcms%2Fs%2F0%2F3451177a-cd52-11e5-92a1-c5e23ef99c77.html%3Fsiteedition%3Dintl&_i_referer=http%3A%2F%2Fwww.ft.com%2Fhome%2Fus&classification=conditional_standard&iab=barrier-app",
          317
        ],
        [
          "http://app.ft.com/cms/s/547a2ad4-ce0e-11e5-831d-09f7778e7377.html?sectionid=home",
          301
        ]
      ]);
    });

    it('should parse internalReferrerUrls correctly', function () {
      const data = getField(articleData, 'internalReferrerUrls');
      expect(data).to.be.a('array');
      expect(data).to.deep.equal([
        [
          "Unknown",
          330
        ],
        [
          "http://www.ft.com/home/us",
          182
        ],
        [
          "http://www.ft.com/home/uk",
          113
        ],
        [
          "https://next.ft.com/content/6c154e58-99a7-11e5-9228-87e603d47bdc",
          39
        ],
        [
          "http://www.ft.com/home/europe",
          31
        ],
        [
          "http://www.ft.com/intl/world/mideast",
          24
        ],
        [
          "https://next.ft.com/stream/sectionsId/MQ==-U2VjdGlvbnM=",
          21
        ],
        [
          "http://www.ft.com/home/asia",
          16
        ],
        [
          "https://next.ft.com/international",
          7
        ],
        [
          "http://www.ft.com/intl/world",
          6
        ]
      ]);
    });

    it('should parse isLastPage correctly', function () {
      const data = getField(articleData, 'isLastPage');
      expect(data).to.be.a('array');
      expect(data).to.deep.equal([
        [
          "F",
          1493
        ],
        [
          "T",
          1066
        ]
      ]);
    });
  });
  /* Article Data Tests End */

  /* Article Meta Data Tests Start */
  describe('should parse articleMetaData correctly', function() {
    it('should parse title', function () {
      expect(getField(metaData, 'title')).to.be.a('string')
      expect(getField(metaData, 'title')).to.equal('Private equity secondaries evolve with Palamon deal')
    });

    it('should parse uuid', function () {
      expect(getField(metaData, 'uuid')).to.be.a('string')
      expect(getField(metaData, 'uuid')).to.equal('0049a468-4be5-11e5-b558-8a9722977189')
    });

    it('should parse authors', function () {
      expect(getField(metaData, 'author')).to.be.a('array')
      expect(getField(metaData, 'author')).to.deep.equal([
        "Joseph Cotterill"
      ])
    });

    it('should parse genre', function () {
      expect(getField(metaData, 'genre')).to.be.a('array')
      expect(getField(metaData, 'genre')).to.deep.equal([
        "News"
      ])
    });

    it('should parse sections', function () {
      expect(getField(metaData, 'sections')).to.be.a('array')
      expect(getField(metaData, 'sections')).to.deep.equal([
        "Financials",
        "Investment Strategy",
        "Financial Services",
        "Companies",
        "UK Companies"
      ])
    });

    it('should parse topics', function () {
      expect(getField(metaData, 'topics')).to.be.a('array')
      expect(getField(metaData, 'topics')).to.deep.equal([
        "Private equity"
      ])
    });

    it('should parse published', function () {
      expect(getField(metaData, 'published')).to.be.a('string')
      expect(getField(metaData, 'published')).to.equal("2015-08-26T17:32:01.000Z")
    });

    it('should parse published_human date', function () {
      expect(getField(metaData, 'published_human')).to.be.a('string')
      expect(getField(metaData, 'published_human')).to.equal("August 26, 2015 6:32 pm")
    });
  });
  /* Article Meta Data Tests End */

  /* Article Comparator Data Tests Start */
  describe('should parse articleComparatorData correctly', function() {

    it('should parse totalCommentsViewed', function () {
      const data = getField(articleComparatorData, 'categoryAverageViewCount');
      expect(data).to.be.a('number')
      expect(data).to.deep.equal(4576119)
    });

    it('should parse totalCommentsViewed and divide by 2', function () {
      const data = getField(articleComparatorData, 'categoryAverageViewCount', 2);
      expect(data).to.be.a('number')
      expect(data).to.deep.equal(2288060)
    });

    it('should parse totalCommentsViewed', function () {
      const data = getField(articleComparatorData, 'categoryTotalViewCount');
      expect(data).to.be.a('number');
      expect(data).to.deep.equal(4576119);
    });
  });
  /* Article Comparator Data Tests End */

  /* Article Comparator Event Data Tests Start */
  describe('should parse articleComparatorEventData correctly', function() {
    it('should parse scrollDepth correctly', function() {
      expect(getField(comparatorEventData, 'scrollDepth')).to.be.a('number')
      expect(getField(comparatorEventData, 'scrollDepth') % 1 != 0).to.equal(false)
    });

    it('should parse totalLinksClicked', function() {
      expect(getField(comparatorEventData, 'totalLinksClicked')).to.be.a('number')
    });

    it('should parse socialSharesTotal', function() {
      expect(getField(comparatorEventData, 'socialSharesTotal')).to.be.a('number')
      expect(getField(comparatorEventData, 'socialSharesTotal')).to.equal(3467)
    });

    it('should parse socialSharesTypes', function() {
      expect(getField(comparatorEventData, 'socialSharesTypes')).to.be.a('array')
      expect(getField(comparatorEventData, 'socialSharesTypes')).to.deep.equal([
        ["twitter", 2247],
        ["facebook", 723],
        ["linkedin", 497]
      ])
    });

    it('should parse totalCommentsPosted', function() {
      expect(getField(comparatorEventData, 'totalCommentsPosted')).to.be.a('number')
      expect(getField(comparatorEventData, 'totalCommentsPosted')).to.equal(2235)
    });

    it('should parse totalCommentsViewed', function() {
      expect(getField(comparatorEventData, 'totalCommentsViewed')).to.be.a('number')
      expect(getField(comparatorEventData, 'totalCommentsViewed')).to.equal(44935)
    });
  });
  /* Article Comparator Event Data Tests End */

  /* Article Event Data Tests Start */
  describe('should parse articleEventData correctly', function() {
    it('should parse linkClickCategories', function() {
      expect(getField(eventData, 'linkClickCategories')).to.be.a('object');
    });
  });
  /* Article Event Data Tests Start */

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
