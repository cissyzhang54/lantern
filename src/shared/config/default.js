let port = (process.env.PORT || '3000');

let config = {
  port: port,
  baseUrl: 'http://localhost:' + port,
  jsUrl: "//localhost:8081",
  gaTrackingID: 'UA-60698836-4',
  features : {
    'home:recentArticles' : true,
    'article:title' : true,
    'article:wordCount' : true,
    'article:imageCount' : true,
    'article:bodyLinksCount' : true,
    'article:timeOnPage' : true,
    'article:pageViews' : true,
    'article:socialReaders' : true,
    'article:readTimes' : true,
    'article:devices' : true,
    'article:channels' : true,
    'article:referrers' : true,
    'article:modifier' : true,
    'article:modifier:comparator' : true,
    'article:modifier:filters' : true,
    'article:modifier:DateRange' : true,
    'playground:header' : true,
    'playground:logo' : true,
    'playground:search' : true,
    'playground:singlemetric' : true,
    'playground:modifier' : true,
    'playground:modifier:comparator' : true,
    'playground:modifier:filters' : true,
    'playground:modifier:DateRange' : true,
    'playground:piechart' : true,
    'playground:linechart' : true,
    'playground:barchart' : true,
    'playground:columnchart' : true,
    'playground:map' : true
  }
};

if (process.env.BROWSER){ //client side
    config.baseUrl = '//' + location.host;
}

export default config;
