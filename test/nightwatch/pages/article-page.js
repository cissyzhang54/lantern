
module.exports = {

  // Links
  exampleArticleUrl : 'http://localhost:' + process.env.PORT + '/articles/ff767034-da82-11e5-98fd-06d75973fe09/48',
  exampleArticleTitle: "Lantern - ‘I wore a top hat while sleeping rough, then set up a top-hat business’",
  exampleArticleLink: 'http://www.ft.com/cms/s/0/ff767034-da82-11e5-98fd-06d75973fe09.html',

  // Modifier Section
  sectionModifier: {
    dateRange: {
      name: 'Timespan',
      selectors: {
        container: 'div[data-component="sectionModifier"] > div[class="row"]:nth-child(1)',
        dataComponent: ' div[data-component="dateRange"]',
        heading: ' > div > span'
      }
    },
    timespan: {
      name: 'Timespan',
      selectors: {
        container: 'div[data-component="sectionModifier"] > div[class="row"]:nth-child(1)',
        dataComponent: ' ol[data-component="timespanSelector"]',
        heading: ' > div > span'
      }
    },
    tags: {
      name: 'Compare with',
      selectors: {
        container: 'div[data-component="sectionModifier"] > div[class="row"]:nth-child(2)',
        dataComponent: ' div[data-component="tags"]',
        heading: ' > div > span'
      }
    },
    filters: {
      name: 'Filters',
      selectors: {
        container: 'div[data-component="sectionModifier"] > div[class="row"]:nth-child(3)',
        dataComponent: ' div[data-component="filters"]',
        heading: ' > div > span'
      }
    }
  },

  // Header Section
  sectionHeader: {
    articleTitle: {
      name: '',
      selectors: {
        container: 'header a[href]',
        dataComponent: '',
        heading: ''
      }
    },
    articleAuthor: {
      name: 'By',
      selectors: {
        container: 'header p:nth-child(2)',
        dataComponent: '',
        heading: ''
      }
    },
    articlePublished: {
      name: 'Published',
      selectors: {
        container: 'header p[style][class]',
        dataComponent: '',
        heading: ''
      }
    }
  },

  // Headline Stats Section
  sectionHeadline: {
    timeOnPage: {
      name: 'Time on Page',
      selectors: {
        container: 'div[data-component="sectionHeadlineStats"] div:nth-child(1) > div[class="singleMetric"]',
        dataComponent: ' > p',
        heading: ' > h3',
        chevron: ' span[style]:nth-child(1)',
        percentile: ' span[style]:nth-child(2)'
      }
    },
    pageViews: {
      name: 'Page Views',
      selectors: {
        container: 'div[data-component="sectionHeadlineStats"] div:nth-child(2) > div[class="singleMetric"]',
        dataComponent: ' > p',
        heading: ' > h3',
        chevron: ' span[style]:nth-child(1)',
        percentile: ' span[style]:nth-child(2)'
      }
    },
    uniqueVisitors: {
      name: 'Unique Visitors',
      selectors: {
        container: 'div[data-component="sectionHeadlineStats"] div:nth-child(3) > div[class="singleMetric"]',
        dataComponent: ' > p',
        heading: ' > h3',
        chevron: ' span[style]:nth-child(1)',
        percentile: ' span[style]:nth-child(2)'
      }
    },
    retentionRate: {
      name: 'Retention Rate',
      selectors: {
        container: 'div[data-component="sectionHeadlineStats"] div:nth-child(4) > div[class="singleMetric"]',
        dataComponent: ' > p',
        heading: ' > h3',
        chevron: ' span[style]:nth-child(1)',
        percentile: ' span[style]:nth-child(2)'
      }
    },
    scrollDepth: {
      name: 'Scroll Depth',
      selectors: {
        container: 'div[data-component="sectionHeadlineStats"] div:nth-child(5) > div[class="singleMetric"]',
        dataComponent: ' > p',
        heading: ' > h3',
        chevron: ' span[style]:nth-child(1)',
        percentile: ' span[style]:nth-child(2)'
      }
    }
  },

  // When Section
  sectionWhen: {
    accessTime: {
      name: 'When did the users view the story?',
      selectors: {
        container: 'div[data-component="sectionWhen"]',
        dataComponent: ' div[data-component="lineChart"]',
        heading: ' h3 > span:nth-child(2)'
      }
    }
  },

  // Interactive Stats Section
  sectionInteractive: {
    linksClicked: {
      name: 'Links Clicked',
      selectors: {
        container: 'div[data-component="sectionInteractiveStats"] div:nth-child(2) > div:nth-child(1) > ul > li > div[class="singleMetric"]',
        dataComponent: ' span:nth-child(1)',
        heading: ' h3',
        chevron: ' span[style]:nth-child(1)',
        percentile: ' span[style]:nth-child(2)'
      }
    },
    commentsPosted: {
      name: 'Total comments posted',
      selectors: {
        container: 'div[data-component="sectionInteractiveStats"] div:nth-child(2) > div:nth-child(2) > ul > li:nth-child(1) > div[class="singleMetric"]',
        dataComponent: ' span:nth-child(1)',
        heading: ' h3',
        chevron: ' span[style]:nth-child(1)',
        percentile: ' span[style]:nth-child(2)'
      }
    },
    subscriptions: {
      name: 'Total Subscriptions',
      selectors: {
        container: 'div[data-component="sectionInteractiveStats"] div:nth-child(2) > div:nth-child(3) > ul > li:nth-child(1) > div[class="singleMetric"]',
        dataComponent: ' span:nth-child(1)',
        heading: ' h3',
        chevron: ' span[style]:nth-child(1)',
        percentile: ' span[style]:nth-child(2)'
      }
    }
  },

  // Social Section
  sectionSocial: {
    socialNetworks:{
      name: 'Social Networks',
      selectors: {
        container: 'div[data-component="sectionSocial"] > div:nth-child(2) > div:nth-child(1)',
        dataComponent: ' div[data-component="barChart"]',
        heading: ' h5'
      }
    },
    trafficSocial:{
      name: 'Total traffic from social',
      selectors: {
        container: 'div[data-component="sectionSocial"] > div:nth-child(2) > div:nth-child(2)',
        dataComponent: ' dl[class="metric-list"]',
        heading: ' dt:nth-child(1)'
      }
    }


  },

  // Referrers Section
  sectionJourney: {
    /*referrerTypes: {
      name: 'Internal vs External',
      selectors: {
        container: 'div[data-component="sectionJourney"] > div:nth-child(3) > div:nth-child(1)',
        dataComponent: ' > div[data-component="barChart"]:nth-child(2)',
        heading: ' > h5:nth-child(1)'
      }
    },*/
    internalReferrerTypes: {
      name: 'Referrers',
      selectors: {
        container: 'div[data-component="sectionJourney"] > div:nth-child(3) > div:nth-child(2)',
        dataComponent: ' div[data-component="barChart"]',
        heading: ' > h5'
      }
    },
    topExternalUrls: {
      name: 'Top 5 internal sources',
      selectors: {
        container: 'div[data-component="sectionJourney"] > div:nth-child(5) > div:nth-child(1)',
        dataComponent: ' table[data-component="table"]',
        heading: ' > h5'
      }
    },
    topInternalUrls: {
      name: 'Top 5 external sources',
      selectors: {
        container: 'div[data-component="sectionJourney"] > div:nth-child(5) > div:nth-child(2)',
        dataComponent: ' table[data-component="table"]',
        heading: ' > h5'
      }
    }
  },

// Who Section
  sectionWho: {
    cohort: {
      name: 'User Type',
      selectors: {
        container: 'div[data-component="sectionWho"] > div:nth-child(2) > div:nth-child(1)',
        dataComponent: ' div[data-component="columnChart"]',
        heading: ' > h4'
      }
    },
    newVsReturning: {
      name: 'New vs Returning',
      selectors: {
        container: 'div[data-component="sectionWho"] > div:nth-child(2) > div:nth-child(2)',
        dataComponent: ' div[data-component="columnChart"]',
        heading: ' > h4'
      }
    },
    rfvClusters: {
      name: 'Engagement Groups',
      selectors: {
        container: 'div[data-component="sectionWho"] > div:nth-child(4) > div:nth-child(1)',
        dataComponent: ' div[data-component="columnChart"]',
        heading: ' > h4'
      }
    }
  },

// Where Section
  sectionWhere: {
    globalReach: {
      name: 'Globally',
      selectors: {
        container: 'div[data-component="sectionWhere"]',
        dataComponent: ' div[data-component="barChart"]',
        heading: ' > div:nth-child(2) h4'
      }
    },
    globalMap: {
      name: '',
      selectors: {
        container: 'div[data-component="sectionWhere"]',
        dataComponent: ' div[data-component="map"]',
        heading: ''
      }
    }
  },

// How Section
  sectionHow: {
    devicesPie: {
      name: 'Devices',
      selectors: {
        container: 'div[data-component="sectionHow"] > div:nth-child(2) > div:nth-child(1)',
        dataComponent: ' div[data-component="pieChart"]',
        heading: ' > h4'
      }
    },
    channelsPie: {
      name: 'Channels',
      selectors: {
        container: 'div[data-component="sectionHow"] > div:nth-child(2) > div:nth-child(2)',
        dataComponent: ' div[data-component="pieChart"]',
        heading: ' > h4'
      }
    }
  }
};
