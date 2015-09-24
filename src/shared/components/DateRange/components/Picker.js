import React from 'react';

import Calendar from './Calendar'
import RangeList from './RangeList'

export default class Picker extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      ranges: props.ranges,
      showTime: props.timePicker,
      showRanges: !props.autoApply && props.ranges,// && !props.singleDatePicker && this.timePicker,
      showButtons: !props.autoApply && !props.ranges,
      showCalendarRight: !this.props.singleDatePicker,
    }
  }

  render() {
    let rangeProps = {
      showButtons: this.state.showButtons,
      ranges: this.props.ranges,
      buttonClasses: this.props.locale.buttonClasses,
      applyClass: this.props.locale.applyClass,
      cancelClass: this.props.locale.cancelClass,
      cancelLabel: this.props.locale.cancelLabel,
      applyLabel: this.props.locale.applyLabel,
      customRangeLabel: this.props.locale.customRangeLabel,
    };
    let rangeList = <RangeList {...rangeProps} />

    let classNames = ['daterangepicker', 'dropdown-menu']
    if (this.props.singleDatePicker) classNames.push('single')
    classNames.push('opens' + this.props.opens);
    // //todo: css to left/right align ranges based on props.opens
    return ( <div className={classNames}>
      <Calendar className='left' showInput={this.state.showCalendarRight}/>
      {this.state.showCalendarRight ? <Calendar className='right' /> : null }
      {this.state.showRanges ? rangeList : null}
    </div> )
  }
}
