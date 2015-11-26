var articlePage = require('../pages/article-page.js');
var components = require ('../pages/article-components.js');
var nConcat = require ('../utils/nightwatch-concat.js');
var nExtras = require ('../utils/nightwatch-extas.js');

var currentSection;

module.exports = {

  'Initiate Test': function (browser) {
    console.log("===================================\n" +
      ">> Starting article-known-comparison.js\n" +
      "===================================");

    browser
      .url(articlePage.exampleArticleUrl)
      .assert.title(articlePage.exampleArticleTitle)
  },

  'Set Date Range : 12 Nov 2015 - 14 Nov 2015' : function (browser) {
    var dateRange = nConcat.dataComponent(articlePage.sectionModifier.dateRange);
    browser.click(dateRange)
      .click(components.dateRangeFirst3Days)
  },

  'Check Modifier Section' : function (browser) {
    currentSection = articlePage.sectionModifier;
    browser
      .assert.containsText(nConcat.dataComponent(currentSection.dateRange) + ' div:nth-child(2) span:nth-child(1)', '12 Nov 2015 - 14 Nov 2015',
      'Date Range set to "First 3 days"');
    browser.expect.element(components.updatingArticle).not.present.before(10000);
    browser
      .assert.containsText(components.comparisonIncludes, '1,315 \'FT\' articles',
      'Comparison element contains "1,315" \'FT\' articles"')
  },

  'Check Headline Stats Section' : function (browser) {
    currentSection = articlePage.sectionHeadline;

    nExtras.doComparator(browser, currentSection.timeOnPage, '0m 9s', '-61');
    nExtras.doComparator(browser, currentSection.pageViews, '7,210', '44');
    nExtras.doComparator(browser, currentSection.uniqueVisitors, '944', '71');
    nExtras.doComparator(browser, currentSection.scrollDepth, '0%', '-100');
  },

  'Check When Section' : function (browser) {
    // TODO: do this when there's more data to play with?
  },


  'Check Next Section' : function (browser) {
    // TODO: Bounce-Rate chart
    currentSection = articlePage.sectionNext;
    browser
      .assert.containsText(nConcat.dataComponent(currentSection.exitPage) + ' tbody tr:nth-child(1) td:nth-child(1)', 'Unknown',
      'Exit Page: "Unknown"')
      .assert.containsText(nConcat.dataComponent(currentSection.exitPage) + ' tbody tr:nth-child(1) td:nth-child(2)', '6223',
      'Views is "6223"')

      .assert.containsText(nConcat.dataComponent(currentSection.exitPage) + ' tbody tr:nth-child(2) td:nth-child(1)', 'http://app.ft.com/cms/s/57ca9338-889d-11e5-90de-f44762bf9896…',
      'Exit Page: "New Article - Mozambique"')
      .assert.containsText(nConcat.dataComponent(currentSection.exitPage) + ' tbody tr:nth-child(2) td:nth-child(2)', '90',
      'Views is "90"')

      .assert.containsText(nConcat.dataComponent(currentSection.exitPage) + ' tbody tr:nth-child(3) td:nth-child(1)', 'http://app.ft.com/index_page/world',
      'Exit Page: "FT - World"')
      .assert.containsText(nConcat.dataComponent(currentSection.exitPage) + ' tbody tr:nth-child(3) td:nth-child(2)', '87',
      'Views is "87"')

      .assert.containsText(nConcat.dataComponent(currentSection.exitPage) + ' tbody tr:nth-child(4) td:nth-child(1)', 'http://app.ft.com/cms/s/69feb35e-893d-11e5-90de-f44762bf9896…',
      'Exit Page: "Same Article on App"')
      .assert.containsText(nConcat.dataComponent(currentSection.exitPage) + ' tbody tr:nth-child(4) td:nth-child(2)', '73',
      'Views is "73"')

      .assert.containsText(nConcat.dataComponent(currentSection.exitPage) + ' tbody tr:nth-child(5) td:nth-child(1)', 'http://app.ft.com/cms/s/26af4e08-892c-11e5-9f8c-a8d619fa707c…',
      'Exit Page: "New Article - Forex"')
      .assert.containsText(nConcat.dataComponent(currentSection.exitPage) + ' tbody tr:nth-child(5) td:nth-child(2)', '39',
      'Views is "39"')
  },

  'Check Interactive Stats Section' : function (browser) {
    currentSection = articlePage.sectionInteractive;
    browser
      // TODO: This needs to be populated before it can be worked on
      //.assert.containsText(nConcat.dataComponent(currentSection.linksClicked), '0',
      //'Time on Page contains "0"')
      //.assert.attributeContains(nConcat.chevron(currentSection.linksClicked), 'class', 'glyphicon-chevron-down',
      //'Time on Page percentile is negative')
      //.assert.containsText(nConcat.percentile(currentSection.linksClicked), '93%',
      //'Time on Page is at "93%"')
      //
      //.assert.containsText(nConcat.dataComponent(currentSection.socialShares), '31',
      //'Page Views contains "31"')
      //.assert.attributeContains(nConcat.chevron(currentSection.socialShares), 'class', 'glyphicon glyphicon-glyphicon glyphicon-chevron-up',
      //'Page Views percentile is positive')
      //.assert.containsText(nConcat.percentile(currentSection.socialShares), '244%',
      //'Page Views is at "244%"')
      //
      //.assert.containsText(nConcat.dataComponent(currentSection.commentsViewed), '13',
      //'Unique Visitors contains "13"')
      //.assert.attributeContains(nConcat.chevron(currentSection.commentsViewed), 'class', 'glyphicon-chevron-up',
      //'Unique Visitors percentile is positive')
      //.assert.containsText(nConcat.percentile(currentSection.commentsViewed), '160%',
      //'Unique Visitors is at "160%"')
      //
      //.assert.containsText(nConcat.dataComponent(currentSection.commentsPosted), '100%',
      //'Scroll Depth contains "100%"')
      //.assert.attributeContains(nConcat.chevron(currentSection.commentsPosted), 'class', 'glyphicon-chevron-up',
      //'Unique Visitors percentile is positive')
      //.assert.containsText(nConcat.percentile(currentSection.commentsPosted), '38%',
      //'Unique Visitors is at "38%"')
      //
      //.assert.containsText(nConcat.dataComponent(currentSection.subscriptions), '100%',
      //'Scroll Depth contains "100%"')
      //.assert.attributeContains(nConcat.chevron(currentSection.subscriptions), 'class', 'glyphicon-chevron-up',
      //'Unique Visitors percentile is positive')
      //.assert.containsText(nConcat.percentile(currentSection.subscriptions), '38%',
      //'Unique Visitors is at "38%"')
  },

  'Check Referrers Section' : function (browser) {

  },

  'Check Who Section' : function (browser) {

  },

  'Check Where Section' : function (browser) {

  },

  'Check How Section' : function (browser) {

  },

  after : function (browser) {
    browser.end();
    console.log("===================================\n" +
      ">> Ending article-known-comparison.js\n" +
      "===================================")
  }

};
