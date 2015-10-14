import React from "react";
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import Comparator from "./Comparator";
import Filters from "./Filters";
import DateRange from "./DateRange";
import QueryActions from '../actions/QueryActions';

const styles = {
  modifierWrapper : {
    'padding': '10px 0 15px 0',
    'borderBottom': '1px solid #ccc'
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
      from: dates.startDate.format('YYYY-MM-DD'),
      to: dates.endDate.format('YYYY-MM-DD')
    });
  }

  handleComparatorChange (e) {
    QueryActions.selectComparator(e.target.textContent);
  }

  handleFilterChange (e) {
    QueryActions.selectFilter({
      key: e.target.name,
      value: e.target.value
    });
  }

  render() {
    return (
      <div className='sectionModifier' style={styles.modifierWrapper}>
        <Row>
          <Col sm={2} xs={12}>
            <span style={styles.title}>Comparators:</span>
          </Col>
          <Col sm={10} xs={12}>
            <Comparator
              tags={this.props.tags}
              onChange={this.handleComparatorChange}
              currentComparator={this.props.query.comparator}
              uuid={this.props.uuid} />
          </Col>
        </Row>

        <Row >
          <Col sm={2} xs={12}>
            <span style={styles.title}>Filters:</span>
          </Col>
          <Filters
            renderDevice={this.props.renderDevice}
            renderRegion={this.props.renderRegion}
            renderReferrers={this.props.renderReferrers}
            renderUserCohort={this.props.renderUserCohort}
            onChange={this.handleFilterChange} />
        </Row>

        <Row>
          <Col sm={2} xs={12}>
            <span style={styles.title}>Date Range:</span>
          </Col>
          <Col sm={4} xs={12}>
            <DateRange
              onChange={this.handleDateRangeChange}
              startDate={this.props.query.dateFrom}
              endDate={this.props.query.dateTo} />
          </Col>
        </Row>
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
