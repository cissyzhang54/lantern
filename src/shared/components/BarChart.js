import React from 'react';
import isBrowser from '../utils/isBrowser';
import responsiveStyles from '../utils/responsiveStyles';
import chartHelpers from '../utils/chartHelpers';
import _ from 'underscore';
import md5 from 'md5';
import d3 from 'd3';

let c3 = {};

if (isBrowser()) {
  c3 = require('c3');
}

var controllerStyles = {
  'default': {},
  '(max-width: 500px)' : {}
};

export default class BarChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      responsiveStyles : controllerStyles['default']
    };
  }

  drawChart() {
    let node = this.refs.chartContainer;
    let json = this.props.data;
    let keys = this.props.keys;
    let yLabel = this.props.yLabel;
    let rotated = this.props.reverseAxis;
    let usePercentages = this.props.usePercentages;
    let formatter = d3.format(',n');
    // Naïve checksumming on the chart data
    // if the checksums are the same, no need to redraw the chart
    let dataChecksum = md5(JSON.stringify(json));
    if (this.state.dataChecksum === dataChecksum) {
      // Data has not changed
      return;
    }

    this.setState({ dataChecksum });

    if (this.props.usePercentages) {
      keys = keys.map((k) => {
        return k + ' %';
      });
      yLabel += ' (%)';
    }

    if (this.state.matches && this.props.reverseMobileAxis) {
      rotated = true;
    }

    let dataObject = {
      type: 'bar',
      json: json,
      keys: {
        x: this.props.category,
        value: keys
      },
      colors: chartHelpers.getKeyColourMapping(keys)
    }

    if(this.chart) {
      this.chart.load(dataObject);
      return;
    }

    const tooltipFormatter = (val, ratio, id, index) => {
      const json = this.props.data;
      if (usePercentages) {
        const theValue = json[index][id.replace(' %', '')];
        return val + '% (' + formatter(theValue) + ')';
      } else {
        const pct = json[index][id + ' %'];
        return formatter(val) + ' (' + pct + '%)';
      }
    }

    this.chart = c3.generate({
      bindto: node,
      transition: {
        duration: null
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
        rotated: rotated,
        x: {
          label: {
            text: this.props.xLabel,
            position: 'outer-right'
          },
          type: 'category',
          height: 50
        },
        y: {
          label: {
            text: yLabel,
            position: 'outer-top'
          },
          max: usePercentages ? 100 : null,
          min: usePercentages ? 0 : null,
          padding: {
            top: 0,
            bottom: 0
          }
        }
      },
      tooltip : {
        format : {
          value: tooltipFormatter
        }
      },
      title: this.props.title || null
    });

    node.chart = this.chart;
  }

  componentDidUpdate(oldProps, oldState) {
    if ((this.state.matches !== oldState.matches)) {
      this.chart.destroy();
      delete this.chart;
    }
    setTimeout(this.drawChart.bind(this), 0);
  }

  componentDidMount() {
    responsiveStyles.addListeners(this, controllerStyles);

    if (this.props.data)
      this.drawChart();
  }

  componentWillUnmount() {
    responsiveStyles.removeListeners(this);
    this.chart && this.chart.destroy();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !_.isEqual(this.props, nextProps) || !_.isEqual(this.state, nextState);
  }

  render() {
    return (
      <div data-component={this.props.componentName}>
        <div
          ref='chartContainer'
          id="chartContainer"
        >
        </div>
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
  usePercentages: false,
  reverseMobileAxis: false
};

BarChart.propTypes = {
  category: React.PropTypes.string.isRequired,
  //data: React.PropTypes.array.isRequired,
  //keys: React.PropTypes.array.isRequired,
  yLabel: React.PropTypes.string.isRequired
};
