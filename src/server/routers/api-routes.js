import express from "express";
import bodyParser from "body-parser";
import uuid from "uuid";
import assign from "object-assign";

import * as esClient from '../esClient';
import ErrorHandler from '../apiErrorHandler';
import ArticleDataFormater from '../formatters/Articles';
import ComparatorDataFormater from '../formatters/Comparators';
import SearchDataFormatter from '../formatters/Search';

const UUID_REGEX = '[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}';
let router = express.Router();
router.use(bodyParser.json());

router.post(`/:category(articles|topics|authors)/:uuid(${UUID_REGEX})`, getCategoryData);//todo remove comparator prefix
router.post('/comparators/:category(articles|topics|authors)/:comparator', getComparatorData);
router.get('/search/:query', search);

router.use(ErrorHandler(router));

function getCategoryData(req, res, next) {
  const query = {
    uuid: req.params.uuid,
    dateFrom: req.body.dateFrom,
    dateTo: req.body.dateTo
  };
  let category =req.params.category
  switch (category) {
    case 'articles':
      esClient.runArticleQuery(query)
        .then((response) => {
          return ArticleDataFormater(response);
        })
        .then((formattedData) => {
          res.json(formattedData);
        })
        .catch((error) => {
          switch (error.name) {
            case 'ArticleNotFoundError':
              res.status(404);
              break;
            default:
              res.status(500);
              break;
          }
          next(error);
        });
      break;
  }
}

function getComparatorData(req, res, next) {
  const query = {
    comparator: req.params.comparator,
    dateFrom: req.body.dateFrom,
    dateTo: req.body.dateTo
  };
  let category =req.params.category
  switch (category) {
    case 'articles':
      esClient.runComparatorQuery(query)
        .then((response) => {
          return ComparatorDataFormater(response);
        })
        .then((formattedData) => {
          res.json(formattedData);
        })
        .catch((error) => {
          switch (error.name) {
            case 'ComparatorNotFoundError':
              res.status(404);
              break;
            default:
              res.status(500);
              break;
          }
          next(error);
        });
      break;
  }
}

function search(req, res, next) {
  const query = req.params.query;
  const from = 0 || req.query.from;

  esClient.runSearchQuery({term: query, from: from})
    .then((response) => {
      return SearchDataFormatter(response);
    })
    .then((formattedData) => {
      res.json(formattedData);
    })
    .catch((error) => {
      switch (error.name) {
        case 'DataParsingError':
          res.status(500);
          break;
        default:
          res.status(500);
          break;
      }
      next(error);
    });

}

export default router;
