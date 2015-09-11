import React from "react";
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';

const style = {
  textAlign:'center',
  margin:0,
  minHeight:'3em',
  lineHeight:'3em',
}

export default class Comparator extends React.Component {

  render() {
    let className = this.props.message ? 'lantern__circle loading' : 'lantern__circle'
    return (<div>
      <div className={className}>
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
      <div style={style}>{this.props.message}</div>
    </div>);
  }
}
