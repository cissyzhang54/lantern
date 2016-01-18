import * as esClient from '../esClient';
import moment from 'moment'

const POLL_INTERVAL = 5 * 60000; // 5 minutes
const ONE_HOUR = 60 * 60 * 1000; /* ms */
const MAX_HOURS = 72; /* ms */
const TIME_LIMIT = ONE_HOUR * MAX_HOURS; /* ms */

var latestStatus = {};

fetchStatus();

function formatHistoricalStatus(sourceData) {
  let result = {};
  let status = 'ok'
  let indexRow = sourceData.split('\n')
  let latestIndex = indexRow
    .filter((index) => index && index.indexOf('%')<0)
    .map((index) =>  index.trim().replace('article_page_view-',''))
    .sort((a,b) => new Date(b) - new Date(a))
    .shift();

  result.status = status;
  result.latestIndex = latestIndex;

  if ((new Date) - new Date(latestIndex) > TIME_LIMIT){
    result.error = `Index is older than ${MAX_HOURS} Hours`
    result.status = "warning"
  }

  return result;
}

function strToArray (stuff, str) {
  let indexRow = stuff.split('\n')

  let indexes = indexRow
    .filter((index) => index && index.indexOf('%')<0)
    .map((index) =>  index.trim().replace(str,''))

  return indexes
}

function formatRealtimeStatus(sourceData) {
  let latestIndex = strToArray(sourceData, 'realtime-')
    .sort((a,b) => {
      if (a < b)
        return 1
      if (a > b)
        return -1
      return 0
    }).shift();

  let status = 'ok'

  let now = moment();
  let indexDate = moment(latestIndex, 'YYYY-MM-DD-hh');
  let result = {};

  if (now - indexDate > ONE_HOUR){

    let timeDiff = Math.round(moment.duration(now.diff(indexDate)).asHours());

    result.error = `Index is ${timeDiff} hours out of date`
    status = "warning"
  }

  result.status = status;
  result.latestIndex = latestIndex;

  return result;
}

function fetchStatus() {
  var fetches = [
    esClient.getIndicies('article_page_view*', 'index'),
    esClient.getIndicies('realtime*', 'index')
  ];

  Promise.all(fetches).then(function(responses){
    let historicalIndices = responses[0],
      realtimeIndices = responses[1];

    latestStatus.historical = formatHistoricalStatus(historicalIndices);
    latestStatus.realtime = formatRealtimeStatus(realtimeIndices);

    setTimeout(fetchStatus, POLL_INTERVAL);
  });
}

export default function getStatus() {
  return latestStatus;
}
