var searchPage = require('../pages/search-page.js');

module.exports = {

  // TODO: include new relic stuff

  'Initiate Test': function (browser) {
    console.log("===================================\n" +
      ">> Starting article-find.js\n" +
      "===================================");

    browser
      .url(searchPage.lanternUrl)
      .assert.title(searchPage.lanternTitle)
  },

  'Check Elements - home link & search bar' : function (browser) {
    browser
      .assert.visible(searchPage.lanternHome, 'Lantern icon visible')
      .assert.visible(searchPage.searchBar, 'Lantern search bar visible')
  },

  'Find Article' : function (browser) {
    browser
      .setValue(searchPage.searchBar, "Team VIP wins FT MBA Challenge of 2015")
      .expect.element(searchPage.exampleArticleLink).visible.after(10000);
    browser
      .click(searchPage.exampleArticleLink);
  },

  'Assert Article Page' : function (browser) {
    browser
      .expect.element(searchPage.exampleExternalArticleLink).visible.after(20000);

    browser
      .assert.title('Lantern - Team VIP wins FT MBA Challenge of 2015')
  },

  after : function (browser) {
    browser.end();
    console.log("===================================\n" +
      ">> Ending article-find.js\n" +
      "===================================")
  }

};
