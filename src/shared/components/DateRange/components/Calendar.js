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
      showInput: props.showInput,
      showWeekNumbers: props.showWeekNumbers
    }
  }

  render() {
    let side = this.props.side
    let minDate = this.props.minDate
    let linkedCalendars = this.props.minDate
    let className = ['calendar', this.props.side];
    let showPrev =  ((!minDate || minDate.isBefore(calendar.firstDay)) && (!linkedCalendars || side == 'left'))

      return (
      <div className={className.join(' ')}>
        <div className="daterangepicker_input">
          {this.state.showInput ? calendarInput : null}
          {this.state.showTime ? calendarTime : null}
        </div>
        <div className="calendar-table">
          <table className="table-condensed">
            <thead><tr>
              {this.state.showWeekNumbers ? <th></th> : null}
              {showPrev ? <th class="prev available"><i class="fa fa-chevron-left glyphicon glyphicon-chevron-left"></i></th> : null }
            </tr></thead>
            <tbody></tbody>
          </table>
        </div>
      </div>
    );
  }
};
