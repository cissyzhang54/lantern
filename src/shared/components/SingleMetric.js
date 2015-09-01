import React from 'react';

var styles = {
  label : {
    padding : 0,
    margin: 0,
    fontSize: '1.0em'
  },
  metric : {
    padding : 0,
    margin: 0,
    fontSize: '1.5em'
  },
  comparator : {
    fontSize: '1.0em'
  }
};

function getDifference (x , y) {
  return Math.round(((x - y) / y) * 100);
}

function checkSignClass (x) {
  if (x < 0) {
    styles.comparator.color = 'red';
    return {
      'symbol' : '⌄',
      'class' : 'down'
    }
  } else {
    styles.comparator.color = 'green';
    return {
      'symbol' : '⌃',
      'class' : 'up'
    }
  }
}

function getComparatorHTML (metric, comparitorMetric) {
  var difference = getDifference(metric, comparitorMetric);
  var differenceSign = checkSignClass(difference);

  // Remove the sign from the difference for display
  difference = Math.abs(difference);

  return (
    <span style={styles.comparator}>{differenceSign.symbol}{difference}%</span>
  )
}

export default class SingleMetric extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var comparatorHTML = getComparatorHTML(this.props.metric, this.props.comparitorMetric);
    var transformMetric = this.props.metric.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Add commas to output
    return (
      <div className={this.props.size}>
        <p style={styles.metric}>
          {transformMetric}
          {comparatorHTML}
        </p>
        <h3 style={styles.label}>{this.props.label}</h3>
      </div>
    )
  }
}

SingleMetric.propTypes = {
  metric: React.PropTypes.number.isRequired,
  metricType: React.PropTypes.string.isRequired,
  comparitorMetric: React.PropTypes.number.isRequired,
  label: React.PropTypes.string.isRequired,
  size: React.PropTypes.oneOf(['small', 'medium', 'large']).isRequired
};

SingleMetric.defaultProps = {
  metric: 2114,
  comparitorMetric: 2014,
  metricType: 'integer',
  label: 'I am a single metric',
  size: 'large'
};