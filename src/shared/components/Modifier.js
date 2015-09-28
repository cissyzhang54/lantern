import React from "react";
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';

import Comparator from "./Comparator";
import Filters from "./Filters";
import DateRange from "./DateRange";
import QueryActions from '../actions/QueryActions';
import FeatureFlag from '../utils/featureFlag';


const style = {
  'margin': '10px 0',
  'padding': '10px 0',
  'borderBottom': '1px solid #ccc'
};

export default class Modifier extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount () {
    let renderFeature = FeatureFlag.check(this.props.identifier);
    this.render = renderFeature ? this.render : function () { return false };
  }

  handleDateRangeChange (value) {
    QueryActions.selectDateRange({
      from: value.start.toISOString(),
      to: value.end.toISOString()
    });
  }

  handleComparatorChange (e) {
    QueryActions.selectComparator(e.target.textContent);
  }

  handleFilterChange (value) {
    // TODO connect to filter query action
  }

  render() {
    return (
      <div style={style}>
        <Comparator
          identifier={this.props.identifier + ':comparator'}
          tags={this.props.tags}
          onChange={this.handleComparatorChange}
          currentComparator={this.props.query.comparator}
          uuid={this.props.uuid}
          />
        <Filters
          identifier={this.props.identifier + ':filters'}
          onChange={this.handleFilterChange}
          />
        <DateRange
          identifier={this.props.identifier + ':DateRange'}
          onChange={this.handleDateRangeChange}
          />
      </div>
    );
  }
}

Modifier.propTypes = {
  tags: React.PropTypes.array.isRequired
};

Modifier.defaultProps = {
  tags: ['one', 'two', 'three']
};
