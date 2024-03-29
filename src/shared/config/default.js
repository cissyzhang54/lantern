let port = (process.env.PORT || '3000');

let config = {
  port: port,
  baseUrl: 'http://localhost:' + port,
  jsUrl: "//localhost:8082",
  gaTrackingID: 'UA-60698836-4',
  garbageCollectionInterval: 60000,
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
    'articleLive:interact': false,
    'articleLive:socialMedia': true,
    'articleLive:trafficSources': true,
    'articleLive:realtimeNext': true,
    'articleLive:userType': true,
    'section:who' : true,
    'section:where' : true,
    'section:topics' : false,
    'topic:who' : true,
    'topic:where' : true,
    'highlights:timeOnPage': true,
    'highlights:retention': true,
    'highlights:commented': false,
    'highlights:pageViews': true,
    'highlights:socialMedia': true,
    'highlights:searchEngines': true,
    'sectionWhoUsers' : true,
    'sectionWhoEngagementGroups' : false
  }
};

if (process.env.BROWSER){ //client side
    config.baseUrl = '//' + location.host;
}

export default config;
