import React from "react";
import {Row, Col} from 'react-bootstrap';

export default class Comparator extends React.Component {

  render() {

    return (<div className='lantern__circle'>
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
    </div>);
  }
}
