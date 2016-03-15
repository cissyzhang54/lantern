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

    var currentSection = articlePage.sectionHeader;

    browser
      .assert.attributeContains(nConcat.dataComponent(articlePage.sectionHeader.articleTitle), 'href', articlePage.exampleArticleLink,
      'href for article title is correct')
      .assert.containsText(nConcat.dataComponent(articlePage.sectionHeader.articleTitle), "Commodity prices signal market bottom",
      "Article title is correct")
      .assert.containsText(nConcat.dataComponent(articlePage.sectionHeader.articleAuthor), 'Neil Hume and David Sheppard',
      'Article author is correct')
      .assert.containsText(nConcat.dataComponent(articlePage.sectionHeader.articlePublished), 'March 4, 2016 10:43 am',
      'Article publish date is correct')
  },

  'Assert elements in Headline Stats Section' : function (browser) {
    // TODO: word count needs to be finished by data team
    nExtras.assertElementsInSection(browser, articlePage.sectionHeadline);
  },

  'Assert elements in Headline Chart Section' : function (browser) {
    nExtras.assertElementsInSection(browser, articlePage.sectionHeadlineChart);
  },

  /*'Assert elements in Interactive Stats Section' : function (browser) {
    // TODO:  link category and social network in interactive stats section needs to be finished by data team
    nExtras.assertElementsInSection(browser, articlePage.sectionInteractive);
    },*/

  'Assert elements in Social Section' : function (browser) {
    nExtras.assertElementsInSection(browser, articlePage.sectionSocial);
  },

  'Assert elements in Journey Section' : function (browser) {
    nExtras.assertElementsInSection(browser, articlePage.sectionJourney);
  },

  'Assert elements in Who Section' : function (browser) {
    nExtras.assertElementsInSection(browser, articlePage.sectionWhoUsers);
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
