import React from 'react';
import RangePicker from 'react-daterange-picker';
import moment from 'moment';
import {} from 'moment-range';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import Button from 'react-bootstrap/lib/Button';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Overlay from 'react-bootstrap/lib/Overlay';
import Popover from 'react-bootstrap/lib/Popover';
import Input from 'react-bootstrap/lib/Input';
import FeatureFlag from '../utils/featureFlag';


export default class DateRange extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      display: false,
      value:  {
        start: moment().add(-1, 'weeks').startOf('day'),
        end: moment().startOf('day')
      }
    };
  }

  handleSelect(value) {
    this.setState({
      value: value,
      display: false
    });
    this.props.onChange(value);
  }

  toggleRangePicker() {
    this.setState({
      display: !this.state.display
    });
  }

  componentWillMount () {
    let renderFeature = FeatureFlag.check(this.props.identifier);
    this.render = renderFeature ? this.render : function () { return false };
  }

  render() {

    const divStyle = {
      fontWeight: "600"
    };

    const overlayProps = {
      show: this.state.display,
      container: this,
      target : () => React.findDOMNode(this.refs.target),
      placement: 'bottom'
    };

    const overlayStyle = {
      position: 'absolute',
      backgroundColor: '#EEE',
      boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)',
      border: '1px solid #CCC',
      borderRadius: 3,
      marginLeft: -5,
      marginTop: -5,
      padding: 10,
      zIndex: 1
    };

    return (
      <div style={{position: 'relative'}}>
        <Row ref='target'>
          <Col sm={2} xs={12}>
            <div style={divStyle}>Date Range:</div>
          </Col>
          <Col sm={4} xs={6}>
            <Input type="text"
               bsSize='small'
              value={this.state.value ? this.state.value.start.format('LL') : null}
              readOnly={true}
               addonBefore="Start Date"
              onClick={this.toggleRangePicker.bind(this)}
              placeholder="Start date"/>
          </Col>
          <Col sm={4} xs={6}>
            <Input type="text"
               bsSize='small'
               addonBefore="End Date"
              value={this.state.value ? this.state.value.end.format('LL') : null}
              readOnly={true}
              onClick={this.toggleRangePicker.bind(this)}
              placeholder="End date" />
          </Col>
        </Row>
        <Overlay {...overlayProps}>
          <div style={overlayStyle}>
            <RangePicker
              firstOfWeek={1}
              numberOfCalendars={2}
              selectionType='range'
              minimumDate={moment().add(-2, 'year').toDate()}
              maximumDate={new Date()}
              onSelect={this.handleSelect.bind(this)}
              value={moment.range(this.state.value.start, this.state.value.end)}
             />
            <ButtonToolbar>
              <Button style={{float: 'right'}} onClick={this.toggleRangePicker.bind(this)}>
                Close
              </Button>
            </ButtonToolbar>
          </div>
        </Overlay>
      </div>
    );
  }
}

DateRange.propTypes = {
  identifier: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func,
};

DateRange.defaultProps = {
  onChange: (value) => {console.log(value);}
};
