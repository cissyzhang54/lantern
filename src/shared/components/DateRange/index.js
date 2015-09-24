import React from 'react';

import moment from 'moment';
import {} from 'moment-range';

import Button from 'react-bootstrap/lib/Button';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Overlay from 'react-bootstrap/lib/Overlay';
import Popover from 'react-bootstrap/lib/Popover';
import Input from 'react-bootstrap/lib/Input';

import propTypes from './propTypes'
import defaultProps from './defaultProps'
import formatProps from './formatProps'
import Picker from './components/Picker'

const overlayStyle = {
  position: 'absolute',
  backgroundColor: '#EEE',
  boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)',
  border: '1px solid #CCC',
  borderRadius: 3,
  marginLeft: -5,
  marginTop: -5,
  padding: 10,
  zIndex: 1
};

export default class DateRange extends React.Component {

  constructor(props) {
    //todo: don't format props like this; clone and create new instead.
    super(props);

    this.state = {
      isShowing : false,
      leftCalendar : {},
      rightCalendar : {}
    }

  }

  toggleOverlay(){
    this.setState({isShowing: !this.state.isShowing});
  }

  render() {
    let [startDate, endDate, minDate, maxDate, buttonClasses, daysOfWeek, timeZone, ranges, autoApply] = formatProps(this.props)
    const overlayProps = {
      show: this.state.isShowing,
      container: this,
      target : () => React.findDOMNode(this.refs.target),
      placement: 'bottom'
    };
    let pickerProps = this.props;
    pickerProps.ranges = ranges;
    pickerProps.autoApply = autoApply;

    return ( <div style={{position: 'relative'}}>
      <div ref='target'>
        <Input type="text"
               bsSize='small'
               //value={this.state.value ? this.state.value.start.format('LL') : null}
               readOnly={true}
               onClick={this.toggleOverlay.bind(this)}
          />
      </div>
      <Overlay {...overlayProps}>
        <div style={overlayStyle}>
          <Picker  {...pickerProps}/>
        </div>
      </Overlay>
    </div> );
  }
}

//<RangePicker
//  firstOfWeek={1}
//  numberOfCalendars={2}
//  selectionType='range'
//  minimumDate={moment().add(-2, 'year').toDate()}
//  maximumDate={new Date()}
//  onSelect={this.handleSelect.bind(this)}
//  value={moment.range(this.state.value.start, this.state.value.end)}
//  />

DateRange.propTypes = propTypes;
DateRange.defaultProps = defaultProps;
