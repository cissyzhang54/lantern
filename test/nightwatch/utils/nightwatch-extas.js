var nConcat = require('./nightwatch-concat.js');

module.exports = {

  assertElementsInSection : assertElementsInSection,
  doComparator : doComparator

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

function doComparator(browser, section, figure, percentile){
  var chevron;
  var posNeg;
  var cleanPercentile;
  if (percentile[0] == '-'){
    chevron = 'glyphicon-chevron-down';
    cleanPercentile = percentile.substring(1);
    posNeg = 'negative'
  } else {
    chevron = 'glyphicon-chevron-up';
    cleanPercentile = percentile;
    posNeg = 'positive'
  }

  browser
    .assert.containsText(nConcat.dataComponent(section), figure,
      section.name + ' contains ' + figure)
    .assert.containsText(nConcat.percentile(section), cleanPercentile,
      section.name + ' is at ' + cleanPercentile, '%')
    .assert.attributeContains(nConcat.chevron(section), 'class', determineChevron(percentile),
      section.name + ' percentile is ' + posNeg)
}

function doComparatorNextSection(browser, section, , url)

function determineChevron(percentile){
  if (percentile >= 0) return 'glyphicon-chevron-up';
  else return 'glyphicon-chevron-down'
}
