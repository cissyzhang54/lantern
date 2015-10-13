import express from 'express';
import request from "superagent";
import moment from 'moment';

import dataApiUtils from '../../shared/utils/DataAPIUtils';

let router = express.Router();
let apiKey = process.env.LANTERN_API_KEY;
const UUID_REGEX = '[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}';

router.get(`/articles/:uuid(${UUID_REGEX})`, (req, res, next) => {
  return getArticleData(req, res)
    .then(function(){
      next();
    })
    .catch((err) => {
      if (err.status) res.status(err.status);
      next(err);
    });
});

router.get(`/articles/:uuid(${UUID_REGEX})/:comparator`, (req, res, next) => {
  return getArticleData(req, res).then(function(){
      return getComparatorData(req, res)
    })
    .then(function(){
      next();
    })
    .catch((err) => {
      if (err.status) res.status(err.status);
      next(err);
    });
});


function getArticleData(req, res){
  let query = {
    uuid: req.params.uuid,
    dateFrom: null,
    dateTo: null,
    comparator: null,
    filters: {}
  };

  return dataApiUtils.getArticleData(query, apiKey)
    .then((data) => {
      query.dateFrom = moment(data.article.published).toISOString();
      query.dateTo = moment().toISOString();
      res.locals.data = {
        "ArticleStore": {
          data: data
        },
        "QueryStore" : {
          query: query
        },
        "FilterStore" : {
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
  let query = {
    uuid: null,
    dateFrom: moment(res.locals.data.ArticleStore.data.article.published).toISOString(),
    dateTo:  moment().toISOString(),
    comparator: req.params.comparator,
    filters: {}
  };

  return dataApiUtils.getComparatorData(query, apiKey)
    .then((data) => {
      res.locals.data.ComparatorStore = {
          data: data
      };
      res.locals.data.QueryStore.query.comparator = query.comparator;
      return res;
    })
}

export default router;
