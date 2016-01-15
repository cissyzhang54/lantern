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

    historical = {"status":status, "latestIndex": latestIndex};

    if ((new Date) - new Date(latestIndex) > TIME_LIMIT){
      historical.error = `Index is older than ${MAX_HOURS} Hours`
      historical.status = "warning"
    }

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

    let now = moment();
    let indexDate = moment(latestIndex, 'YYYY-MM-DD-hh')

    if (now - indexDate > ONE_HOUR){

      let timeDiff = Math.round(moment.duration(now.diff(indexDate)).asHours());

      json.error = `Index is ${timeDiff} hours out of date`
      json.status = "warning"
    }

    let realtime = {"status":status, "latestIndex": latestIndex}

    res.status(200).json({historical: historical, realtime: realtime}).end()
  })
});

export default router;
