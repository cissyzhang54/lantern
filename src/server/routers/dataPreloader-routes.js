/* eslint-env node */
import express from 'express';
import moment from 'moment';
import dataApiUtils from '../../shared/utils/DataAPIUtils';

let router = express.Router();
let apiKey = process.env.LANTERN_API_KEY;
const UUID_REGEX = '[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}';
const COMPTYPE_REGEX = 'topic|section|author|genre|global';

function decode(uri){
  return uri ? decodeURI(uri) : null
}

router.get(`/realtime/articles/:uuid(${UUID_REGEX})`, (req, res, next) => {
  return getArticleRealtimeData(req, res)
    .then(() => next())
    .catch((err) => {
      if (err.status) res.status(err.status);
      next(err);
    });
});

router.get(`/realtime/articles/:uuid(${UUID_REGEX})/:timespan`, (req, res, next) => {
  return getArticleRealtimeData(req, res)
    .then(() => next())
    .catch((err) => {
      if (err.status) res.status(err.status);
      next(err);
    });
});

router.get(`/articles/:uuid(${UUID_REGEX})/:timespan`, (req, res, next) => {
  return getArticleData(req, res)
    .then(() => next())
    .catch((err) => {
      if (err.status) res.status(err.status);
      next(err);
    });
});

router.get(`/articles/:uuid(${UUID_REGEX})/:timespan/:comparatorType(${COMPTYPE_REGEX})/:comparator`, (req, res, next) => {
  return getArticleData(req, res)
    .then(() => next())
    .catch((err) => {
      if (err.status) res.status(err.status);
      next(err);
    });
});

router.get(`/sections/:section/:timespan`, (req, res, next) => {
  return getSectionData(req, res)
    .then(() => next())
    .catch((err) => {
      if (err.status) res.status(err.status);
      next(err);
    });
});

router.get(`/sections/:section/:timespan/:comparatorType(${COMPTYPE_REGEX})/:comparator`, (req, res, next) => {
  return getSectionData(req, res)
    .then(() => next())
    .catch((err) => {
      if (err.status) res.status(err.status);
      next(err);
    });
});

router.get(`/topics/:topic/:timespan`, (req, res, next) => {
  return getTopicData(req, res)
    .then(() => {next()})
    .catch((err) => {
      if (err.status) res.status(err.status);
      next(err);
    });
});

router.get(`/topics/:topic/:timespan/:comparatorType(${COMPTYPE_REGEX})/:comparator`, (req, res, next) => {
  return getTopicData(req, res)
    .then(() => next())
    .catch((err) => {
      if (err.status) res.status(err.status);
      next(err);
    });
});

router.get(`/toparticles`, (req, res, next) => {
  return getTopArticlesData(req, res)
    .then(() => next())
    .catch((err) => {
      if (err.status) res.status(err.status);
      next(err);
    });
});

function getArticleData(req, res){
  let query = {
    uuid: decode(req.params.uuid),
    comparator: decode(req.params.comparator),
    comparatorType: decode(req.params.comparatorType),
    timespan: decode(req.params.timespan)
  }

  let dateFrom;
  let dateTo;

  if(req.params.timespan === 'custom') {
    dateFrom = query.dateFrom = req.query.dateFrom
    dateTo = query.dateTo = req.query.dateTo
  }

  return dataApiUtils.getArticleData(query, apiKey)
    .then((data) => {

      if (req.params.timespan && req.params.timespan !== 'custom') {
        dateTo = moment(data.data.published).add(req.params.timespan, 'hours').toISOString();
      } else if (req.params.timespan !== 'custom'){
        dateFrom = moment(data.data.published).toISOString();
        dateTo = moment().toISOString();
      }

      let getKeys = (item) => item[0];
      res.locals.data = {
        AnalyticsStore: {
          comparatorData: data.comparatorData,
          data: data.data,
          query: {
            uuid: decode(req.params.uuid),
            dateFrom: dateFrom,
            type: 'article',
            dateTo: dateTo,
            filters: {},
            comparator: query.comparator,
            comparatorType: query.comparatorType,
            publishDate: dateFrom,
            timespan: decode(req.params.timespan)
          },
          availableFilters: {
            devices: data.data.devices.map(getKeys),
            regions: data.data.regions.map(getKeys),
            cohort: data.data.userCohort.map(getKeys),
            referrers: data.data.referrerTypes.map(getKeys)
          }
        }
      };
      return res;
    }).catch((error) => {
      res.locals.data = {
        AnalyticsStore : {
          errorMessage : error.message,
          error: error
        }
      }
    })
}

