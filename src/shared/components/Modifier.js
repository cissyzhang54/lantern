import React from "react";
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';

import Comparator from "./Comparator";
import Filters from "./Filters";
import DateRange from "./DateRange";
import QueryActions from '../actions/QueryActions';


const style = {
  'margin': '10px 0',
  'padding': '10px 0',
  'borderBottom': '1px solid #ccc'
};

export default class Modifier extends React.Component {

  constructor(props) {
    super(props);
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
    let renderDateRange = this.props.renderDateRange;
    let renderComparator = this.props.renderComparator;
    let renderFilters = this.props.renderFilters;
    let dateRangeRow = <Row >
          <Col sm={2} xs={12}>
            <strong>Date Range:</strong>
          </Col>
          <Col sm={4} xs={6}>
            <DateRange
              onChange={this.handleDateRangeChange}
              />
          </Col>
        </Row>
    let comparatorRow = <Row >
          <Comparator
            identifier={'article:modifier:comparator'}
            tags={this.props.tags}
            onChange={this.handleComparatorChange}
            currentComparator={this.props.query.comparator}
            uuid={this.props.uuid}
            />
        </Row>
    let filtersRow = <Row >
          <Filters
            identifier={'article:modifier:filters'}
            onChange={this.handleFilterChange}
            />
        </Row>

    return (
      <div style={style}>
        {renderComparator ? comparatorRow : {}}
        {renderFilters ? filtersRow : {}}
        {renderDateRange ? dateRangeRow : {}}
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
