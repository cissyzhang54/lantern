import express from "express";
import * as esClient from '../esClient';

let router = express.Router();
const ONE_HOUR = 60 * 60 * 1000; /* ms */
const MAX_HOURS = 72; /* ms */
const TIME_LIMIT = ONE_HOUR * MAX_HOURS; /* ms */

router.use('/', function (req, res, next) {
  esClient.getIndicies('index').then(function(stuff){
    let status = 'ok'
    let indexRow = stuff.split('\n')
    let latestIndex = indexRow
      .filter((index) => index && index.indexOf('%')<0)
      .map((index) =>  index.trim().replace('article_page_view-',''))
      .sort((a,b) => new Date(b) - new Date(a))
      .shift();
    let json = {"status":status, "latestIndex": latestIndex};
    if ((new Date) - new Date(latestIndex) > TIME_LIMIT){
      json.error = `Index is older than ${MAX_HOURS} Hours`
      json.status = "warning"
    }
    res.status(200).json(json).end()
  })
});

export default router;
