
module.exports = {

  // Modifier Section
  sectionModifier: {
    tags: {
      name: 'Tags',
      selectors: {
        container: 'div[data-component="sectionModifier"] > div[class="row"]:nth-child(1)',
        dataComponent: ' div[data-component="tags"]',
        heading: ' > div > span'
      }
    },
    filters: {
      name: 'Filters',
      selectors: {
        container: 'div[data-component="sectionModifier"] > div[class="row"]:nth-child(2)',
        dataComponent: ' div[data-component="filters"]',
        heading: ' > div > span'
      }
    },
    dateRange: {
      name: 'Date Range',
      selectors: {
        container: 'div[data-component="sectionModifier"] > div[class="row"]:nth-child(3)',
        dataComponent: ' div[data-component="dateRange"]',
        heading: ' > div > span'
      }
    }
  },

  // Header Section
  sectionHeader: {
    articleTitle: {
      name: 'Googles removal of BBC article raises censorship fears',
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
        heading: ' > h3'
      }
    },
    pageViews: {
      name: 'Page Views',
      selectors: {
        container: 'div[data-component="sectionHeadlineStats"] div:nth-child(2) > div[class="singleMetric"]',
        dataComponent: ' > p',
        heading: ' > h3'
      }
    },
    uniqueVisitors: {
      name: 'Unique Visitors',
      selectors: {
        container: 'div[data-component="sectionHeadlineStats"] div:nth-child(3) > div[class="singleMetric"]',
        dataComponent: ' > p',
        heading: ' > h3'
      }
    },
    socialUsers: {
      name: 'Social Users',
      selectors: {
        container: 'div[data-component="sectionHeadlineStats"] div:nth-child(4) > div[class="singleMetric"]',
        dataComponent: ' > p',
        heading: ' > h3'
      }
    },
    scrollDepth: {
      name: 'Scroll Depth',
      selectors: {
        container: 'div[data-component="sectionHeadlineStats"] div:nth-child(5) > div[class="singleMetric"]',
        dataComponent: ' > p',
        heading: ' > h3'
      }
    }
  },

  // When Section
  sectionWhen: {
    accessTime: {
      name: 'When did users access the article?',
      selectors: {
        container: 'div[data-component="sectionWhen"]',
        dataComponent: ' div[data-component="lineChart"]',
        heading: ' h4 > span:nth-child(2)'
      }
    }
  },

  // Next Section
  sectionNext: {
    bounceRate: {
      name: 'Bounce-Rate',
      selectors: {
        container: 'div[data-component="sectionNext"] div[class="col-sm-6 col-xs-12"]:nth-child(1)',
        dataComponent: ' div[data-component="barChart"]',
        heading: ' h5'
      }
    },
    exitPage: {
      name: 'where did they go?',
      selectors: {
        container: 'div[data-component="sectionNext"] div[class="col-sm-6 col-xs-12"]:nth-child(2)',
        dataComponent: ' table[data-component="table"]',
        heading: ' h5'
      }
    }
  },


  // Interactive Stats Section
  sectionInteractive: {
    linksClicked: {
      name: 'Links Clicked',
      selectors: {
        container: 'div[data-component="sectionInteractiveStats"] div:nth-child(2) > div:nth-child(1) > div[class="singleMetric"]',
        dataComponent: ' span:nth-child(1)',
        heading: ' h3'
      }
    },
    socialShares: {
      name: 'Social Shares',
      selectors: {
        container: 'div[data-component="sectionInteractiveStats"] div:nth-child(2) > div:nth-child(2) > div[class="singleMetric"]',
        dataComponent: ' span:nth-child(1)',
        heading: ' h3'
      }
    },
    commentsViewed: {
      name: 'Comments Viewed',
      selectors: {
        container: 'div[data-component="sectionInteractiveStats"] div:nth-child(3) > div:nth-child(1) > div[class="singleMetric"]',
        dataComponent: ' span:nth-child(1)',
        heading: ' h3'
      }
    },
    commentsPosted: {
      name: 'Comments Posted',
      selectors: {
        container: 'div[data-component="sectionInteractiveStats"] div:nth-child(3) > div:nth-child(2) > div[class="singleMetric"]',
        dataComponent: ' span:nth-child(1)',
        heading: ' h3'
      }
    },
    subscriptions: {
      name: 'Subscriptions',
      selectors: {
        container: 'div[data-component="sectionInteractiveStats"] div:nth-child(3) > div:nth-child(3) > div[class="singleMetric"]',
        dataComponent: ' span:nth-child(1)',
        heading: ' h3'
      }
    },
    linkCategory: {
      name: 'Link Category',
      selectors: {
        container: 'div[data-component="sectionInteractiveStats"] div:nth-child(1) > table[data-component="table"]',
        dataComponent: ' tbody',
        heading: ' tr'
      }
    },
    socialNetwork: {
      name: 'Social Network',
      selectors: {
        container: 'div[data-component="sectionInteractiveStats"] div:nth-child(3) > table[data-component="table"]',
        dataComponent: ' tbody',
        heading: ' tr'
      }
    }
  },

