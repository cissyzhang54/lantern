import express from "express";
import bodyParser from "body-parser";
import uuid from "uuid";
import assign from "object-assign";
import moment from 'moment';

import esClient from '../esClient';
import ErrorHandler from '../apiErrorHandler';
import ArticleDataFormater from '../formatters/Articles';
import SearchDataFormatter from '../formatters/Search';

let router = express.Router();
router.use(bodyParser.json());

router.get('/:category(articles|topics|authors)/:uuid', category);
router.post('/:category(articles|topics|authors)/:uuid', category);
router.get('/search/:query', search);

router.use(ErrorHandler(router));

function category(req, res, next) {
  switch (req.params.category) {
    case 'articles':
      const query = {
        uuid: req.params.uuid,
        dateFrom: req.body.dateFrom || moment().add(-1, 'weeks').toISOString(),
        dateTo: req.body.dateTo || moment().toISOString()
      };
      esClient(req.params.category, query)
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
    default:
      res.json({
        uuid: req.params.uuid,
        category: req.params.category
      });
      break;
  }
}

function search(req, res, next) {
  var query = req.params.query;

  esClient('search', query)
    .then((response) => {
      return SearchDataFormatter(response);
    })
    .then((formattedData) => {
      res.json(formattedData);
    })
    .catch((error) => {
      switch(error.name) {
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
