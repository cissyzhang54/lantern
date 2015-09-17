import React from 'react';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import isBrowser from '../utils/isBrowser';
import FeatureFlag from '../utils/featureFlag';

let c3 = {};

if (isBrowser()) {
  c3 = require('c3');
}

export default class PieChart extends React.Component {

  constructor(props) {
    super(props);
  }

  drawChart() {
    let node = React.findDOMNode(this.refs.chartContainer);

    this.chart = c3.generate({
      bindto: node,
      transition: {
        duration: null
      },
      padding: {
        right: 20
      },
      color: {
        pattern: ['rgb(121,158,200)', 'rgb(167,106,173)', 'rgb(255,160,40)', 'rgb(137,201,189)', 'rgb(231,111,95)']
      },
      data: {
        type: 'pie',
        columns: this.props.data
      }
    })
  }

  componentDidUpdate() {
    this.drawChart();
  }

  componentDidMount() {
    if (this.props.data)
      this.drawChart();
  }

  componentWillMount () {
    let renderFeature = FeatureFlag.check(this.props.identifier);
    this.render = renderFeature ? this.render : function () { return false };
  }

  render() {
    let title = this.props.title ? <h4>{this.props.title}</h4> : {}
    return (<div>
      <Row>
        <Col xs={12}>
          { title }
        </Col>
      </Row>
      <Row>
      <Col xs={this.props.cols}>
        <div ref='chartContainer' id="chartContainer"></div>
      </Col>
      </Row>
    </div>);
  }

}

PieChart.defaultProps = {
  data: [
    ['Mobile', 0.2, 0.2, 0.2, 0.2, 0.2, 0.4, 0.3, 0.2, 0.2, 0.1, 0.2, 0.2, 0.1, 0.1, 0.2, 0.4, 0.4, 0.3, 0.3, 0.3, 0.2, 0.4, 0.2, 0.5, 0.2, 0.2, 0.4, 0.2, 0.2, 0.2, 0.2, 0.4, 0.1, 0.2, 0.2, 0.2, 0.2, 0.1, 0.2, 0.2, 0.3, 0.3, 0.2, 0.6, 0.4, 0.3, 0.2, 0.2, 0.2, 0.2],
    ['Desktop', 1.4, 1.5, 1.5, 1.3, 1.5, 1.3, 1.6, 1.0, 1.3, 1.4, 1.0, 1.5, 1.0, 1.4, 1.3, 1.4, 1.5, 1.0, 1.5, 1.1, 1.8, 1.3, 1.5, 1.2, 1.3, 1.4, 1.4, 1.7, 1.5, 1.0, 1.1, 1.0, 1.2, 1.6, 1.5, 1.6, 1.5, 1.3, 1.3, 1.3, 1.2, 1.4, 1.2, 1.0, 1.3, 1.2, 1.3, 1.3, 1.1, 1.3],
    ['Toaster', 2.5, 1.9, 2.1, 1.8, 2.2, 2.1, 1.7, 1.8, 1.8, 2.5, 2.0, 1.9, 2.1, 2.0, 2.4, 2.3, 1.8, 2.2, 2.3, 1.5, 2.3, 2.0, 2.0, 1.8, 2.1, 1.8, 1.8, 1.8, 2.1, 1.6, 1.9, 2.0, 2.2, 1.5, 1.4, 2.3, 2.4, 1.8, 1.8, 2.1, 2.4, 2.3, 1.9, 2.3, 2.5, 2.3, 1.9, 2.0, 2.3, 1.8],
  ],
  keys: ['value'],
  xLabel: 'Time',
  yLabel: 'Y Axis Label',
  cols: 12
};

PieChart.propTypes = {
  data: React.PropTypes.array.isRequired,
  keys: React.PropTypes.array.isRequired,
  yLabel: React.PropTypes.string.isRequired
};
