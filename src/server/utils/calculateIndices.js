import moment from 'moment';

const INDEX_FORMAT = 'YYYY-MM-DD';
const RT_INDEX_FORMAT = 'YYYY-MM-DD-HH';

export default function calculateIndices(query, ES_INDEX) {
  let dateFrom = moment(moment(query.dateFrom)).format(INDEX_FORMAT);
  let dateTo = moment(moment(query.dateTo)).format(INDEX_FORMAT);

  let indexStr = '';

  let charF, charT;
  let i = 0;
  while (i < dateFrom.length) {
    charF = dateFrom[i];
    charT = dateTo[i];

    if (charF === charT) {
      indexStr += charF;
    } else {
      indexStr += '*';
      break;
    }
    i++;
  }

  return ES_INDEX + indexStr;
}


export function calculateRealtimeIndices(query, ES_INDEX) {
  let dateFrom = moment(moment(query.dateFrom)).format(RT_INDEX_FORMAT);
  let dateTo = moment(moment(query.dateTo)).format(RT_INDEX_FORMAT);

  let indexStr = '';

  let charF, charT;
  let i = 0;
  while (i < dateFrom.length) {
    charF = dateFrom[i];
    charT = dateTo[i];

    if (charF === charT) {
      indexStr += charF;
    } else {
      indexStr += '*';
      break;
    }
    i++;
  }
  
  return ES_INDEX + indexStr;
}
