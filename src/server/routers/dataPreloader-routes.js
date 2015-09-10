import express from 'express';
import request from "superagent";
import moment from 'moment';

import dataApiUtils from '../../shared/utils/DataAPIUtils';

let router = express.Router();
let apiKey = process.env.LANTERN_API_KEY;

router.get('/articles/:uuid', (req, res, next) => {

  let query = {
    uuid: req.params.uuid,
    datefrom: moment().add(-7, 'days').toISOString(), // XXX make this a default sensible range
    dateTo: moment().toISOString(),
    comparator: null,
    filters: []
  };

  dataApiUtils.getArticleData(query, apiKey)
    .then((data) => {
      res.locals.data = {
        "ArticleStore": {
          data: data
        },
        "QueryStore" : {
          query: query
        }
      };
      next();
    })
    .catch((err) => {
      if (err.status) res.status(err.status);
      next(err);
    });
});

export default router;
