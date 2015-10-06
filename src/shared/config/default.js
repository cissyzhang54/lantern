let port = (process.env.PORT || '3000');

let config = {
  port: port,
  baseUrl: 'http://localhost:' + port,
  jsUrl: "//localhost:8082",
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
    'article:modifier:comparator' : true,
    'article:modifier:filters' : true,
    'article:modifier:DateRange' : true,
  }
};

if (process.env.BROWSER){ //client side
    config.baseUrl = '//' + location.host;
}

export default config;
