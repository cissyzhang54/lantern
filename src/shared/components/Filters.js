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
      label: 'User Cohort',
      options: []
    },
    {
      name: 'Referrers',
      label: 'Referrers',
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
          label: 'User Cohort',
          options: filterState.cohort
        },
        {
          name: 'Referrers',
          label: 'Referrers',
          options: filterState.referrers
        }
      ]
    };

  }

  render() {
    let filterDropDowns = this.props.filters.map((f, i) => {

      if (!this.props['render' + f.name]){
        return {}
      }
      return (
        <Col sm={2} xs={6} key={i}>
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
      <div className='filters'>
        {filterDropDowns}
      </div>
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
