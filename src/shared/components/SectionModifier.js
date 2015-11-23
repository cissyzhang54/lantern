import React from "react";
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Popover from 'react-bootstrap/lib/Popover';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Tags from "./Tags";
import Filters from "./Filters";
import DateRange from "./DateRange";
import ModifierDescription from "./ModifierDescription";
import explanationStrings from "../strings/explanations.js";

import ArticleQueryActions from '../actions/ArticleQueryActions';
import SectionQueryActions from '../actions/SectionQueryActions';
import ComparatorQueryActions from '../actions/ComparatorQueryActions';
import TopicQueryActions from '../actions/TopicQueryActions';

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

export default class Modifier extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.state.isSectionOrTopic = ['sections', 'topics'].indexOf(this.props.category) >= 0;
    this.state.isGlobalFTComparator = this.props.comparatorQuery.comparatorType === 'global';
  }

  handleDateRangeChange (dates) {
    let updatedDates = {
      from: dates.startDate.format('YYYY-MM-DD'),
      to: dates.endDate.format('YYYY-MM-DD')
    }

    TopicQueryActions.selectDateRange(updatedDates);
    SectionQueryActions.selectDateRange(updatedDates);
    ArticleQueryActions.selectDateRange(updatedDates);

    if (this.state.isSectionOrTopic && !this.state.isGlobalFTComparator) {
      // Topics and sections
      let span = dates.endDate - dates.startDate;

      let topicAndSectionUpdatedDates = {
        from: dates.startDate.clone().subtract(span, 'milliseconds').format('YYYY-MM-DD'),
        to: dates.endDate.clone().subtract(span, 'milliseconds').format('YYYY-MM-DD')
      }
      ComparatorQueryActions.selectDateRange(topicAndSectionUpdatedDates);
    } else {
      ComparatorQueryActions.selectDateRange(updatedDates);
    }

  }

  handleFilterChange (selectedFilters) {
    TopicQueryActions.selectFilter(selectedFilters);
    SectionQueryActions.selectFilter(selectedFilters);
    ArticleQueryActions.selectFilter(selectedFilters);
    ComparatorQueryActions.selectFilter(selectedFilters);
  }

  render() {
    let data = this.props.data
    if (!Object.keys(data).length) return (<div></div>);
    let comparatorData = this.props.comparatorData
    let arrAuthors = data.author;
    if (!Array.isArray(arrAuthors)) arrAuthors = [arrAuthors]
    if (!arrAuthors[0]) arrAuthors=[]
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

    this.props.category === 'sections' ? tags.push({label: this.props.query.section, url : `section/${this.props.query.section}`}) : {};
    this.props.category === 'topics' ? tags.push({label: this.props.query.topic, url : `topic/${this.props.query.topic}`}) : {};

    let count = typeof comparatorData.articleCount == 'number' ? comparatorData.articleCount : {}


    return (
      <div data-component='sectionModifier' style={styles.modifierWrapper}>
        <Row>
          <Col sm={2} xs={12}>
            <span style={styles.title}>
              <OverlayTrigger
                trigger="click"
                placement="bottom"
                overlay={
                  <Popover id="tag-description">
                      <p>{explanationStrings.tags[this.props.category]}</p>
                  </Popover>
                  }
                >
                <Glyphicon glyph="question-sign" style={styles.infoIcon} />
              </OverlayTrigger>
              <span style={styles.titleText} aria-dscribedby="tag-description">Metadata Tags:</span>
            </span>

          </Col>
          <Col sm={10} xs={12}>
            <Tags
              tags={tags}
              currentTag={this.props.comparatorQuery.comparator}
              uuid={this.props.uuid}
              category={this.props.category}
              comparatorQuery={this.props.comparatorQuery}
              query={this.props.query}
            />
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
            onChange={this.handleFilterChange}
          />
        </Row>

        <Row>
          <Col sm={2} xs={12}>
            <span style={styles.title}><span style={styles.titleText}>Date Range:</span></span>
          </Col>
          <Col sm={4} xs={12}>
            <DateRange
              onChange={this.handleDateRangeChange.bind(this)}
              startDate={this.props.query.dateFrom}
              endDate={this.props.query.dateTo}
              dateRange={this.props.dateRange}
            />
          </Col>
        </Row>

        <Row>
          <Col sm={2} xs={12}>
            <span style={styles.title}></span>
          </Col>
          <Col sm={10} xs={12}>
            <div style={styles.descriptorText}>
              <ModifierDescription
                articleCount={count}
                comparator={this.props.comparatorQuery.comparator}
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
  category : 'articles',
  renderDateRange : true,
  renderComparator : true,
  renderFilters : true,
  query : { currentComparator: null }
};
