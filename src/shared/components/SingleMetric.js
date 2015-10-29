import React from 'react';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import responsiveStyles from '../utils/responsiveStyles';
import assign from 'object-assign';

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
      fontSize: '1.5em',
      transform: 'translateZ(0)'
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

function getPercentageDifference (compared , comparator) {
  return ((Math.abs(compared-comparator)/ comparator) * 100) | 0;
}

function checkSignClass (x) {
  let [color, ret] = (x < 0) ? ['red','down'] : ['green', 'up'];
  componentStyles['default'].comparatorSymbol.color = color;
  componentStyles['default'].comparatorValue.color = color;
  return ret;
}

let convert = {
  secondsToMinutes: (seconds) => {
    seconds = Math.abs(seconds)
    let metricMinutes = Math.floor(seconds / 60);
    let metricSeconds = Math.floor(seconds - metricMinutes * 60);
    return {minutes: metricMinutes, seconds: metricSeconds};
  },
  percentageDifference: (metric, comparatorMetric) => {
    if (!comparatorMetric) return [null, null]
    let comparatorDifference = getPercentageDifference(metric, comparatorMetric);
    let differenceSign = checkSignClass(metric - comparatorMetric);
    return [differenceSign, comparatorDifference + '%'];
  },
  time: (metric, comparatorMetric)=> {
    let convertedMetric = convert.secondsToMinutes(metric);
    let transformMetric = convertedMetric.minutes + 'm ' + convertedMetric.seconds + 's';
    let [differenceSign, transformComparator] = convert.percentageDifference(metric, comparatorMetric)
    return [transformMetric, differenceSign, transformComparator];
  },
  integer:  (metric, comparatorMetric)=>{
    let transformMetric = (metric || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") // Add commas to output
    let [differenceSign, transformComparator] = convert.percentageDifference(metric, comparatorMetric)
    return [transformMetric, differenceSign, transformComparator];
  },
  percentage:  (metric, comparatorMetric)=>{
    let transformMetric = (metric || 0) +"%";
    let [differenceSign, transformComparator] = convert.percentageDifference(metric, comparatorMetric)
    return [transformMetric, differenceSign, transformComparator];
  }
};

export default class SingleMetric extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      responsiveStyles : componentStyles['default']
    };
  }

  componentDidMount() {
    responsiveStyles.addListeners(this, componentStyles);
  }

  componentWillUnmount() {
    responsiveStyles.removeListeners(this);
  }

  render() {
    let comparatorHTML;
    let styles = this.state.responsiveStyles;
    let [transformMetric, differenceSign, transfromComparator] =
      convert[this.props.metricType](this.props.metric, this.props.comparatorMetric)
    let comparatorStatLabel = this.props.comparatorName + ' ' + this.props.label + ' average : ' + Math.round(this.props.comparatorMetric)

    //If there is no comparator leave the comparator HTML undefined
    if (!!transfromComparator) {
      comparatorHTML = (
        <span style={styles.comparator} title={comparatorStatLabel}>
          <Glyphicon glyph={'glyphicon glyphicon-chevron-' + differenceSign} style={styles.comparatorSymbol} />
          <span style={styles.comparatorValue}>{transfromComparator}</span>
        </span>
      );
    }

    return (
      <div className={'singleMetric'} style={assign(styles[this.props.size], styles.singleMetric)} data-component={'singleMetric'}>
        <p style={styles.metric}>{transformMetric} {comparatorHTML}</p>
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
  metric: 0,
  metricType: 'integer',
  size: 'large'
};
