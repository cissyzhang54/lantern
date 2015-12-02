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
    .then(() => getComparatorData(req, res))
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
  return dataApiUtils.getArticleData({uuid: decode(req.params.uuid)}, apiKey)
    .then((data) => {
      let dateFrom = moment(data.published).toISOString();
      let dateTo = moment().toISOString();
      res.locals.data = {
        ArticleStore: {
          data: data,
        },
        ArticleQueryStore : {
          query: {
            uuid: decode(req.params.uuid),
            dateFrom: dateFrom,
            dateTo: dateTo,
            filters: {}
          }
        },
        ComparatorQueryStore : {
          query: {
            category: 'articles',
            uuid: decode(req.params.uuid),
            comparator: decode(req.params.comparator),
            comparatorType: decode(req.params.comparatorType),
            dateFrom: dateFrom,
            dateTo: dateTo,
            publishDate: moment(data.published).toISOString(),
            filters: {}
          }
        },
        FilterStore : {
          query: {
            filters: {}
          },
          devices: getKeys(data.devices),
          regions: getKeys(data.regions),
          cohort: getKeys(data.userCohort),
          referrers: getKeys(data.referrerTypes)
        }
      };
      return res;
    }).catch((error) => {
      res.locals.data = {
        ArticleStore : {
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
          livePageViews: data.livePageViews
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

function getComparatorData(req, res){
  return dataApiUtils.getComparatorData(res.locals.data.ComparatorQueryStore.query, apiKey)
    .then((data) => {
      res.locals.data.ComparatorStore = {
          data: data
      };
      return res;
    }).catch((error) => {
      res.locals.data.ComparatorStore = {
        errorMessage : error.message
      };
    })
}

function getSectionData(req, res){
  return dataApiUtils.getSectionData({section: decode(req.params.section)}, apiKey)
    .then((data) => {
      let dateFrom = moment().subtract(29,'days').toISOString();
      let dateTo = moment().toISOString();
      res.locals.data = {
        "SectionStore": {
          data: data
        },
        "SectionQueryStore" : {
          query: {
            section: decode(req.params.section),
            dateFrom: dateFrom,
            dateTo: dateTo,
            filters: {}
          }
        },
        "ComparatorQueryStore" : {
          query: {
            category: 'sections',
            section: decode(req.params.section),
            comparator: decode(req.params.comparator),
            comparatorType: decode(req.params.comparatorType),
            dateFrom: dateFrom,
            dateTo: dateTo,
            filters: {}
          }
        },
        "FilterStore" : {
          query: {
            filters: {}
          },
          devices: getKeys(data.devices),
          regions: getKeys(data.regions),
          cohort: getKeys(data.userCohort),
          referrers: getKeys(data.referrerTypes)
        }
      };
      return res;
    }).catch((error) => {
      res.locals.data.SectionStore = {
        errorMessage: error.message
      }
    })
}

function getTopicData(req, res){
  return dataApiUtils.getTopicData({topic: decode(req.params.topic)}, apiKey)
    .then((data) => {
      let dateFrom = moment().subtract(29,'days').toISOString();
      let dateTo = moment().toISOString();

      res.locals.data = {
        "TopicStore": {
          data: data
        },
        "TopicQueryStore" : {
          query: {
            topic: decode(req.params.topic),
            dateFrom: dateFrom,
            dateTo: dateTo,
            filters: {}
          }
        },
        "ComparatorQueryStore" : {
          query: {
            category: 'topics',
            topic: decode(req.params.topic),
            comparator: decode(req.params.comparator),
            comparatorType: decode(req.params.comparatorType),
            dateFrom: dateFrom,
            dateTo: dateTo,
            filters: {}
          }
        },
        "FilterStore" : {
          query: {
            filters: {}
          },
          devices: getKeys(data.devices),
          regions: getKeys(data.regions),
          cohort: getKeys(data.userCohort),
          referrers: getKeys(data.referrerTypes)
        }
      };
      return res;
    }).catch((error) => {
      res.locals.data.TopicStore = {
        errorMessage: error.message
      }
    })

  }

  export default router;
