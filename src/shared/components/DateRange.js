import React from 'react';
import DateRangePicker from '../lib/react-daterangepicker';
import moment from 'moment';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

export default class DateRange extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      locale:{
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
      ranges: {
        'Today': [moment(), moment()],
        'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        'Last 7 Days': [moment().subtract(6, 'days'), moment()],
        'Last 30 Days': [moment().subtract(29, 'days'), moment()],
        'This Month': [moment().startOf('month'), moment().endOf('month')],
        'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
      },
      startDate: moment().subtract(29, 'days'),
      endDate: moment()
    };
  }

  handleEvent(event, picker) {
      this.setState({
        startDate: picker.startDate,
        endDate: picker.endDate
      });
  }

  render() {
    var start = this.state.startDate.format(this.state.locale.format);
    var end = this.state.endDate.format(this.state.locale.format);
    var label = start + ' - ' + end;
    if (start === end) {
      label = start;
    }
    return (
      <div style={{position: 'relative'}}>
        <DateRangePicker {...this.state} onEvent={this.handleEvent.bind(this)}>
          <Button className="selected-date-range-btn" style={{width:'100%', color:'#555'}} >
            <div className="pull-left"><Glyphicon glyph="calendar" /></div>
            <div className="pull-right">
              <span>
                {label}
              </span>
              <span className="caret"></span>
            </div>
          </Button>
        </DateRangePicker>
      </div>
    );
  }
}

DateRange.propTypes = {
  onChange: React.PropTypes.func,
};

DateRange.defaultProps = {
  onChange: (value) => {console.log(value);}
};
