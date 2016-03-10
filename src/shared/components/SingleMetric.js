import React from 'react';
import ReactCSS from 'reactcss';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import assign from 'object-assign';
import Popover from 'react-bootstrap/lib/Popover';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Button from 'react-bootstrap/lib/Button';
import convert from '../utils/convertUnits';


export default class SingleMetric extends ReactCSS.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  classes () {
    return {
      'default': {
        large: {
          fontSize: '1.2em',
          margin: '0.5em'
        },
        medium: {
          fontSize: '1.0em',
          margin: '0.5em'
        },
        small: {
          fontSize: '0.8em',
          margin: '0.5em'
        },
        singleMetric: {
          textAlign: 'center'
        },
        label: {
          padding: 0,
          margin: 0,
          marginBottom: '10px',
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
          fontSize: '0.6em',
          marginTop: '10px'
        },
        comparatorSymbol: {
          display: 'inline-block',
          margin: '0 5px',
          verticalAlign: 'bottom'
        },
        comparatorValue: {
          fontSize: '1.0em'
        },
        infoIcon: {
          cursor: 'pointer',
          color: '#039'
        },
        'compColor-green' : {
          color: 'green'
        },
        'compColor-red' : {
          color: 'red'
        }
      },
      'horizontal': {
        large: {
          fontSize: '1.0em',
          margin: '1.0em'
        },
        medium: {
          fontSize: '1.0em',
          margin: '1.0em'
        },
        small: {
          fontSize: '1.0em',
          margin: '1.0em'
        },
        singleMetric : {
          textAlign: 'left'
        },
        label : {
          display: 'inline-block',
          marginBottom: '0px',
          lineHeight: '1.8em'
        },
        metric : {
          fontSize: '1.0em',
          display: 'inline-block',
          float: 'right',
          lineHeight: '1.5em',
          margin: '0'
        },
        comparator: {
          fontSize: '0.8em',
          lineHeight: '1.0em',
          display: 'inline-block'
        }
      }
    }
  }

  render() {
    let comparatorHTML;

    let [transformMetric, differenceSign, transfromComparator] =
      convert[this.props.metricType](this.props.metric, this.props.comparatorMetric);
    let comparatorStatLabel = this.props.comparatorName + ' ' + this.props.label + ' average : ' + Math.round(this.props.comparatorMetric);
    // let showGraphButton = this.props.showGraphButton;

    let compColor = (differenceSign === 'down') ? {color: 'red'} : {color: 'green'};

    //If there is no comparator leave the comparator HTML undefined
    if (transfromComparator) {
      comparatorHTML = (
        <span
          style={this.styles().comparator}
          title={comparatorStatLabel}
        >
          <Glyphicon
            glyph={'glyphicon glyphicon-chevron-' + differenceSign}
            style={assign(this.styles().comparatorSymbol, compColor)}
          />
          <span
            style={assign(this.styles().comparatorValue, compColor)}
          >
            {transfromComparator}
          </span>
        </span>
      );
    }

    let toolTip;
    if (this.props.toolTip) {
      let toolTipTitle = this.props.label.replace(/\s+/g, '-').toLowerCase() + "-description";
      toolTip = (
        <OverlayTrigger
          trigger="click"
          placement="bottom"
          rootClose
          overlay={
              <Popover id={toolTipTitle}>
                {this.props.toolTip}
              </Popover>
            }
        >
          <span>
            <Glyphicon
              glyph="question-sign"
              style={this.styles().infoIcon}
              aria-describedby={toolTipTitle}
            />
          </span>
        </OverlayTrigger>
      );
    }

    let button = null;

    if (this.props.handler) {
      let buttonActive = this.props.name == this.props.handler.currentMetric ? true : false;
      button = (
        <Button active={buttonActive} onClick={this.props.handler.onClick}>
          {'Show Chart'}
        </Button>
      );
    }

    return (
      <div
        className={'singleMetric'}
        style={this.styles().singleMetric}
        data-component={'singleMetric'}
      >
        <h3 style={this.styles().label}>{this.props.label} {toolTip}</h3>
        <p style={this.styles().metric}>{transformMetric} {comparatorHTML}</p>
        {button}
      </div>
    );
  }
}

SingleMetric.propTypes = {
  comparatorMetric: React.PropTypes.number,
  comparatorName: React.PropTypes.string,
  label: React.PropTypes.string.isRequired,
  metric: React.PropTypes.number,
  metricType: React.PropTypes.oneOf(['integer', 'time', 'percentage']).isRequired,
  onClick: React.PropTypes.func,
  size: React.PropTypes.oneOf(['small', 'medium', 'large']).isRequired
};

// Exclude comparator as this is an optional field
SingleMetric.defaultProps = {
  metric: 0,
  metricType: 'integer',
  size: 'large',
  label: 'Default'
};
