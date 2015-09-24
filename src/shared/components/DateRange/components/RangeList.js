import React from 'react';


export default class RangeList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showButtons: props.showButtons,
    }
  }

  render() {
    let applyBtnClasses = ['applyBtn']
    let cancelBtnClasses = ['cancelBtn']
    if (this.props.buttonClasses) applyBtnClasses.push(this.props.buttonClasses)
    if (this.props.buttonClasses) cancelBtnClasses.push(this.props.buttonClasses)
    if (this.props.applyClass) applyClass.push(this.props.applyClass)
    if (this.props.cancelClass) cancelClass.push(this.props.cancelClass)

    let applyBtn = <button className={applyBtnClasses.join(' ')} disabled="disabled" type="button">{this.props.applyLabel}</button>
    let cancelBtn = <button className={cancelBtnClasses.join(' ')} type="button">{this.props.cancelLabel}</button>

    let rangeItems = Object.keys(this.props.ranges).map(function(key) {
      return <li key={key}>{this.props.ranges[key]}</li>
    })
    let rangeList = <ul>{rangeItems}<li>{this.props.customRangeLabel}</li></ul>

    return (
      <div className="ranges">
        {rangeList}
        <div className="range_inputs">
          {this.state.showButtons ? applyBtn: null}
          {this.state.showButtons ? cancelBtn: null}
        </div>
      </div>
    );
  }
}
