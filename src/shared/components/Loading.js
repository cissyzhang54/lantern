import React from "react";
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';

const style = {
  textAlign:'center',
  margin:0,
  minHeight:'3em',
  lineHeight:'3em',
}

export default class Loading extends React.Component {

  render() {
    let classNames = ['lantern__circle']
    if (this.props.loading) classNames.push('loading')
    if (this.props.error) classNames.push('error')
    let messages = Array.isArray(this.props.message) ? this.props.message : [this.props.message];
    let message = messages.map(function(str){
      return <div style={style}>{str}</div>
    });
    return (<div>
      <div className={classNames.join(' ')}>
        <div className="lantern__hoop"></div>
        <div className="lantern__lid lantern__lid--upper"></div>
        <div className="lantern__lid lantern__lid--lower"></div>
        <div className="lantern__glass">
          <div className="lantern__flame"></div>
          <div className="lantern__wick"></div>
        </div>
        <div className="lantern__neck"></div>
        <div className="lantern__base lantern__base--lupper"></div>
        <div className="lantern__base lantern__base--lower"></div>
      </div>
      {message}
    </div>);
  }
}
