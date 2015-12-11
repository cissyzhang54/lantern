import React from 'react';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import FeatureFlag from '../utils/featureFlag';
import Filter from './Filter';
import connectToStores from 'alt/utils/connectToStores';

import FilterStore from '../stores/FilterStore.js';

const DEFAULT_STATE = {

  filters : [
    {
      name: 'Region',
      label: 'Region',
      options: []
    },
    {
      name: 'Device',
      label: 'Device',
      options: []
    },
    {
      name: 'UserCohort',
      label: 'User Type',
      options: []
    },
    {
      name: 'Referrers',
      label: 'Traffic Source',
      options: []
    }
  ]
};

class Filters extends React.Component {

  constructor(props) {
    super(props);
    this.state = DEFAULT_STATE;
  }

  static getStores() {
    return [FilterStore];
  }

  static getPropsFromStores() {
    let filterState = FilterStore.getState();

    return {
      filters : [
        {
          name: 'Region',
          label: 'Region',
          options: filterState.regions
        },
        {
          name: 'Device',
          label: 'Device',
          options: filterState.devices
        },
        {
          name: 'UserCohort',
          label: 'User Type',
          options: filterState.cohort
        },
        {
          name: 'Referrers',
          label: 'Traffic Source',
          options: filterState.referrers
        }
      ]
    };
  }

  render() {
    let filterDropDowns = this.props.filters.map((f, i) => {
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


export default connectToStores(Filters);
