var articlePage = require('../pages/article-page.js');

var lanternArticleUrl = 'http://localhost:3000/articles/dd2420be-027d-11e4-91ac-00144feab7de';
var lanternArticleTitle = 'Lantern - Googles removal of BBC article raises censorship fears';
var lanternArticleLink = 'http://www.ft.com/cms/s/0/dd2420be-027d-11e4-91ac-00144feab7de.html';

module.exports = {

  'Initiate Test': function (browser) {
    console.log("===================================\n" +
      ">> Starting article-view-comparison.js\n" +
      "===================================");

    browser
      .url(lanternArticleUrl)
      .assert.title(lanternArticleTitle)
  },

  'Assert elements in Modifiers Section' : function (browser) {
    assertElementsInSection(browser, 'sectionModifier');
  },

  'Assert elements in Header Section' : function (browser) {
    var sectionHeaderTitle = articlePage.sectionHeader.articleTitle.selectors;
    assertElementsInSection(browser, 'sectionHeader');
    browser.assert.attributeContains(sectionHeaderTitle.container, 'href', lanternArticleLink,
      'href for article title is correct')
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


  'Set Date Range to known quantity' : function (browser) {
    browser
  },

  'Compare Time on Page and Page Views to known quantities' : function (browser) {
    browser
  },

  after : function(browser) {
    browser.end();
    console.log("===================================\n" +
      ">> Ending article-view-comparison.js\n" +
      "===================================")
  }

};

function assertElementsInSection (browser, sectionHeading) {
  var section = articlePage[sectionHeading];

  for (var key in section){
    if(section.hasOwnProperty(key)) {
      var value = section[key];
      browser
        .assert.elementPresent(value.selectors.container.concat(value.selectors.dataComponent),
        '"' + value.name + '" element located')
        .assert.containsText(value.selectors.container.concat(value.selectors.heading), value.name,
        '"' + value.name + '" title found')
    }
  }
}
