import React from 'react';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import FeatureFlag from '../utils/featureFlag';
import Filter from './Filter';

const filters = [
  {
    name: 'Region',
    label: 'Region',
    options: ['UK', 'US', 'EUROPE', 'ASIA', 'MIDDLEEAST', 'INDIA'].sort()
  },
  {
    name: 'Device',
    label: 'Device',
    options: ['Mobile Phone', 'Tablet', 'Desktop', 'Media Player', 'TV', 'Games Console', 'Set Top Box','eReader', 'Camera'].sort()
  },
  {
    name: 'UserCohort',
    label: 'User Cohort',
    options: ['subscriber', 'anonymous', 'registered'].sort()
  },
  {
    name: 'Referrers',
    label: 'Referrers',
    options: ['search', 'partner', 'social-network'].sort()
  }
]

export default class Filters extends React.Component {
  render() {
    var filterDropDowns = filters.map((f, i) => {

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
      <div>
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

