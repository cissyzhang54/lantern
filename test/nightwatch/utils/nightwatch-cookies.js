var fs = require('fs');

var cookieLocation = "./test/nightwatch/cookie-info.txt";

var maxRefreshTimes=5;
var cookiesToFind= 16;
var funcs = [];

module.exports = {

  writeCookies : writeCookies,
  loadGoogleCookies : loadGoogleCookies

};

function writeCookies (browser, numberOfTries) {
  browser
    .getCookies(function (result) {
      if(result.value.length < cookiesToFind) {
        console.log(">> Found " + result.value.length + " cookies. Expected " + cookiesToFind + ".");
        browser.refresh();
        if(numberOfTries < maxRefreshTimes) {
          console.log(">> Retry number " + (++numberOfTries) + " of " + maxRefreshTimes + ". If this fails, change 'cookiesToFind' in 'nightwatch-cookies.js'.");
          writeCookies(browser, numberOfTries++)
        }
      }
      var resultData = JSON.stringify(result);
      fs.writeFileSync(cookieLocation, resultData)
    })
}

function loadGoogleCookies (browser) {
  browser.url('https://accounts.google.com/login#identifier')
    .assert.title('Sign in - Google Accounts');
  var cookies = fs.readFileSync(cookieLocation, 'utf8');
  runCookieSeparator(browser, cookies)
}

function runCookieSeparator (browser, cookies) {
  var array = JSON.parse(cookies).value;

  for (var i=0; i < array.length; i++) {
    funcs[i] = doSetCookieLoop(browser, array, i)
  }
}

function doSetCookieLoop (browser, array, i){
  browser.setCookie(array[i])
}
