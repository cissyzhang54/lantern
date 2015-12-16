import React from 'react';
import ReactDOM from 'react-dom';
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

export default class DualScaleLineChart extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      localTime : true
    }
  }

  drawChart() {
    let node = this.refs.chartContainer;
    let [attr1, attr2] = this.props.categories
    let [leftKey, rightKey] = this.props.keys

    let json1 = this.props.leftData.map((d) => {
      if (this.props.type === 'timeseries' && typeof d[attr1] === 'string')
        d[attr1] = moment(d[attr1].replace(':000Z',':00.000Z'));//hack for now
      return d;
    });

    let json2 = this.props.rightData.map((d) => {
      if (this.props.type === 'timeseries' && typeof d[attr2] === 'string')
        d[attr2] = moment(d[attr2].replace(':000Z',':00.000Z'));//hack for now
      return d;
    });

    let merged = json1.map(j1 => {
      let i = 0;
      while (json2.length && i < json2.length) {
        let j2 = json2[i];
        if (!j2[attr2].diff(j1[attr1])) {
          j1[rightKey] = j2[rightKey]
          json2.splice(i, 1);
          break;
        } else {
          i++;
        }
      }
      return j1;
    });

    json2.forEach(function(j2) {
      merged.push({
        [leftKey] : 0,
        [rightKey] : j2[rightKey],
        [attr1] : j2[attr2]
      })
    });
    // turn all the moments into isoStrings because c3
    // doesn't know what to do with moments anymore wtf ;_;
    merged.forEach((d) => d[attr1] = d[attr1].toISOString())

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
    if (json1.length > 1) {
      let step = moment.duration(json1[1][attr1] - json1[0][attr1]);
      let span = moment.duration(json1[json1.length - 1][attr1] - json1[0][attr1] );
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
      json : merged,
      keys: {
        x: attr1,
        value: this.props.keys
      },
      axes: {
        [leftKey] : 'y',
        [rightKey] : 'y2'
      },
      colors: chartHelpers.getKeyColourMapping(this.props.keys)
    }



    if (this.chart) {
      dataObject.unload = true;
      this.chart.load(dataObject);
        return;
    }

    this.chart = c3.generate({
      bindto: node,
      transition: {
        duration: null,
      },
      data: dataObject,
      axis: {
        x: {
          type: this.props.type,
          label: {
            text: xLabel,
            position: 'outer-center'
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
        },
        y2: {
          label: {
            text: this.props.y2Label,
            position: 'outer-top'
          },
          show: true,
          padding: {
            bottom: 0
          },
          min: 0,
          tick: {
            format: function(val) {
              return val / 1000 + "K";
            }
          }
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
    if (this.props.rightData && this.props.leftData)
      this.drawChart();
  }

  shouldComponentUpdate(nextProps) {
    return !_.isEqual(this.props, nextProps);
  }

  componentWillUnmount() {
    this.chart && this.chart.destroy();
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
      <div data-component='dualScaleLineChart'>
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

DualScaleLineChart.defaultProps = {
  leftData: (() => {
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
  rightData: (() => {
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
  keys: ['value', 'value'],
  title: 'The title of the chart',
  xLabel: 'Time',
  yLabel: 'Left Y Axis Label',
  y2Label: 'Right Y Axis Label',
  type: 'timeseries'
};

DualScaleLineChart.propTypes = {
  leftData: React.PropTypes.array.isRequired,
  rightData: React.PropTypes.array.isRequired,
  keys: React.PropTypes.array.isRequired,
  title: React.PropTypes.string.isRequired,
  yLabel: React.PropTypes.string.isRequired,
  y2Label: React.PropTypes.string.isRequired,
  type: React.PropTypes.string
};
