let port = (process.env.PORT || '3000');

let config = {
  port: port,
  baseUrl: 'http://localhost:' + port,
  jsUrl: "//localhost:8082",
  gaTrackingID: 'UA-60698836-4',
  features : {
    'home:recentArticles' : true,
    'article:wordCount' : true,
    'article:imageCount' : true,
    'article:bodyLinksCount' : true,
    'article:timeOnPage' : true,
    'article:pageViews' : true,
    'article:socialUsers' : true,
    'article:readTimes' : false,
    'article:timeSincePublished' : true,
    'article:devices' : true,
    'article:channels' : true,
    'article:referrers' : true,
    'article:referrers:internalRefTypes' : true,
    'article:locations' : true,
    'article:bounceRate' : true,
    'article:who' : true,
    'article:where' : true,
    'article:interact' : false,
    'article:subscription' : true,
    'article:social_shares' : true,
    'article:modifier:filters:UserCohort' : true,
    'article:modifier:filters:Referrers' : true,
    'article:modifier:filters:Region' : true,
    'article:modifier:filters:Device' : true,
    'article:modifier:DateRange' : true,
  }
};

if (process.env.BROWSER){ //client side
    config.baseUrl = '//' + location.host;
}

export default config;
