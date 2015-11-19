var articlePage = require('../pages/article-page.js');

module.exports = {

  assertElementsInSection : assertElementsInSection

};

function assertElementsInSection (browser, section) {
  for (var key in section) {
    if (section.hasOwnProperty(key)) {
      var value = section[key];
      browser
        .assert.elementPresent(nConcat.dataComponent(value),
          '"' + value.name + '" element located')
        .assert.containsText(nConcat.heading(value), value.name,
        '"' + value.name + '" title found')
    }
  }
}
