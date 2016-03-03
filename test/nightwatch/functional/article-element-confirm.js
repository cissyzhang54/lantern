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
      .assert.containsText(nConcat.dataComponent(articlePage.sectionHeader.articleTitle), "‘I wore a top hat while sleeping rough, then set up a top-hat business’",
      "‘I wore a top hat while sleeping rough, then set up a top-hat business’")
      .assert.containsText(nConcat.dataComponent(articlePage.sectionHeader.articleAuthor), 'Jeremy Taylor',
      'Article author is "Jeremy Taylor"')
      .assert.containsText(nConcat.dataComponent(articlePage.sectionHeader.articlePublished), 'February 26, 2016 11:22 am',
      'Article was published "February 26, 2016 11:22 am"')
  },

  'Assert elements in Headline Stats Section' : function (browser) {
    // TODO: word count needs to be finished by data team
    nExtras.assertElementsInSection(browser, articlePage.sectionHeadline);
  },

  'Assert elements in When Section' : function (browser) {
    nExtras.assertElementsInSection(browser, articlePage.sectionWhen);
  },

  'Assert elements in Interactive Stats Section' : function (browser) {
    // TODO:  link category and social network in interactive stats section needs to be finished by data team
    nExtras.assertElementsInSection(browser, articlePage.sectionInteractive);
  },

  'Assert elements in Social Section' : function (browser) {
    nExtras.assertElementsInSection(browser, articlePage.sectionSocial);
  },

  'Assert elements in Journey Section' : function (browser) {
    nExtras.assertElementsInSection(browser, articlePage.sectionJourney);
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
