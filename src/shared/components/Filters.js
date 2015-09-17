import React from 'react';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';

import Filter from './Filter';
import FeatureFlag from '../utils/featureFlag';

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

  componentWillMount () {
    let renderFeature = FeatureFlag.check(this.props.identifier);
    this.render = renderFeature ? this.render : function () { return false };
  }

  render() {

    const divStyle = {
      fontWeight: "600"
    };

    var filters = fakeData.filters.map((f, i) => {
      return (
        <Col sm={2} xs={6} key={i}>
        <Filter
          name={f.name}
          options={f.options}
          onChange={this.props.onChange} />
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

Filters.propTypes = {
  onChange: React.PropTypes.func
}

Filters.defaultProps = {
  onChange: _ => {console.log(_)}
}

