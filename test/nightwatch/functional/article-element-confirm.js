var articlePage = require('../pages/article-page.js');
var nConcat = require ('../utils/nightwatch-concat.js');
var nExtras = require ('../utils/nightwatch-extas.js');

module.exports = {

  'Initiate Test': function (browser) {
    console.log("===================================\n" +
      ">> Starting article-element-confirm.js\n" +
      "===================================");

    browser
      .url(articlePage.exampleArticleUrl)
      .assert.title(articlePage.exampleArticleTitle)
  },

  // TODO: Assert info tags on each element

  'Assert elements in Modifiers Section' : function (browser) {
    nExtras.assertElementsInSection(browser, articlePage.sectionModifier);
  },

  'Assert elements in Header Section' : function (browser) {
    nExtras.assertElementsInSection(browser, articlePage.sectionHeader);

    currentSection = articlePage.sectionHeader;

    browser
      .assert.attributeContains(nConcat.dataComponent(articlePage.sectionHeader.articleTitle), 'href', articlePage.exampleArticleLink,
      'href for article title is correct')
      .assert.containsText(nConcat.dataComponent(articlePage.sectionHeader.articleTitle), 'First general strike since Syriza win brings Greece to standstill',
      'Article title is "First general strike since Syriza win brings Greece to standstill"')
      .assert.containsText(nConcat.dataComponent(articlePage.sectionHeader.articleAuthor), 'Kerin Hope',
      'Article author is "Kerin Hope"')
      .assert.containsText(nConcat.dataComponent(articlePage.sectionHeader.articlePublished), 'November 12, 2015 1:39 pm',
      'Article was published "November 12, 2015 1:39 pm"')
  },

  'Assert elements in Headline Stats Section' : function (browser) {
    // TODO: word count needs to be finished by data team
    nExtras.assertElementsInSection(browser, articlePage.sectionHeadline);
  },

  'Assert elements in When Section' : function (browser) {
    nExtras.assertElementsInSection(browser, articlePage.sectionWhen);
  },

  'Assert elements in Next Section' : function (browser) {
    nExtras.assertElementsInSection(browser, articlePage.sectionNext);
  },

  'Assert elements in Interactive Stats Section' : function (browser) {
    // TODO:  link category and social network in interactive stats section needs to be finished by data team
    nExtras.assertElementsInSection(browser, articlePage.sectionInteractive);
  },

  'Assert elements in Referrers Section' : function (browser) {
    nExtras.assertElementsInSection(browser, articlePage.sectionReferrers);
  },

  'Assert elements in Who Section' : function (browser) {
    nExtras.assertElementsInSection(browser, articlePage.sectionWho);
  },

  'Assert elements in Where Section' : function (browser) {
    nExtras.assertElementsInSection(browser, articlePage.sectionWhere);
  },

  'Assert elements in How Section' : function (browser) {
    nExtras.assertElementsInSection(browser, articlePage.sectionHow);
  },

  after : function (browser) {
    browser.end();
    console.log("===================================\n" +
      ">> Ending article-element-confirm.js\n" +
      "===================================")
  }

};