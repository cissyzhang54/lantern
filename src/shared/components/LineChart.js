import React from 'react';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import isBrowser from '../utils/isBrowser';
import Input from 'react-bootstrap/lib/Input';
import moment from 'moment';

let c3 = {};

if (isBrowser()) {
  c3 = require('c3');
}

export default class LineChart extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      localTime : false
    }
  }

  drawChart() {
    let node = React.findDOMNode(this.refs.chartContainer);
    let json = this.props.data.map((d) => {
      d.time = moment(d.time);
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

    this.chart = c3.generate({
      bindto: node,
      transition: {
        duration: null,
      },
      padding: {
        right: 20
      },
      data: {
        type: 'line',
        xFormat: '%Y-%m-%dT%H:%M:%SZ',
        json: json,
        keys: {
          x: 'time',
          value: this.props.keys
        }
      },
      axis: {
        x: {
          type: 'timeseries',
          label: xLabel,
          tick: {
            // XXX make this dynamic - take a cue from
            // the date range
            fit: !this.state.localTime,
            format: '%d %b %H:%M:%S',
            width: labelWidth,
            count: labelCount
          },
          localtime: this.state.localTime
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

  _handleLocalTimeSwitch(event) {
    const checked = this.refs.localTimeInput.getChecked();
    this.setState({localTime: checked});
  }

  render() {
    return (
      <div>
        <div
          ref='chartContainer'
          id="chartContainer"
          >
        </div>
        <Input
          type="checkbox"
          ref="localTimeInput"
          label="Display dates in Local Time"
          checked={this.state.localTime}
          onChange={this._handleLocalTimeSwitch.bind(this)}
        />
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
  yLabel: 'Y Axis Label'
};

LineChart.propTypes = {
  data: React.PropTypes.array.isRequired,
  keys: React.PropTypes.array.isRequired,
  title: React.PropTypes.string.isRequired,
  yLabel: React.PropTypes.string.isRequired
};
