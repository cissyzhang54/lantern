var articlePage = require('../pages/article-page.js');
var nConcat = require ('../utils/nightwatch-concat.js');

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
    assertElementsInSection(browser, 'sectionModifier');
  },

  'Assert elements in Header Section' : function (browser) {
    assertElementsInSection(browser, 'sectionHeader');

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
    assertElementsInSection(browser, 'sectionHeadline');
  },

  'Assert elements in When Section' : function (browser) {
    assertElementsInSection(browser, 'sectionWhen');
  },

  'Assert elements in Next Section' : function (browser) {
    assertElementsInSection(browser, 'sectionNext');
  },

  'Assert elements in Interactive Stats Section' : function (browser) {
    // TODO:  link category and social network in interactive stats section needs to be finished by data team
    assertElementsInSection(browser, 'sectionInteractive');
  },

  'Assert elements in Referrers Section' : function (browser) {
    assertElementsInSection(browser, 'sectionReferrers');
  },

  'Assert elements in Who Section' : function (browser) {
    assertElementsInSection(browser, 'sectionWho');
  },

  'Assert elements in Where Section' : function (browser) {
    assertElementsInSection(browser, 'sectionWhere');
  },

  'Assert elements in How Section' : function (browser) {
    assertElementsInSection(browser, 'sectionHow');
  },

  after : function (browser) {
    browser.end();
    console.log("===================================\n" +
      ">> Ending article-element-confirm.js\n" +
      "===================================")
  }

};

function assertElementsInSection (browser, sectionHeading) {
  var section = articlePage[sectionHeading];

  for (var key in section){
    if(section.hasOwnProperty(key)) {
      var value = section[key];
      browser
        .assert.elementPresent(nConcat.dataComponent(value),
          '"' + value.name + '" element located')
        .assert.containsText(nConcat.heading(value), value.name,
        '"' + value.name + '" title found')
    }
  }
}
