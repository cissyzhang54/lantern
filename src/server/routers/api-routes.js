import express from "express";
import bodyParser from "body-parser";
import uuid from "uuid";
import assign from "object-assign";
import * as esClient from '../esClient';
import * as ErrorHandler from '../apiErrorHandler';
import ArticleDataFormater from '../formatters/Articles';
import ComparatorDataFormater from '../formatters/Comparators';
import SearchDataFormatter from '../formatters/Search';

const UUID_REGEX = '[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}';
const CATEGORY_REGEX= 'articles|topics|authors';
const COMPTYPE_REGEX  = 'topic|section|author|genre|global';
let router = express.Router();
router.use(bodyParser.json());

router.post(`/:category(${CATEGORY_REGEX})/:uuid(${UUID_REGEX})`, getCategoryData);
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
  let category =req.params.category
  switch (category) {
    case 'articles':
      esClient.runArticleQuery(query)
        .then((response) => ArticleDataFormater(response))
        .then((formattedData) => res.json(formattedData))
        .catch((error) => {
          res.status(ErrorHandler.statusCode(error.name))
          next(error);
        });
      break;
  }
}

function getComparatorData(req, res, next) {
  const query = {
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
      esClient.runComparatorQuery(query)
        .then((response) => ComparatorDataFormater(response) )
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
