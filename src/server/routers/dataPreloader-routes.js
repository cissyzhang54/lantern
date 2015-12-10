import express from 'express';
import request from "superagent";
import moment from 'moment';
import {getKeys} from '../../shared/stores/FilterStore';
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

router.get(`/articles/:uuid(${UUID_REGEX})/:comparatorType(${COMPTYPE_REGEX})/:comparator`, (req, res, next) => {
  return getArticleData(req, res)
    .then(() => next())
    .catch((err) => {
      if (err.status) res.status(err.status);
      next(err);
    });
});

router.get(`/sections/:section`, (req, res, next) => {
  return getSectionData(req, res)
    .then(() => next())
    .catch((err) => {
      if (err.status) res.status(err.status);
      next(err);
    });
});

router.get(`/sections/:section/:comparatorType(${COMPTYPE_REGEX})/:comparator`, (req, res, next) => {
  return getSectionData(req, res)
    .then(() => getComparatorData(req, res))
    .then(() => next())
    .catch((err) => {
      if (err.status) res.status(err.status);
      next(err);
    });
});

router.get(`/topics/:topic`, (req, res, next) => {
  return getTopicData(req, res)
    .then(() => {next()})
    .catch((err) => {
      if (err.status) res.status(err.status);
      next(err);
    });
});

router.get(`/topics/:topic/:comparatorType(${COMPTYPE_REGEX})/:comparator`, (req, res, next) => {
  return getTopicData(req, res)
    .then(() => getComparatorData(req, res))
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
    comparatorType: decode(req.params.comparatorType)
  }
  return dataApiUtils.getArticleData(query, apiKey)
    .then((data) => {
      let dateFrom = moment(data.data.published).toISOString();
      let dateTo = moment().toISOString();
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
            publishDate: dateFrom
          }
        },
        FilterStore : {
          query: {
            filters: {}
          },
          devices: getKeys(data.data.devices),
          regions: getKeys(data.data.regions),
          cohort: getKeys(data.data.userCohort),
          referrers: getKeys(data.data.referrerTypes)
        }
      };
      return res;
    }).catch((error) => {
      res.locals.data = {
        AnalyticsStore : {
          errorMessage : error.message
        }
      }
    })
}

function getArticleRealtimeData(req, res) {
  return dataApiUtils.getArticleRealtimeData({uuid: decode(req.params.uuid)}, apiKey)
    .then((data) => {
      res.locals.data = {
        ArticleRealtimeStore: {
          author: data.author,
          genre: data.genre,
          title: data.title,
          topics: data.topics,
          sections: data.sections,
          published: data.published,
          published_human: data.published_human,
          pageViews: data.realtimePageViews,
          timeOnPage: data.timeOnPageLastHour,
          scrollDepth: data.scrollDepthLastHour,
          livePageViews: data.livePageViews,
          realtimeNextInternalUrl: data.realtimeNextInternalUrl
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
    dateFrom: moment().subtract(29,'days').toISOString(),
    dateTo: moment().toISOString(),
    filters: {},
    type: 'section'
  }
  return dataApiUtils.getSectionData(query, apiKey)
    .then((data) => {
      res.locals.data = {
        AnalyticsStore: {
          comparatorData: data.comparatorData,
          data: data.data,
          query: query
        },
        FilterStore : {
          query: {
            filters: {}
          },
          devices: getKeys(data.data.devices),
          regions: getKeys(data.data.regions),
          cohort: getKeys(data.data.userCohort),
          referrers: getKeys(data.data.referrerTypes)
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
    dateFrom: moment().subtract(29,'days').toISOString(),
    dateTo: moment().toISOString(),
    filters: {},
    type: 'topic'
  }
  return dataApiUtils.getTopicData(query, apiKey)
    .then((data) => {
      res.locals.data = {
        AnalyticsStore: {
          comparatorData: data.comparatorData,
          data: data.data,
          query: query
        },
        FilterStore : {
          query: {
            filters: {}
          },
          devices: getKeys(data.data.devices),
          regions: getKeys(data.data.regions),
          cohort: getKeys(data.data.userCohort),
          referrers: getKeys(data.data.referrerTypes)
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
