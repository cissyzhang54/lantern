import React from "react";
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Popover from 'react-bootstrap/lib/Popover';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Comparator from "./Comparator";
import Filters from "./Filters";
import DateRange from "./DateRange";
import ModifierDescription from "./ModifierDescription";
import ArticleQueryActions from '../actions/ArticleQueryActions';
import ComparatorQueryActions from '../actions/ComparatorQueryActions';

const styles = {
  modifierWrapper : {
    'padding': '10px 15px 15px 15px',
    'borderBottom': '1px solid #ccc'
  },
  title : {
    lineHeight: '2em',
  },
  titleText : {
    'paddingLeft': '0px'
  },
  descriptorText : {
    'paddingLeft': '4px',
    'color': '#555',
    'fontSize': '14px',
    'margin': '4px 0'
  },

  infoIcon : {
    'fontSize' : '15px',
    'color': '#039',
    'position': 'absolute',
    'top': '8px',
    'left': '-4px'
  }
};

function decode(uri){
  return uri ? decodeURI(uri) : null
}

export default class Modifier extends React.Component {

  constructor(props) {
    super(props);
  }

  handleDateRangeChange (dates) {
    let updatedDates = {
      from: dates.startDate.format('YYYY-MM-DD'),
      to: dates.endDate.format('YYYY-MM-DD')
    }
    ArticleQueryActions.selectDateRange(updatedDates);
    ComparatorQueryActions.selectDateRange(updatedDates);
  }

  handleFilterChange (selectedFilters) {
    ArticleQueryActions.selectFilter(selectedFilters);
    ComparatorQueryActions.selectFilter(selectedFilters);
  }

  render() {

    let data = this.props.data
    let comparatorData = this.props.comparatorData
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
      <div data-component='sectionModifier' style={styles.modifierWrapper}>
        <Row>
          <Col sm={2} xs={12}>
            <span style={styles.title}>
              <OverlayTrigger
                trigger="hover"
                placement="bottom"
                overlay={
                  <Popover >
                      <p>When you select a Tag, Lantern will compare this article against all other articles with the same Tag;
                       only those articles published in the 30 days before this article's publication date are included</p>
                  </Popover>
                  }
                >
                <Glyphicon glyph="question-sign" style={styles.infoIcon} />
              </OverlayTrigger>
              <span style={styles.titleText}>Tags:</span>
            </span>

          </Col>
          <Col sm={10} xs={12}>
            <Comparator
              tags={tags}
              currentComparator={this.props.query.comparator}
              uuid={this.props.uuid} />
          </Col>
        </Row>

        <Row >
          <Col sm={2} xs={12}>
            <span style={styles.title}><span style={styles.titleText}>Filters:</span></span>
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
            <span style={styles.title}><span style={styles.titleText}>Date Range:</span></span>
          </Col>
          <Col sm={4} xs={12}>
            <DateRange
              onChange={this.handleDateRangeChange}
              startDate={this.props.query.dateFrom}
              endDate={this.props.query.dateTo} />
          </Col>
        </Row>

        <Row>
          <Col sm={2} xs={12}>
            <span style={styles.title}></span>
          </Col>
          <Col sm={10} xs={12}>
            <div style={styles.descriptorText}>
              <ModifierDescription
                articleCount={comparatorData.distinctArticleCount}
                comparator={this.props.query.comparator}
                />
            </div>
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
