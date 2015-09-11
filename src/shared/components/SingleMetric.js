import React from 'react';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import responsiveStyles from '../utils/responsiveStyles';
import assign from 'object-assign';
import FeatureFlag from '../utils/featureFlag';

var componentStyles = {
  'default': {
    large: {
      fontSize: '1.2em',
      margin: '1.2em',
    },
    medium: {
      fontSize: '1.0em',
      margin: '1.0em',
    },
    small: {
      fontSize: '0.8em',
      margin: '0.8em',
    },
    singleMetric: {
      textAlign: 'center'
    },
    label: {
      padding: 0,
      margin: 0,
      fontSize: '1.0em',
      color: '#666666'
    },
    metric: {
      padding: 0,
      margin: '0 0 2px 0',
      fontSize: '1.5em'
    },
    comparator: {
      display: 'block',
      fontSize: '0.6em'
    },
    comparatorSymbol: {
      display: 'inline-block',
      margin: '0 5px',
      verticalAlign: 'bottom'
    },
    comparatorValue: {
      fontSize: '1.0em'
    }
  },
  '(max-width: 500px)': {
    comparator: {
      display: 'inline-block'
    }
  }
};

function getPercentageDifference (x , y) {
  if (x > y) {
    return ((x - y) / y) * 100 | 0;
  } else {
    return ((y - x) / x) * 100 | 0;
  }
}

function checkSignClass (x) {
  if (x < 0) {
    componentStyles['default'].comparatorSymbol.color = 'red';
    componentStyles['default'].comparatorValue.color = 'red';
    return 'down';
  }
  else {
    componentStyles['default'].comparatorSymbol.color = 'green';
    componentStyles['default'].comparatorValue.color = 'green';
    return 'up';
  }
}

function convertSecondsToMinutes(seconds) {
  let metricMinutes = Math.floor(seconds / 60);
  let metricSeconds = seconds - metricMinutes * 60;

  return {minutes: metricMinutes, seconds: metricSeconds};
}

function timeMetricConversions (props) {
  let returnJSON = {};

  let convertedMetric = convertSecondsToMinutes(props.metric);
  returnJSON.transformMetric = convertedMetric.minutes + 'm ' + convertedMetric.seconds + 's';

  // If there is no comparator skip
  if (typeof props.comparatorMetric !== 'undefined') {
    let difference = props.metric - props.comparatorMetric;
    difference = Math.abs(difference); // Remove the sign from the difference minute and seconds conversion
    let compartorDifference = convertSecondsToMinutes(difference);
    returnJSON.differenceSign = checkSignClass(difference);
    returnJSON.transfromComparator = compartorDifference.minutes + 'm' + compartorDifference.seconds + 's';
  }

  return returnJSON;
}

function integerMetricConversions (props) {
  let returnJSON = {};

  returnJSON.transformMetric = props.metric.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Add commas to output

  // If there is no comparator skip
  if (typeof props.comparatorMetric !== 'undefined') {
    let difference = props.metric - props.comparatorMetric;
    returnJSON.differenceSign = checkSignClass(difference);

    let percentageDifference = getPercentageDifference(props.metric, props.comparatorMetric);
    returnJSON.transfromComparator = percentageDifference + '%';
  }

  return (returnJSON);
}

export default class SingleMetric extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      responsiveStyles : componentStyles['default']
    };
  }

  componentWillMount () {
    let renderFeature = FeatureFlag.check(this.props.identifier);
    this.render = renderFeature ? this.render : function () { return false };
  }

  componentDidMount() {
    responsiveStyles.addListeners(this, componentStyles);
  }

  componentWillUnmount() {
    responsiveStyles.removeListeners(this);
  }

  render() {
    let metricValues, comparatorHTML;
    let styles = this.state.responsiveStyles;

    // Do the correct metric conversions
    if (this.props.metricType === 'integer') {
      metricValues = integerMetricConversions(this.props);
    }
    else if (this.props.metricType === 'time') {
      metricValues = timeMetricConversions(this.props);
    }

    //If there is no comparator leave the comparator HTML undefined
    if (typeof metricValues.transfromComparator !== 'undefined') {
      comparatorHTML = (
        <span style={styles.comparator}>
          <Glyphicon glyph={'glyphicon glyphicon-chevron-' + metricValues.differenceSign} style={styles.comparatorSymbol} />
          <span style={styles.comparatorValue}>{metricValues.transfromComparator}</span>
        </span>
      );
    }

    return (
      <div className={'singleMetric'} style={assign(styles[this.props.size], styles.singleMetric)}>
        <p style={styles.metric}>{metricValues.transformMetric} {comparatorHTML}</p>
        <h3 style={styles.label}>{this.props.label}</h3>
      </div>
    );
  }
}

SingleMetric.propTypes = {
  metric: React.PropTypes.number.isRequired,
  metricType: React.PropTypes.oneOf(['integer', 'time']).isRequired,
  comparatorMetric: React.PropTypes.number,
  label: React.PropTypes.string.isRequired,
  size: React.PropTypes.oneOf(['small', 'medium', 'large']).isRequired
};

// Exclude comparator as this is an optional field
SingleMetric.defaultProps = {
  metric: 20000,
  metricType: 'integer',
  label: 'I am a single metric',
  size: 'large'
};
