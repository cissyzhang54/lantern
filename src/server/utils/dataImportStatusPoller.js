import * as esClient from '../esClient';
import moment from 'moment'
import assign from 'object-assign';

const POLL_INTERVAL = 2 * 60000; // 2 minutes
const ONE_HOUR = 60 * 60 * 1000; /* ms */
const FIVE_MINS = 5 * 60 * 1000;
const MAX_HOURS = 72; /* ms */
const TIME_LIMIT = ONE_HOUR * MAX_HOURS; /* ms */

var latestStatus = {};

fetchStatus();

function formatHistoricalStatus(latestEvent) {
  let result = {};
  let status = 'ok'

  result.status = status;
  result.latestEvent = latestEvent;

  if ((new Date) - new Date(latestEvent) > TIME_LIMIT){
    result.error = `Historical data is older than ${MAX_HOURS} Hours`
    result.status = "warning"
  }

  return result;
}

function formatRealtimeStatus(sourceData) {
  let docEventTimestamp = sourceData.hits[0]._source.event_timestamp;
  let status = 'ok'

  let now = moment();
  let docDate = moment(docEventTimestamp);
  let result = {};

  if (now - docDate > FIVE_MINS){

    let timeDiff = Math.round(moment.duration(now.diff(docDate)).asHours());

    result.error = `Index is ${timeDiff} hours out of date`
    status = "warning"
  }

  result.status = status;
  result.docDate = docDate;

  return result;
}

function fetchStatus() {
  var fetches = [
    esClient.getLatestHistoricalDocument(),
    esClient.getLatestRealtimeDocument()
  ];

  Promise.all(fetches).then((responses) => {
    let historicalIndices = responses[0],
      realtimeLatestDoc = responses[1];

    latestStatus.historical = formatHistoricalStatus(historicalIndices);
    latestStatus.realtime = formatRealtimeStatus(realtimeLatestDoc);

    setTimeout(fetchStatus, POLL_INTERVAL);
  }).catch((error) => {
    console.error('there was an error, wait a bit longer: ', error.message);
    setTimeout(fetchStatus, POLL_INTERVAL);
  });
}

export default function getStatus() {
  return assign({}, latestStatus);
}
