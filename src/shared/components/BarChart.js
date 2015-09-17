import React from 'react';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import isBrowser from '../utils/isBrowser';
import FeatureFlag from '../utils/featureFlag';

let c3 = {};

if (isBrowser()) {
  c3 = require('c3');
}

export default class BarChart extends React.Component {
  constructor(props) {
    super(props);
  }

  drawChart() {
    let node = React.findDOMNode(this.refs.chartContainer);
    let json = this.props.data;

    this.chart = c3.generate({
      bindto: node,
      transition: {
        duration: null,
      },
      padding: {
        right: 20 // XXX do we need this?
      },
      data: {
        type: 'bar',
        json: json,
        keys: {
          x: this.props.category,
          value: this.props.keys
        }
      },
      axis: {
        rotated: (this.props.reverseAxis === false) ? false : true,
        x: {
          label: this.props.xLabel,
          type: 'category'
        },
        y: {
          label: this.props.yLabel
        }
      }
    });

  }

  componentDidUpdate() {
    this.drawChart();
  }

  componentDidMount() {
    if (this.props.data)
      this.drawChart();
  }

  componentWillMount() {
    let renderFeature = FeatureFlag.check(this.props.identifier);
    this.render = renderFeature ? this.render : function() { return false; };
  }

  render() {
    return (
      <Row>
        <Col xs={12}>
          <h4>{this.props.title}</h4>
          <div ref='chartContainer' id="chartContainer"></div>
        </Col>
      </Row>
    );
  }

}

BarChart.defaultProps = {
  data: (() => {
    let times = 10;
    let date = new Date().getTime();
    var dataArray = [];

    for (var i = 0; i < times; i++) {
      dataArray.push( {
        thing: i,
        value: (Math.random() * 1000) | 0
      });
    }
    return dataArray;
  })(),
  keys: ['value'],
  category: 'thing',
  title: 'The title of the chart',
  xLabel: 'Thing',
  yLabel: 'Value of the Thing'
};

BarChart.propTypes = {
  data: React.PropTypes.array.isRequired,
  category: React.PropTypes.string.isRequired,
  keys: React.PropTypes.array.isRequired,
  title: React.PropTypes.string.isRequired,
  yLabel: React.PropTypes.string.isRequired
};
