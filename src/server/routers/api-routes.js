import express from "express";
import bodyParser from "body-parser";
import uuid from "uuid";
import assign from "object-assign";
import * as esClient from '../esClient';
import * as ErrorHandler from '../apiErrorHandler';
import ArticleDataFormatter from '../formatters/Articles';
import ArticleRealtimeDataFormatter from '../formatters/ArticleRealtimeDataFormatter';
import ArticleComparatorDataFormatter from '../formatters/ArticleComparators';
import SearchDataFormatter from '../formatters/Search';
import SectionDataFormatter from '../formatters/Sections';
import SectionComparatorDataFormatter from '../formatters/SectionComparators';
import TopicDataFormatter from '../formatters/Topics';
import TopicComparatorDataFormatter from '../formatters/TopicComparators';

const UUID_REGEX = '[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}';
const CATEGORY_REGEX= 'articles|sections|topics|authors';
const COMPTYPE_REGEX  = 'topic|section|author|genre|global';
let router = express.Router();
router.use(bodyParser.json());

router.post(`/articles/:uuid(${UUID_REGEX})`, getCategoryData);
router.post(`/sections/:section`, getSectionData);
router.post(`/topics/:topic`, getTopicData);
router.post(`/comparators/:category(${CATEGORY_REGEX})/:comparatorType(${COMPTYPE_REGEX})/:comparator`, getComparatorData);
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
  };
  esClient.runArticleQuery(query)
    .then((response) => ArticleDataFormatter(response))
    .then((formattedData) => res.json(formattedData))
    .catch((error) => {
      res.status(ErrorHandler.statusCode(error.name))
      next(error);
    });
}

function getRealtimeArticleData(req, res, next) {
  const query = {
    uuid: decode(req.params.uuid),
    dateFrom: req.query.dateFrom,
    dateTo: req.query.dateTo
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
  };
  esClient.runSectionQuery(query)
    .then((response) => SectionDataFormatter(response))
    .then((formattedData) => res.json(formattedData))
    .catch((error) => {
      res.status(ErrorHandler.statusCode(error.name))
      next(error);
    });
}

function getTopicData(req, res, next) {
  const query = {
    topic: decode(req.params.topic),
    dateFrom: req.body.dateFrom,
    dateTo: req.body.dateTo,
    filters: req.body.filters,
  };
  esClient.runTopicQuery(query)
    .then((response) => TopicDataFormatter(response))
    .then((formattedData) => res.json(formattedData))
    .catch((error) => {
      res.status(ErrorHandler.statusCode(error.name))
      next(error);
    });
}

function getComparatorData(req, res, next) {
  const query = {
    uuid: decode(req.query.uuid),
    section: decode(req.query.section),
    topic: decode(req.query.topic),
    publishDate: req.query.publishDate,
    comparator: req.params.comparator,
    comparatorType: req.params.comparatorType,
    dateFrom: req.body.dateFrom,
    dateTo: req.body.dateTo,
    filters: req.body.filters,
  };

  let category = req.params.category
  switch (category) {
    case 'articles':
      esClient.runArticleComparatorQuery(query)
        .then((response) => ArticleComparatorDataFormatter(response) )
        .then((formattedData) => res.json(formattedData) )
        .catch((error) => {
          res.status(ErrorHandler.statusCode(error.name))
          next(error);
        });
      break;
    case 'sections':
      esClient.runSectionQuery(query)
        .then((response) => SectionComparatorDataFormatter(response) )
        .then((formattedData) => res.json(formattedData) )
        .catch((error) => {
          res.status(ErrorHandler.statusCode(error.name))
          next(error);
        });
      break;
    case 'topics':
      esClient.runTopicQuery(query)
        .then((response) => TopicComparatorDataFormatter(response) )
        .then((formattedData) => res.json(formattedData) )
        .catch((error) => {
          res.status(ErrorHandler.statusCode(error.name))
          next(error);
        });
      break;
  }
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

export default router;
