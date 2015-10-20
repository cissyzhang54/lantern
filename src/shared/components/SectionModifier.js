import React from "react";
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import Comparator from "./Comparator";
import Filters from "./Filters";
import DateRange from "./DateRange";
import QueryActions from '../actions/QueryActions';

const styles = {
  modifierWrapper : {
    'padding': '10px 15px 15px 15px',
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
    let link = e.currentTarget.href.split('/')
    if(this.className.indexOf('selected') === -1) {
      QueryActions.selectComparator({
        comparator:link.pop(),
        comparatorType:link.pop()
      });
    } else {
      QueryActions.removeComparator();
    }
  }

  handleFilterChange (e) {
    QueryActions.selectFilter({
      key: e.target.name,
      value: e.target.value
    });
  }

  render() {

    let data = this.props.data
    let arrAuthors = data.author;
    if (!Array.isArray(arrAuthors)) arrAuthors = [arrAuthors]
    let tags = [{label:'FT',url:`global/FT`}]
      .concat(
      data.topics.map(d => {return {label:d, url:`topic/${d}`}})
    ).concat(
      data.sections.map(d => {return {label:d, url:`section/${d}`}})
    ).concat(
      data.genre.map(d => {return {label:d, url:`genre/${d}`}})
    ).concat(
      arrAuthors.map(d => {return {label:d, url:`author/${d}`}})
    )

    return (
      <div className='sectionModifier' style={styles.modifierWrapper}>
        <Row>
          <Col sm={2} xs={12}>
            <span style={styles.title}>Comparators:</span>
          </Col>
          <Col sm={10} xs={12}>
            <Comparator
              tags={tags}
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
  data: React.PropTypes.object.isRequired
};

Modifier.defaultProps = {
  renderDateRange : true,
  renderComparator : true,
  renderFilters : true,
  query : { currentComparator: null }
};
