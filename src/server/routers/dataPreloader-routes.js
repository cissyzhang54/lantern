import express from 'express';
import request from "superagent";
import moment from 'moment';

import dataApiUtils from '../../shared/utils/DataAPIUtils';

let router = express.Router();
let apiKey = process.env.LANTERN_API_KEY;
const UUID_REGEX = '[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}';
const COMPTYPE_REGEX = 'topic|section|author|genre|global';

function decode(uri){
  return uri ? decodeURI(uri) : null
}

router.get(`/articles/:uuid(${UUID_REGEX})`, (req, res, next) => {
  return getArticleData(req, res)
    .then(() => next())
    .catch((err) => {
      if (err.status) res.status(err.status);
      next(err);
    });
});

router.get(`/articles/:uuid(${UUID_REGEX})/:comparatorType(${COMPTYPE_REGEX})/:comparator`, (req, res, next) => {
  return getArticleData(req, res).then(() => getComparatorData(req, res))
    .then(() => next())
    .catch((err) => {
      if (err.status) res.status(err.status);
      next(err);
    });
});


function getArticleData(req, res){
  return dataApiUtils.getArticleData({uuid: decode(req.params.uuid)}, apiKey)
    .then((data) => {
      let dateFrom = moment(data.article.published).toISOString();
      let dateTo = moment().toISOString();
      res.locals.data = {
        "ArticleStore": {
          data: data
        },
        "ArticleQueryStore" : {
          query: {
            uuid: decode(req.params.uuid),
            dateFrom: dateFrom,
            dateTo: dateTo,
            filters: {}
          }
        },
        "ComparatorQueryStore" : {
          query: {
            comparator: decode(req.params.comparator),
            comparatorType: decode(req.params.comparatorType),
            dateFrom: dateFrom,
            dateTo: dateTo,
            publishDate: moment(data.article.published).toISOString(),
            filters: {}
          }
        },
        "FilterStore" : {
          query:{filters:{}},
          devices: data.article.devices.map(d => d[0]),
          regions: data.article.regions.map(d => d[0]),
          cohort: data.article.user_cohort.map(d => d[0]),
          referrers: data.article.referrer_types.map(d => d[0])
        }
      };
      return res;
    })
}

function getComparatorData(req, res){
  return dataApiUtils.getComparatorData(res.locals.data.ComparatorQueryStore.query, apiKey)
    .then((data) => {
      res.locals.data.ComparatorStore = {
          data: data
      };
      return res;
    })
}

export default router;
