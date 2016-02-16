import express from "express";
import bodyParser from "body-parser";
import * as esClient from '../esClient';
import * as ErrorHandler from '../apiErrorHandler';
import ArticleDataFormatter from '../formatters/Articles';
import ArticleRealtimeDataFormatter from '../formatters/ArticleRealtimeDataFormatter';
import SearchDataFormatter from '../formatters/Search';
import SectionDataFormatter from '../formatters/Sections';
import TopicDataFormatter from '../formatters/Topics';
import TopArticlesFormatter from '../formatters/TopArticles';
import getTitleForUrl from '../utils/getTitleFromUrl';
import moment from 'moment';

const UUID_REGEX = '[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}';

let router = express.Router();
router.use(bodyParser.json());

router.get('/queries', function(req, res, next) {
  req.pipe(esClient.queryStream).pipe(res);
});

router.post(`/articles/:uuid(${UUID_REGEX})`, getCategoryData);
router.post(`/sections/:section`, getSectionData);
router.post(`/topics/:topic`, getTopicData);
router.post(`/toparticles`, getTopArticlesData);
router.post(`/articlelist/:type/:value`, getArticleList);
router.get(`/realtime/articlelist/:type/:value`, getRealtimeArticleList);
router.get(`/realtime/articles/:uuid(${UUID_REGEX})`, getRealtimeArticleData);
router.get('/search/:query', search);
router.use(ErrorHandler.routes(router));

function decode(uri){
  return uri ? decodeURI(uri) : null
}

function getCategoryData(req, res, next) {
  const query = {
    uuid: decode(req.params.uuid),
    dateFrom: req.body.dateFrom,
    dateTo: req.body.dateTo,
    filters: req.body.filters,
    comparator: req.body.comparator,
    comparatorType: req.body.comparatorType
  };
  esClient.runArticleQuery(query)
    .then((response) => ArticleDataFormatter(response))
    .then((formattedData) => {
      let proms = formattedData.data.internalReferrerUrls.map((d) => {
        return getTitleForUrl(d[0]).then((title) => {
          d.push(title);
        }).catch(() => {
          d.push('Unknown');
        });
      })
      return Promise.all(proms).then(() => formattedData);
    })
    .then((formattedData) => {
      let proms = formattedData.data.nextInternalUrl.map((d) => {
        return getTitleForUrl(d[0]).then((title) => {
            d.push(title);
          }).catch(() => {
            d.push('Unknown');
          })
      })
      return Promise.all(proms).then(() => formattedData);
    })
    .then((formattedData) => res.json(formattedData))
    .catch((error) => {
      res.status(ErrorHandler.statusCode(error.name))
      next(error);
    });
}

function getRealtimeArticleData(req, res, next) {
  const query = {
    uuid: decode(req.params.uuid),
    timespan: req.query.timespan
  }
  // XXX add cache 5 seconds
  esClient.runArticleRealtimeQuery(query)
    .then(ArticleRealtimeDataFormatter)
    .then(results => res.json(results))
    .catch((error) => {
      res.status(ErrorHandler.statusCode(error.name))
      next(error);
    });
}

function getSectionData(req, res, next) {
  const query = {
    section: decode(req.params.section),
    dateFrom: req.body.dateFrom,
    dateTo: req.body.dateTo,
    filters: req.body.filters,
    comparator: req.body.comparator,
    comparatorType: req.body.comparatorType
  };
  esClient.runSectionQuery(query)
    .then((response) => SectionDataFormatter(response))
    .then((formattedData) => res.json(formattedData))
    .catch((error) => {
      res.status(ErrorHandler.statusCode(error.name))
      next(error);
    });
}

import RealtimeArticleListFormatter from '../formatters/RealtimeArticleListFormatter';
function getRealtimeArticleList(req, res, next) {
  const query = {
    type: req.params.type,
    value: decode(req.params.value),
    dateFrom: moment().subtract(1, 'days').toISOString(),
    dateTo: moment().toISOString()
  }
  esClient.runRealtimeArticleList(query)
    .then((response) => {
      return RealtimeArticleListFormatter(response);
    })
    .catch((error) => {
      res.status(ErrorHandler.statusCode(error.name));
      next(error);
    })
}

import ArticleListFormatter from '../formatters/ArticleListFormatter';
function getArticleList(req, res, next) {
  const query = {
    type: req.params.type,
    value: decode(req.params.value),
    dateFrom: req.body.dateFrom,
    dateTo: req.body.dateTo
  }
  esClient.runArticleList(query)
    .then((response) => ArticleListFormatter(response))
    .catch((error) => {
      res.status(ErrorHandler.statusCode(error.name));
      next(error);
    });
}

function getTopicData(req, res, next) {
  const query = {
    topic: decode(req.params.topic),
    dateFrom: req.body.dateFrom,
    dateTo: req.body.dateTo,
    filters: req.body.filters,
    comparator: req.body.comparator,
    comparatorType: req.body.comparatorType
  };
  esClient.runTopicQuery(query)
    .then((response) => TopicDataFormatter(response))
    .then((formattedData) => res.json(formattedData))
    .catch((error) => {
      res.status(ErrorHandler.statusCode(error.name))
      next(error);
    });
}

function search(req, res, next) {
  const query = req.params.query;
  const from = 0 || req.query.from;

  esClient.runSearchQuery({term: query, from: from})
    .then((response) => SearchDataFormatter(response) )
    .then((formattedData) => res.json(formattedData) )
    .catch((error) => {
      res.status(ErrorHandler.statusCode(error.name))
      next(error);
    });
}

function getTopArticlesData(req, res, next) {
  const query = {
    dateFrom: moment().subtract(1, 'days').startOf('day').toISOString(),
    dateTo: moment().subtract(1, 'days').endOf('day').toISOString()
  }

  esClient.runTopArticleQuery(query)
    .then((response) => TopArticlesFormatter(response))
    .then((formattedData) => res.json(formattedData))
    .catch((error) => {
      res.status(ErrorHandler.statusCode(error.name))
      next(error);
    });
}

export default router;