// Referrers Section
  sectionReferrers: {
    referrerTypes: {
      name: 'Referrer Types',
      selectors: {
        container: 'div[data-component="sectionReferrers"] > div:nth-child(3) > div:nth-child(1)',
        dataComponent: ' > div[data-component="barChart"]:nth-child(2)',
        heading: ' > h6:nth-child(1)'
      }
    },
    socialNetworks: {
      name: 'Social Networks',
      selectors: {
        container: 'div[data-component="sectionReferrers"] > div:nth-child(3) > div:nth-child(1)',
        dataComponent: ' > div[data-component="barChart"]:nth-child(4)',
        heading: ' > h6:nth-child(3)'
      }
    },
    topUrls: {
      name: 'Top URLs',
      selectors: {
        container: 'div[data-component="sectionReferrers"] > div:nth-child(3) > div:nth-child(2)',
        dataComponent: ' table[data-component="table"]',
        heading: ' > h6'
      }
    },
    internalReferrerTypes: {
      name: 'Internal Referrer Types',
      selectors: {
        container: 'div[data-component="sectionReferrers"] > div:nth-child(5) > div:nth-child(1)',
        dataComponent: ' div[data-component="barChart"]',
        heading: ' > h6'
      }
    },
    topInternalUrls: {
      name: 'Top Internal URLs',
      selectors: {
        container: 'div[data-component="sectionReferrers"] > div:nth-child(5) > div:nth-child(2)',
        dataComponent: ' table[data-component="table"]',
        heading: ' > h6'
      }
    }
  },

// Who Section
  sectionWho: {
    cohort: {
      name: 'Cohort',
      selectors: {
        container: 'div[data-component="sectionWho"] > div:nth-child(2) > div:nth-child(1)',
        dataComponent: ' div[data-component="columnChart"]',
        heading: ' > h5'
      }
    },
    newVsReturning: {
      name: 'New vs Returning',
      selectors: {
        container: 'div[data-component="sectionWho"] > div:nth-child(2) > div:nth-child(2)',
        dataComponent: ' div[data-component="columnChart"]',
        heading: ' > h5'
      }
    },
    rfvClusters: {
      name: 'RFV Clusters',
      selectors: {
        container: 'div[data-component="sectionWho"] > div:nth-child(3) > div:nth-child(1)',
        dataComponent: ' div[data-component="columnChart"]',
        heading: ' > h5'
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
        heading: ' > div:nth-child(2) h5'
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
        heading: ' > h5'
      }
    },
    channelsPie: {
      name: 'Channels',
      selectors: {
        container: 'div[data-component="sectionHow"] > div:nth-child(2) > div:nth-child(2)',
        dataComponent: ' div[data-component="pieChart"]',
        heading: ' > h5'
      }
    }
  }
};
