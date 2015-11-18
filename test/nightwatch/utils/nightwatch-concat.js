
module.exports = {

  dataComponent : dataComponent,
  heading : heading,
  chevron : chevron,
  percentile : percentile

};

function dataComponent (jsonName){
  return jsonName.selectors.container.concat(jsonName.selectors.dataComponent);
}

function heading (jsonName){
  return jsonName.selectors.container.concat(jsonName.selectors.heading);
}

function chevron (jsonName){
  return jsonName.selectors.container.concat(jsonName.selectors.chevron);
}

function percentile (jsonName){
  return jsonName.selectors.container.concat(jsonName.selectors.percentile);
}
