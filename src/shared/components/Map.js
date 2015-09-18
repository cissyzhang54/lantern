import React from 'react';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import isBrowser from '../utils/isBrowser';
import FeatureFlag from '../utils/featureFlag';

let Datamap = function() {};

if (isBrowser()) {
  Datamap = require('datamaps');
}

export default class DataMap extends React.Component {

  constructor(props) {
    super(props);
  }

  drawMap() {
    let node = React.findDOMNode(this.refs.mapContainer);
    this.map = new Datamap({
      element: node,
      responsive: true
    });
  }

  componentDidMount() {
    this.drawMap();
    window.addEventListener('resize', () => {
      this.map.resize();
    });
  }

  componentWillMount() {
    let renderFeature = FeatureFlag.check(this.props.identifier);
    this.render = renderFeature ? this.render : _ => {return false;};
  }

  render() {
    const divStyle = {
      height : '48%',
      width: '100%'
    };
    return (
      <Row>
        <Col xs={12}>
          <h4>{this.props.title}</h4>
          <div style={divStyle} ref="mapContainer" id="mapContainer"></div>
        </Col>
      </Row>
    );
  }

}
