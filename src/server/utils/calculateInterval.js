import moment from 'moment';

export function interval(dateFrom, dateTo) {
  let from = moment(dateFrom);
  let to = moment(dateTo);
  let span = moment.duration(to - from);

  if (span <= moment.duration(1, 'day')) {
    return 'hour';
  } else if (span <= moment.duration(1, 'week')) {
    return 'day';
  } else if (span <= moment.duration(6, 'month')) {
    return 'day';
  } else {
    return 'week';
  }
}

export function minuteInterval(dateFrom, dateTo) {
  let from = moment(dateFrom);
  let to = moment(dateTo);
  let span = moment.duration(to - from);

  if (span <= moment.duration(1, 'day')) {
    return 60;
  } else if (span <= moment.duration(1, 'week')) {
    return 60;
  } else if (span <= moment.duration(6, 'month')) {
    return 60*24;
  } else {
    return 60*24*7;
  }
}
