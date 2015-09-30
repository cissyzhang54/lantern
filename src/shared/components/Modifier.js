import React from "react";
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import Comparator from "./Comparator";
import Filters from "./Filters";
import DateRange from "./DateRange";
import QueryActions from '../actions/QueryActions';

const styles = {
  modifierWrapper : {
    'padding': '15px 0',
    'borderBottom': '1px solid #ccc'
  },
  modiferRow : {
    marginBottom: "15px"
  },
  title : {
    lineHeight: '2em'
  }
};

export default class Modifier extends React.Component {

  constructor(props) {
    super(props);
  }

  handleDateRangeChange (dates) {
    QueryActions.selectDateRange({
      from: dates.startDate.toISOString(),
      to: dates.endDate.toISOString()
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
    let dateRangeRow = <Row>
      <Col sm={2} xs={12}>
        <strong style={styles.title}>Date Range:</strong>
      </Col>
      <Col sm={4} xs={6}>
        <DateRange
          onChange={this.handleDateRangeChange}
          startDate={this.props.query.dateFrom}
          endDate={this.props.query.dateTo} />
      </Col>
    </Row>;

    let comparatorRow = <Row style={styles.modiferRow}>
      <Col sm={2} xs={12}>
        <strong style={styles.title}>Comparators:</strong>
      </Col>
      <Col sm={10} xs={12}>
        <Comparator
          identifier={'article:modifier:comparator'}
          tags={this.props.tags}
          onChange={this.handleComparatorChange}
          currentComparator={this.props.query.comparator}
          uuid={this.props.uuid} />
      </Col>
    </Row>;

    let filtersRow = <Row >
      <Col sm={2} xs={12}>
        <strong style={styles.title}>Filters:</strong>
      </Col>
      <Filters
        onChange={this.handleFilterChange} />
    </Row>;

    return (
      <div style={styles.modifierWrapper}>
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
  tags: ['one', 'two', 'three'],
  renderDateRange : true,
  renderComparator : true,
  renderFilters : true,
  query : { currentComparator: null }
};
