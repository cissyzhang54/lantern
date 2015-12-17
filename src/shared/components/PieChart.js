import React from 'react';
import isBrowser from '../utils/isBrowser';
import _ from 'underscore';

let c3 = {};

if (isBrowser()) {
  c3 = require('c3');
}

export default class PieChart extends React.Component {

  constructor(props) {
    super(props);
  }

  drawChart() {
    let node = this.refs.chartContainer;
    if(this.chart) {
      this.chart.load({data: {
        type: 'pie',
        columns: this.props.data,
        unload: true
      }});

      return;
    }

    this.chart = c3.generate({
      bindto: node,
      transition: {
        duration: null
      },
      padding: {
        right: 20
      },
      color: {
        pattern: [
          // rgb colours
          'rgb(121,158,200)',
          'rgb(167,106,173)',
          'rgb(255,160,40)',
          'rgb(137,201,189)',
          'rgb(231,111,95)'
        ]
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

  componentWillUnmount() {
    this.chart && this.chart.destroy();
  }

  shouldComponentUpdate(nextProps) {
    return !_.isEqual(this.props, nextProps);
  }

  render() {
    return (
      <div data-component='pieChart'>
        <div
          ref='chartContainer'
          id="chartContainer"
        >
        </div>
      </div>
    );
  }

}

PieChart.defaultProps = {
  data: [
    ['Mobile', 0.2, 0.2, 0.2, 0.2, 0.2, 0.4, 0.3, 0.2, 0.2, 0.1, 0.2, 0.2, 0.1, 0.1, 0.2, 0.4, 0.4, 0.3, 0.3, 0.3, 0.2, 0.4, 0.2, 0.5, 0.2, 0.2, 0.4, 0.2, 0.2, 0.2, 0.2, 0.4, 0.1, 0.2, 0.2, 0.2, 0.2, 0.1, 0.2, 0.2, 0.3, 0.3, 0.2, 0.6, 0.4, 0.3, 0.2, 0.2, 0.2, 0.2],
    ['Desktop', 1.4, 1.5, 1.5, 1.3, 1.5, 1.3, 1.6, 1.0, 1.3, 1.4, 1.0, 1.5, 1.0, 1.4, 1.3, 1.4, 1.5, 1.0, 1.5, 1.1, 1.8, 1.3, 1.5, 1.2, 1.3, 1.4, 1.4, 1.7, 1.5, 1.0, 1.1, 1.0, 1.2, 1.6, 1.5, 1.6, 1.5, 1.3, 1.3, 1.3, 1.2, 1.4, 1.2, 1.0, 1.3, 1.2, 1.3, 1.3, 1.1, 1.3],
    ['Toaster', 2.5, 1.9, 2.1, 1.8, 2.2, 2.1, 1.7, 1.8, 1.8, 2.5, 2.0, 1.9, 2.1, 2.0, 2.4, 2.3, 1.8, 2.2, 2.3, 1.5, 2.3, 2.0, 2.0, 1.8, 2.1, 1.8, 1.8, 1.8, 2.1, 1.6, 1.9, 2.0, 2.2, 1.5, 1.4, 2.3, 2.4, 1.8, 1.8, 2.1, 2.4, 2.3, 1.9, 2.3, 2.5, 2.3, 1.9, 2.0, 2.3, 1.8]
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