function getArticleRealtimeData(req, res) {
  var query = {
    uuid: decode(req.params.uuid),
    timespan: req.params.timespan || '1h'
  }
  return dataApiUtils.getArticleRealtimeData(query, apiKey)
    .then((data) => {
      let totalPageViews = data.realtimePageViews.reduce((a, b) => { return a + b[1]; }, 0);
      let retentionRate = (data.retentionRate / data.realtimePageViewsShifted) * 100 | 0;      res.locals.data = {
        ArticleRealtimeStore: {
          author: data.author,
          genre: data.genre,
          title: data.title,
          topics: data.topics,
          sections: data.sections,
          published: data.published,
          published_human: data.published_human,
          pageViews: data.realtimePageViews,
          totalPageViews: totalPageViews,
          totalPageViewsShifted: data.realtimePageViewsShifted,
          timeOnPage: data.realtimeTimeOnPage,
          timeOnPageAvg: data.realtimeTimeOnPageAvg,
          scrollDepth: data.realtimeScrollDepth,
          scrollDepthAvg: data.realtimeScrollDepthAvg,
          latestEvent: data.realtimeLatestEvent,
          nextInternalUrl: data.realtimeNextInternalUrl,
          linksClicked: data.realtimeLinksClicked,
          linksClickedByCategory: data.realtimeLinksClickedByCategory,
          retentionRate: retentionRate,
          socialReferrers: data.realtimeSocialReferrers,
          socialShares: data.realtimeSocialShares,
          comments: data.realtimeComments,
          commentsRead: data.realtimeCommentsRead,
          externalReferrerTypes : data.realtimeReferrerTypes,
          externalReferrerNames : data.realtimeReferrerNames,
          externalReferrerUrls : data.realtimeReferrerUrls,
          internalReferrerArticles: data.realtimeInternalReferrerArticles,
          internalReferrerOther: data.realtimeInternalReferrerOther,
          internalReferrerUrls: data.realtimeInternalReferrerUrls,
          userTypes: data.realtimeUserTypes,
          timespan: req.params.timespan || '1h',
          lastPublishDate: data.lastPublishDate
        }
      };
      return res;
    }).catch((error) => {
      res.locals.data = {
        ArticleRealtimeStore: {
          errorMessage : error.message
        }
      }
    })
}

function getSectionData(req, res){
  let query = {
    section: decode(req.params.section),
    comparator: decode(req.params.comparator),
    comparatorType: decode(req.params.comparatorType),
    timespan: decode(req.params.timespan),
    filters: {},
    type: 'section'
  }

  if(req.params.timespan === 'custom') {
    query.dateFrom = req.query.dateFrom
    query.dateTo = req.query.dateTo
  }

  return dataApiUtils.getSectionData(query, apiKey)
    .then((data) => {
      if(req.params.timespan !== 'custom') {
        query.dateFrom = moment().subtract(req.params.timespan, 'hours').toISOString();
        query.dateTo = moment().toISOString();
      }

      let getKeys = (item) => item[0];
      res.locals.data = {
        AnalyticsStore: {
          comparatorData: data.comparatorData,
          data: data.data,
          query: query,
          availableFilters: {
            devices: data.data.devices.map(getKeys),
            regions: data.data.regions.map(getKeys),
            cohort: data.data.userCohort.map(getKeys),
            referrers: data.data.referrerTypes.map(getKeys)
          }
        }
      };
      return res;
    }).catch((error) => {
      res.locals.data.AnalyticsStore = {
        errorMessage: error.message
      }
    })
}

function getTopicData(req, res){
  let query = {
    topic: decode(req.params.topic),
    comparator: decode(req.params.comparator),
    comparatorType: decode(req.params.comparatorType),
    timespan: req.params.timespan,
    filters: {},
    type: 'topic'
  }

  if(req.params.timespan === 'custom') {
    query.dateFrom = req.query.dateFrom
    query.dateTo = req.query.dateTo
  }

  return dataApiUtils.getTopicData(query, apiKey)
    .then((data) => {
      let getKeys = (item) => item[0];

      if(req.params.timespan !== 'custom') {
        query.dateFrom = moment().subtract(req.params.timespan, 'hours').toISOString();
        query.dateTo = moment().toISOString();
      }

      res.locals.data = {
        AnalyticsStore: {
          comparatorData: data.comparatorData,
          data: data.data,
          query: query,
          availableFilters: {
            devices: data.data.devices.map(getKeys),
            regions: data.data.regions.map(getKeys),
            cohort: data.data.userCohort.map(getKeys),
            referrers: data.data.referrerTypes.map(getKeys)
          }
        }
      };
      return res;
    }).catch((error) => {
      res.locals.data.AnalyticsStore = {
        errorMessage: error.message
      }
    })

  }

function getTopArticlesData(req, res) {
  let query = {
    dateFrom: moment().subtract(1, 'days').startOf('day').toISOString(),
    dateTo: moment().subtract(1, 'days').endOf('day').toISOString(),
    type: 'topArticles',
    filters: {}
  }

  return dataApiUtils.getTopArticlesData(query, apiKey)
    .then((data) => {
      res.locals.data = {
        TopArticlesStore: {
          data: data.data,
          dateTo: query.dateTo,
          dateFrom: query.dateFrom
        }
      };
      return res;
    }).catch((error) => {
      res.locals.data.AnalyticsStore = {
        errorMessage: error.message
      }
    })
  }

  export default router;
