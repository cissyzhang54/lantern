import moment from 'moment';

export default {
  startDate : moment().startOf('day'),
  endDate : moment().endOf('day'),
  timeZone : moment().utcOffset(),
  //minDate : false,
  //maxDate : false,
  //dateLimit : false,
  autoApply : false,
  singleDatePicker : false,
  showDropdowns : false,
  showWeekNumbers : false,
  timePicker : false,
  timePicker24Hour : false,
  timePickerIncrement : 1,
  timePickerSeconds : false,
  linkedCalendars : true,
  autoUpdateInput : true,
  ranges : {},
  opens : 'right',
  drops : 'down',
  buttonClasses : ['btn','btn-sm'],
  applyClass : 'btn-success',
  cancelClass : 'btn-default',

  locale : {
    format: 'MM/DD/YYYY',
    separator: ' - ',
    applyLabel: 'Apply',
    cancelLabel: 'Cancel',
    weekLabel: 'W',
    customRangeLabel: 'Custom Range',
    daysOfWeek: moment.weekdaysMin(),
    monthNames: moment.monthsShort(),
    firstDay: moment.localeData().firstDayOfWeek()
  },

  callback : function() { },
  isInvalidDate: function() { return false; }

};
