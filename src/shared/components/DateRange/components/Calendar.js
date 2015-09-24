import React from 'react';

let calendarTime = <div className="calendar-time">
  <div></div>
  <i className="fa fa-clock-o glyphicon glyphicon-time"></i>
</div>

let calendarInput = <div>
  <input className="input-mini" type="text" name="daterangepicker_start" value=""/>
  <i className="fa fa-calendar glyphicon glyphicon-calendar"></i>
</div>

export default class Calendar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showTime: props.timePicker,
      showInput: props.showInput
    }
  }

  render() {
    let className = ['calendar', this.props.className];
    return (
      <div className={className.join(' ')}>
        <div className="daterangepicker_input">
          {this.state.showInput ? calendarInput : null}
          {this.state.showTime ? calendarTime : null}
        </div>
        <div className="calendar-table"></div>
      </div>
    );
  }
};
