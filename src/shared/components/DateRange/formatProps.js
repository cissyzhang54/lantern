import moment from 'moment';

function formatDate(props, prop){
  return (typeof props[prop] === 'string')
    ? moment(props[prop], props.locale.format)
    : props[prop]
}

function formatArray(props, prop){
  return (Array.isArray(props[prop]))
    ? props[prop].join(' ')
    : props[prop]
}

export default (props) => {
  let startDate = formatDate(props, 'startDate');
  let endDate = formatDate(props, 'endDate');
  let minDate = formatDate(props, 'minDate');
  let maxDate = formatDate(props, 'maxDate');
  let buttonClasses = formatArray(props,'buttonClasses');
  let daysOfWeek = props.locale.daysOfWeek;
  let timeZone = props.timeZone;
  let ranges = props.ranges;
  let autoApply = props.autoApply;

  // sanity check for bad options
  if (minDate && startDate.isBefore(minDate)){
    startDate = minDate.clone();
  }

  // sanity check for bad options
  if (maxDate && endDate.isAfter(maxDate)){
    endDate = maxDate.clone();
  }

  if (props.singleDatePicker){
    endDate = props.startDate.clone();
  }

  // update day names order to firstDay
  if (props.locale.firstDay != 0) {
    let iterator = props.locale.firstDay;
    while (iterator > 0) {
      daysOfWeek.push(daysOfWeek.shift());
      iterator--;
    }
  }


  // bind the time zone used to build the calendar to either the timeZone passed in through the options or the zone of the startDate (which will be the local time zone by default)
  if (typeof timeZone === 'string' || typeof timeZone === 'number') {
    if (typeof timeZone === 'string' && typeof moment.tz !== 'undefined') {
      timeZone = moment.tz.zone(timeZone).parse(new Date) * -1;  // Offset is positive if the timezone is behind UTC and negative if it is ahead.
    } else {
      timeZone = timeZone;
    }
    startDate.utcOffset(timeZone);
    endDate.utcOffset(timeZone);
  } else {
    timeZone = moment(startDate).utcOffset();
  }

  if (typeof ranges === 'object') {
    for (let range in ranges) {

      if (typeof ranges[range][0] === 'string')
        startDate = moment(ranges[range][0], props.locale.format);
      else
        startDate = moment(ranges[range][0]);

      if (typeof ranges[range][1] === 'string')
        endDate = moment(ranges[range][1], props.locale.format);
      else
        endDate = moment(ranges[range][1]);

      // If the start or end date exceed those allowed by the minDate or dateLimit
      // options, shorten the range to the allowable period.
      if (minDate && startDate.isBefore(minDate))
        startDate = minDate.clone();

      if (props.dateLimit && startDate.clone().add(props.dateLimit).isAfter(maxDate))
        maxDate = startDate.clone().add(props.dateLimit);
      if (maxDate && endDate.isAfter(maxDate))
        endDate = maxDate.clone();

      // If the end of the range is before the minimum or the start of the range is
      // after the maximum, don't display this range option at all.
      if ((minDate && endDate.isBefore(minDate)) || (maxDate && startDate.isAfter(maxDate))){
        continue;
      }

      ranges[range] = [startDate, endDate];
    }

    if (props.timePicker && autoApply){
      autoApply = false;
    }

    if (!props.timePicker) {
      startDate = startDate.startOf('day');
      endDate = endDate.endOf('day');
    }

  }

  return [startDate, endDate, minDate, maxDate, buttonClasses, daysOfWeek, timeZone, ranges, autoApply]
};
