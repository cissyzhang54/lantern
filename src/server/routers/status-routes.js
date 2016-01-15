import express from "express";
import * as esClient from '../esClient';
import moment from 'moment'

let router = express.Router();
const ONE_HOUR = 60 * 60 * 1000; /* ms */
const MAX_HOURS = 72; /* ms */
const TIME_LIMIT = ONE_HOUR * MAX_HOURS; /* ms */

function strToArray (stuff, str) {
  let indexRow = stuff.split('\n')

  let indexes = indexRow
    .filter((index) => index && index.indexOf('%')<0)
    .map((index) =>  index.trim().replace(str,''))

  return indexes
}

router.use('/', function (req, res, next) {

  let historical;

  esClient.getIndicies('article_page_view*', 'index').then(function(stuff){

    let status = 'ok'

    let latestIndex = strToArray(stuff, 'article_page_view-')
      .sort((a,b) => new Date(b) - new Date(a))
      .shift();

    let json = {"status":status, "latestIndex": latestIndex};

    if ((new Date) - new Date(latestIndex) > TIME_LIMIT){
      json.error = `Index is older than ${MAX_HOURS} Hours`
      json.status = "warning"
    }

    historical = json

  }).then(() => {
    return esClient.getIndicies('realtime*', 'index')
  }).then((response) => {

    let latestIndex = strToArray(response, 'realtime-')
      .sort((a,b) => {
        if (a < b)
          return 1
        if (a > b)
          return -1
        return 0
      }).shift();

    let status = 'ok'

    if (moment() - moment(latestIndex, 'YYYY-MM-DD-hh') > ONE_HOUR){
      json.error = `Index is out of date`
      json.status = "warning"
    }

    let realtime = {"status":status, "latestIndex": latestIndex}

    res.status(200).json({hist: historical, real: realtime}).end()
  })
});

export default router;
