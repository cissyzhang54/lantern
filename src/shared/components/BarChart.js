import React from 'react';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import isBrowser from '../utils/isBrowser';

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

  render() {
    return (
      <div>
        <div ref='chartContainer' id="chartContainer"></div>
      </div>
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
