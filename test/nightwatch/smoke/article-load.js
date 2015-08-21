var cookieRW = require ("../utils/nightwatch-cookies.js");
var searchPage = require('../pages/search-page.js');

var lanternUrl = 'http://lantern.ft.com/';
var lanternTitle = 'Lantern - Search';

module.exports = {

  'Initiate Test': function (browser) {
    console.log("===================================\n" +
      ">> Starting article-load.js\n" +
      "===================================");

    cookieRW.loadGoogleCookies(browser);

    browser
      .url(lanternUrl)
      .assert.title(lanternTitle)
  },

  'Check Elements - home link & search bar' : function (browser) {
    browser
      .assert.visible(searchPage.lanternHome)
      .assert.visible(searchPage.searchBar)
  },

  'Find Article' : function (browser) {
    browser
      .setValue(searchPage.searchBar, "Google’s removal of BBC article raises censorship fears")
      .expect.element(searchPage.exampleArticleLink).visible.after(5000);
    browser
      .click(searchPage.exampleArticleLink);
  },

  'Assert Article Page' : function (browser) {
    browser
      .expect.element(searchPage.exampleExternalArticleLink).visible.after(5000);

    browser
      .assert.title('Lantern - Googles removal of BBC article raises censorship fears')
  },

  after : function(browser) {
    browser.end();
    console.log("===================================\n" +
      ">> Ending article-load.js\n" +
      "===================================")
  }

};
