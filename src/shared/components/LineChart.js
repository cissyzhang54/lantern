import React from 'react';
import ReactDOM from 'react-dom';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import isBrowser from '../utils/isBrowser';
import Input from 'react-bootstrap/lib/Input';
import moment from 'moment';
import _ from 'underscore';
import chartHelpers from '../utils/chartHelpers';
require('moment-duration-format');

let c3 = {};

if (isBrowser()) {
  c3 = require('c3');
}

export default class LineChart extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      localTime : true,
      unload: false
    }
  }

  drawChart() {
    let node = this.refs.chartContainer;
    let attr = this.props.category
    let json = this.props.data.map((d) => {
      if (this.props.type === 'timeseries' && typeof d[attr] === 'string')
        d[attr] = moment(d[attr].replace(':000Z',':00.000Z')).toISOString();//hack for now
      return d;
    });

    let labelCount = undefined;
    const labelWidth = 80;
    if (window && window.innerWidth < 900){
      labelCount = parseInt(window.innerWidth / labelWidth,10)
    }

    let xLabel = this.props.xLabel;

    if (this.state.localTime) {
      xLabel += ' (Local)';
    } else {
      xLabel += ' (UTC)';
    }

    let localTime = this.state.localTime;

    let formatStr = '%d %b %H:%M:%S';
    if (json.length > 1) {
      let step = moment.duration(json[1][attr] - json[0][attr]);
      let span = moment.duration(json[json.length - 1][attr] - json[0][attr]);
      if (step.years()) {
        formatStr = '%Y';
      } else if (step.months()) {
        formatStr = '%b';
      } else if (step.weeks()) {
        formatStr = 'Week %W'
      } else if (step.days()) {
        formatStr = '%d %b';
      } else {
        formatStr = '%d %b %H:%M';
      }
    }

    let dataObject = {
      type: 'line',
      xFormat: '%Y-%m-%dT%H:%M:%S.000Z',
      json: json,
      keys: {
        x: attr,
        value: this.props.keys
      },
      colors: chartHelpers.getKeyColourMapping(this.props.keys)
    };

    if(this.chart) {
      if (this.state.unload) {
        dataObject.unload = this.state.unload;
        this.chart.axis.labels({
          x : xLabel,
          y : this.props.yLabel
        });
      }


      this.chart.load(dataObject);
      return;
    }

    this.chart = c3.generate({
      bindto: node,
      transition: {
        duration: null,
      },
      padding: {
        right: 20
      },
      data: dataObject,
      axis: {
        x: {
          type: this.props.type,
          label: {
            text: xLabel,
            position: 'outer-right'
          },
          tick: {
            format: (this.props.type === 'timeseries') ? formatStr : numericFormat,
            width: labelWidth,
            count: labelCount
          },
          localtime: this.state.localTime
        },
        y: {
          label: {
            text: this.props.yLabel,
            position: 'outer-top'
          },
          padding: {
            bottom: 0
          },
          min: 0
        }
      },
      tooltip: {
        format: {
          title: (this.props.type === 'timeseries') ? timeSeriesFormat : numericFormat
        }
      }
    });

    function timeSeriesFormat(x) {
      let fmt = d3.time.format.utc('%c (UTC)');
      if (localTime) {
        fmt = d3.time.format('%c');
      }
      return fmt(x);
    }

    function numericFormat(x) {
      let duration = moment.duration(x, 'minutes');
      let fmt;
      if (duration.years()) {
        fmt = 'j'
      }

      return duration.format();
    }

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

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(this.props.keys, nextProps.keys)) {
      this.setState({unload: true});
    } else {
      this.setState({unload: false});
    }

  }

  shouldComponentUpdate(nextProps) {
    return !_.isEqual(this.props, nextProps);
  }

  _handleLocalTimeSwitch(event) {
    const checked = this.refs.localTimeInput.getChecked();
    this.setState({localTime: !checked});
  }

  render() {

    let input = (
      <div style={{fontSize: '0.85em'}}>
         <Input
          type="checkbox"
          ref="localTimeInput"
          label="Display dates in UTC"
          checked={!this.state.localTime}
          onChange={this._handleLocalTimeSwitch.bind(this)}
        />
      </div>
    );

    return (
      <div data-component='lineChart'>
        <div
          ref='chartContainer'
          id="chartContainer"
          >
        </div>
        {(this.props.type === 'timeseries') ? input : null}
      </div>
    );
  }

}

LineChart.defaultProps = {
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
  title: 'The title of the chart',
  xLabel: 'Time',
  yLabel: 'Y Axis Label',
  type: 'timeseries',
  realtime: false
};

LineChart.propTypes = {
  data: React.PropTypes.array.isRequired,
  keys: React.PropTypes.array.isRequired,
  title: React.PropTypes.string.isRequired,
  yLabel: React.PropTypes.string.isRequired,
  type: React.PropTypes.string
};
