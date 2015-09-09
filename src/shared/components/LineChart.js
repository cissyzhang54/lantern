import React from 'react';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import isBrowser from '../utils/isBrowser';

let c3 = {};

if (isBrowser()) {
  c3 = require('c3');
}

export default class LineChart extends React.Component {

  constructor(props) {
    super(props);
  }

  drawChart() {
    let node = React.findDOMNode(this.refs.chartContainer);
    let json = this.props.data.map((d) => {
      d.time = new Date(d.time);
      return d;
    });

    this.chart = c3.generate({
      bindto: node,
      transition: {
        duration: null,
      },
      padding: {
        right: 20
      },
      data: {
        type: 'spline',
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
          tick: {
            // XXX make this dynamic - take a cue from
            // the date range
            format: '%Y-%m-%dT%H:%M:%S'
          }
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
      <Row>
        <Col xs={12}>
          <h4>{this.props.title}</h4>
          <div ref='chartContainer' id="chartContainer"></div>
        </Col>
      </Row>
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
  title: 'The title of the chart'
};

LineChart.propTypes = {
  data: React.PropTypes.array.isRequired,
  keys: React.PropTypes.array.isRequired,
  title: React.PropTypes.string.isRequired
};
