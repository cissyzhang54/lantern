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
  data: (() => {
    let times = 30;
    let date = new Date().getTime();
    var dataArray = [];

    for (var i = 0; i < times; i++) {
      dataArray.push( {
        time: new Date(date + (i * 1000 * 60)),
        value: (Math.random() * 1000) | 0
      });
    }
    return dataArray;
  })(),
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
