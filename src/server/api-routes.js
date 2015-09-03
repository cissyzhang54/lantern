import express from "express";
import bodyParser from "body-parser";
import fakeData from "./fake_data";
import uuid from "uuid";
import assign from "object-assign";
import moment from 'moment';
import esClient from './esClient';

import ArticleDataFormater from './formatters/Articles';

let router = express.Router();
router.use(bodyParser.json());

router.get('/:category(articles|topics|authors)/:uuid', category);
router.post('/:category(articles|topics|authors)/:uuid', category);
router.post('/search', search);

function category(req, res, next) {
  switch (req.params.category) {
    case 'articles':
      const query = {
        uuid: req.params.uuid,
        dateFrom: req.body.dateFrom || moment().add(-7, 'days').toISOString(),
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
          res.status(500);
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

function search(req, res) {
  let obj;
  let query = req.body;

  res.json({
    'results' : [
      {
        'type': 'article',
        title: 'Some thing some thing',
        uuid: uuid.v4()
      }
    ]
  });
}

export default router;
