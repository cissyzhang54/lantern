var cookieRW = require ("../utils/nightwatch-cookies.js");

var googleUrl = 'https://accounts.google.com/login#identifier';
var googleTitle = 'Sign in - Google Accounts';

var googleUser = process.env.GOOGLE_AUTOMATION2_USER;
var googlePass = process.env.GOOGLE_AUTOMATION2_PASS;

module.exports = {

  'Initiate Test': function (browser) {
    console.log("===================================\n" +
      ">> Starting -google-login.js\n" +
      "===================================");
    browser
      .deleteCookies()
      .url(googleUrl)
      .assert.title(googleTitle)
  },

  'Apply Username to Google': function (browser) {
    browser
      .setValue('[id=Email]', googleUser)
      .click('[id=next]')
  },

  'Wait for Password Field': function (browser) {
    browser
      .expect.element('[id=Passwd]').visible.after(10000)
  },

  'Apply Password to Google': function (browser) {
    browser
      .setValue('[id=Passwd]', googlePass)
      .click('[id=signIn]')
  },

  'Confirm Google Login': function (browser) {
    browser
      .expect.element('#view_container').visible.before(20000);
    browser
      .assert.title('My Account');
    browser.refresh()
  },

  'Check for Request for Permission, then allow offline access' : function (browser) {
    if(browser.title == 'Request for Permission') {
      browser.click('[id=submit_approve_access]')
    }
  },

  after : function(browser) {
    cookieRW.writeCookies(browser, 0);
    browser.end();
    console.log("===================================\n" +
      ">> Ending -google-login.js\n" +
      "===================================")
  }

};
