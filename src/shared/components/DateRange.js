import React from 'react';
import DateRangePicker from '../lib/react-daterangepicker';
import moment from 'moment';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

const EARLIEST_INDEX = '2015-09-07'
const EARLIEST_INDEX_FORMAT = 'YYYY-MM-DD'

export default class DateRange extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      minDate: moment(moment(EARLIEST_INDEX).format(EARLIEST_INDEX_FORMAT)),
      locale:{
        format: 'DD MMM YYYY',
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
        'Publish Day': [moment(props.startDate), moment(props.startDate)],
        'First 7 days': [moment(props.startDate), moment(props.startDate).add(6, 'days')],
        'First 30 days': [moment(props.startDate), moment(props.startDate).add(29, 'days')],
        'Last 7 Days': [moment().subtract(6, 'days'), moment()],
        'Last 30 Days': [moment().subtract(29, 'days'), moment()]
      },
      startDate: moment(props.startDate),
      endDate: moment(props.endDate)
    };
    if (moment(this.state.minDate).isAfter(this.state.startDate, 'day')){
      this.state.startDate = this.state.minDate;
    }
  }

  handleEvent(event, picker) {
    if (event.type !== "apply") return;
    this.setState({
      startDate: picker.startDate,
      endDate: picker.endDate
    });
    this.props.onChange(picker)
  }

  render() {
    var start = this.state.startDate.format(this.state.locale.format);
    var end = this.state.endDate.format(this.state.locale.format);
    var label = start + ' - ' + end;
    if (start === end) {
      label = start;
    }
    return (
      <div className='dateRange' style={{position: 'relative'}}>
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
