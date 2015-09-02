import React from 'react';
import {Row, Col} from 'react-bootstrap';

import Filter from './Filter';

const fakeData = {

  filters : [
    {
      name: 'Country',
      options: ['uk', 'us', 'jap']
    },
    {
      name: 'Device',
      options: ['mobile', 'tablet', 'desktop']
    },
    {
      name: 'User Types',
      options: ['Banker', 'Assasin', 'Oligarch']
    },
    {
      name: 'Referrers',
      options: ['Twitter', 'Facebook', 'Google']
    }
  ]

};


export default class Filters extends React.Component {

  render() {

    const divStyle = {
      fontWeight: "600"
    };

    var filters = fakeData.filters.map((f, i) => {
      return (
        <Col sm={2} xs={6} key={i}>
        <Filter name={f.name} options={f.options} />
        </Col>
      );
    });

    return (<Row>
      <Col sm={2} xs={12}>
        <div style={divStyle}>Filters:</div>
      </Col>
      {filters}
    </Row>);
  }

}
