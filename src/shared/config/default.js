let port = (process.env.PORT || '3000');

let config = {
  port: port,
  baseUrl: 'http://localhost:' + port,
  jsUrl: "//localhost:8082",
  gaTrackingID: 'UA-60698836-4',
  newrelic: false,
  features : {
    'home:recentArticles' : true,
    'article:scrollDepth' : true,
    'article:timeOnPage' : true,
    'article:pageViews' : true,
    'article:socialUsers' : true,
    'article:uniqueVisitors' : true,
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
    'article:total_links_clicked' : true,
    'article:comments_posted_total' : true,
    'article:comments_viewed_total' : true,
    'article:modifier:DateRange' : true,
    'section:who' : true,
    'section:where' : true,
    'topic:who' : true,
    'topic:where' : true
  }
};

if (process.env.BROWSER){ //client side
    config.baseUrl = '//' + location.host;
}

export default config;
