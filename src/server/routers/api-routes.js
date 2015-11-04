import express from "express";
import bodyParser from "body-parser";
import uuid from "uuid";
import assign from "object-assign";
import * as esClient from '../esClient';
import * as ErrorHandler from '../apiErrorHandler';
import ArticleDataFormatter from '../formatters/Articles';
import ComparatorDataFormatter from '../formatters/Comparators';
import SearchDataFormatter from '../formatters/Search';
import SectionDataFormatter from '../formatters/Sections';

const UUID_REGEX = '[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}';
const CATEGORY_REGEX= 'articles|sections|topics|authors';
const COMPTYPE_REGEX  = 'topic|section|author|genre|global';
let router = express.Router();
router.use(bodyParser.json());

router.post(`/articles/:uuid(${UUID_REGEX})`, getCategoryData);
router.post(`/sections/:section`, getSectionData);
router.post(`/comparators/:category(${CATEGORY_REGEX})/:comparatorType(${COMPTYPE_REGEX})/:comparator`, getComparatorData);
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

function getComparatorData(req, res, next) {
  const query = {
    uuid: decode(req.query.uuid),
    section: decode(req.query.section),
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
        .then((response) => ComparatorDataFormatter(response) )
        .then((formattedData) => res.json(formattedData) )
        .catch((error) => {
          res.status(ErrorHandler.statusCode(error.name))
          next(error);
        });
      break;
    case 'sections':
      esClient.runSectionQuery(query)
        .then((response) => SectionDataFormatter(response, true) )
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
