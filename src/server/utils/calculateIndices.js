import moment from 'moment';

const INDEX_FORMAT = 'YYYY-MM-DD';

export default function calculateIndices(query) {
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

  return process.env.ES_INDEX_ROOT + indexStr;
}
