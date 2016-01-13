import React from 'react';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import Filter from './Filter';

class Filters extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let filters = [
      {
        name: 'Region',
        label: 'Region',
        options: this.props.availableFilters.regions
      },
      {
        name: 'Device',
        label: 'Device',
        options: this.props.availableFilters.devices
      },
      {
        name: 'UserCohort',
        label: 'User Type',
        options: this.props.availableFilters.cohort
      },
      {
        name: 'Referrers',
        label: 'Traffic Source',
        options: this.props.availableFilters.referrers
      }
    ];

    let filterDropDowns = filters.map((f, i) => {
      return (
        <Col xs={6} sm={3} key={i}>
          <Filter
            name={f.name}
            label={f.label}
            options={f.options}
            onChange={this.props.onChange}
            />
        </Col>
      );
    });

    return (
      <Col sm={10} xs={12} className='filters' data-component='filters'>
        <Row>
          {filterDropDowns}
        </Row>
      </Col>
    );
  }
}

Filters.propTypes = {
  onChange: React.PropTypes.func
}

Filters.defaultProps = {
  onChange: _ => {console.log(_)}
}


export default Filters;
