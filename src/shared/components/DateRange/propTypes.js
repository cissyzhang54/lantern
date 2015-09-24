import React from 'react';

export default {

  // The start of the initially selected date range
  // i.e. "09/18/2015"
  startDate: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.object //moment
  ]),

  // The end of the initially selected date range
  // i.e. "09/24/2015"
  endDate: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.object //moment
  ]),

  // The timezone that will be used to display the startDate and endDate in the calendar.
  // This may be a string such as "08:00" or an offset in minutes from Greenwich Mean Time. Uses Moment.js #utcOffset, see the docs here for more information. If the timeZone option is not set, the calendar will use the time zone set on the startDate that has been passed in through the options, if it has one. Defaults to the local time zone
  timeZone: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ]),

  // The earliest date a user may select
  // i.e. "01/01/2000"
  minDate: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.object //moment
  ]),

  // The latest date a user may select
  // i.e. "01/01/2010"
  maxDate: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.object //moment
  ]),

  // The maximum span between the selected start and end dates. Can have any property you can add to a moment object
  // i.e. {  "days": 7 }
  dateLimit: React.PropTypes.object,

  // Hide the apply and cancel buttons, and automatically apply a new date range as soon as two dates or a predefined range is selected
  autoApply: React.PropTypes.bool,

  // Show only a single calendar to choose one date, instead of a range picker with two calendars; the start and end dates provided to your callback will be the same single date chosen
  singleDatePicker: React.PropTypes.bool,

  // Show year and month select boxes above calendars to jump to a specific month and year
  showDropdowns: React.PropTypes.bool,

  // Show week numbers at the start of each week on the calendars
  showWeekNumbers: React.PropTypes.bool,

  // Allow selection of dates with times, not just dates
  timePicker: React.PropTypes.bool,

  // Use 24-hour instead of 12-hour times, removing the AM/PM selection
  timePicker24Hour: React.PropTypes.bool,

  // Show seconds in the timePicker
  timePickerSeconds: React.PropTypes.bool,

  // Increment of the minutes selection list for times
  // (i.e. 30 to allow only selection of times ending in 0 or 30)
  timePickerIncrement: React.PropTypes.number,

  // When enabled, the two calendars displayed will always be for two sequential months (i.e. January and February), and both will be advanced when clicking the left or right arrows above the calendars.
  // When disabled, the two calendars can be individually advanced and display any month/year.
  linkedCalendars: React.PropTypes.bool,

  // Set predefined date ranges the user can select from. Each key is the label for the range, and its value an array with two dates representing the bounds of the range
  //{
  //  'Today': [moment(), moment()],
  //  'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
  //  'Last 7 Days': [moment().subtract(6, 'days'), moment()],
  //  'Last 30 Days': [moment().subtract(29, 'days'), moment()],
  //  'This Month': [moment().startOf('month'), moment().endOf('month')],
  //  'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
  //}
  ranges: React.PropTypes.object,

  // Whether the picker appears aligned to the left, to the right, or centered under the HTML element it's attached to
  opens: React.PropTypes.oneOf(['left', 'center', 'right']),

  // Whether the picker appears below (default) or above the HTML element it's attached to
  drops: React.PropTypes.oneOf(['down', 'up']),

  // CSS class names that will be added to all buttons in the picker
  buttonClasses: React.PropTypes.array,

  // CSS class string that will be added to the apply button
  applyClass: React.PropTypes.string,

  // CSS class string that will be added to the cancel button
  cancelClass: React.PropTypes.string,

  // Allows you to provide localized strings for buttons and labels, customize the date display format, and change the first day of week for the calendars
  //{
  //  format: 'MM/DD/YYYY',
  //  separator: ' - ',
  //  applyLabel: 'Apply',
  //  cancelLabel: 'Cancel',
  //  fromLabel: 'From',
  //  toLabel: 'To',
  //  customRangeLabel: 'Custom',
  //  daysOfWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr','Sa'],
  //  monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  //  firstDay: 1
  //}
  locale: React.PropTypes.shape({
    format: React.PropTypes.string,
    separator: React.PropTypes.string,
    applyLabel: React.PropTypes.string,
    cancelLabel: React.PropTypes.string,
    fromLabel: React.PropTypes.string,
    toLabel: React.PropTypes.string,
    customRangeLabel: React.PropTypes.string,
    daysOfWeek: React.PropTypes.array,
    monthNames: React.PropTypes.array,
    firstDay: React.PropTypes.number
  }),

  // html template for the picker UI
  template: React.PropTypes.element,

  // callback
  callback: React.PropTypes.function,

  //A function that is passed each date in the two calendars before they are displayed, and may return true or false to indicate whether that date should be available for selection or not.
  isInvalidDate: React.PropTypes.function
};
