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
    let keys = this.props.keys;
    let yLabel = this.props.yLabel;
    if (this.props.usePercentages) {
      keys = keys.map((k) => {
        return k + ' %';
      });
      yLabel += ' (%)';
    }
    this.chart = c3.generate({
      bindto: node,
      transition: {
        duration: null,
      },
      data: {
        type: 'bar',
        json: json,
        keys: {
          x: this.props.category,
          value: keys
        }
      },
      axis: {
        rotated: this.props.reverseAxis,
        x: {
          label: this.props.xLabel,
          type: 'category'
        },
        y: {
          label: yLabel,
          max: this.props.usePercentages ? 100 : null,
          min: this.props.usePercentages ? 0 : null,
          padding: {
            top: 0,
            bottom: 0
          }
        }
      },
      tooltip : {
        format : {
          value: (value, ratio, id, index) => {
            if (id.indexOf('%') >= 0) {
              var val = json[index][id.replace(' %', '')];
              return value + '% (' + val + ')';
            }
            return value;
          }
        }
      },
      title: this.props.title || null
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
      <div data-component={this.props.componentName}>
        <div ref='chartContainer' id="chartContainer"></div>
      </div>
    );
  }
}

BarChart.defaultProps = {
  data: (() => {
    let times = 10;
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
  yLabel: 'Value of the Thing',
  reverseAxis: true,
  componentName: 'barChart',
  usePercentages: false
};

BarChart.propTypes = {
  data: React.PropTypes.array.isRequired,
  category: React.PropTypes.string.isRequired,
  keys: React.PropTypes.array.isRequired,
  yLabel: React.PropTypes.string.isRequired
};
