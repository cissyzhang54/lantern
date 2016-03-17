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
import TimespanSelector from "./TimespanSelector";
import Text from "./Text";
import moment from "moment";

import AnalyticsActions from '../actions/AnalyticsActions';

const styles = {
  modifierWrapper : {
    'padding': '0px 15px 0px 15px'
  },
  title : {
    lineHeight: '1.5em'
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
  row : {
    marginBottom: '10px'
  },
  infoIcon : {
    'fontSize' : '15px',
    'color': '#039',
    'position': 'absolute',
    'top': '4px',
    'left': '-4px',
    cursor:'pointer'
  }
};

export default class Modifier extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isSectionOrTopic : ['sections', 'topics'].indexOf(this.props.category) >= 0,
    };
  }

  handleFilterChange (filter) {
    let key;
    switch (filter.key){
      case 'Device': key = 'device_type'; break;
      case 'Region': key = 'geo_region'; break;
      case 'UserCohort': key = 'user_cohort'; break;
      case 'Referrers': key = 'referrer_type'; break;
    }

    if (!filter.value.length) {
      AnalyticsActions.removeFilter(key);
    }  else {
      AnalyticsActions.addFilter(key, filter.value);
    }
  }

  render() {
    let data = this.props.data
    if (!Object.keys(data).length) return (<div></div>);
    let comparatorData = this.props.comparatorData
    let arrAuthors = data.author;
    if (!Array.isArray(arrAuthors)) arrAuthors = [arrAuthors]
    if (!arrAuthors[0]) arrAuthors=[]

    function listAllSections (sections, primarySection) {
      let clonedSections = sections.slice();
      if (primarySection && clonedSections.indexOf(primarySection) === -1) {
        clonedSections.push(primarySection);
      }
      return clonedSections;
    }

    let allSections = listAllSections(data.sections, data.primarySection);

    let tags = [{label:'FT',url:`global/FT`}]
      .concat(
      data.topics.map(d => {return {label:d, url:`topic/${d}`}})
    ).concat(
      allSections.map(d => {return {label:d, url:`section/${d}`}})
    ).concat(
      data.genre.map(d => {return {label:d, url:`genre/${d}`}})
    ).concat(
      arrAuthors.map(d => {return {label:d, url:`author/${d}`}})
    )

    let startDate = this.props.query.dateFrom, endDate = this.props.query.dateTo;

    if (this.props.query.timespan === 'default' && this.props.category === 'articles') {
      startDate = this.props.publishDate;
      endDate = moment().startOf('day').toISOString();
    }
    else if (this.props.query.timespan !== 'custom' && this.props.category === 'articles') {
      startDate = moment(this.props.publishDate).toISOString();
      endDate = moment(this.props.publishDate).add(this.props.query.timespan, 'hours').toISOString();
    }
    else if (this.props.query.timespan !== 'custom') {
      endDate = moment().toISOString();
      startDate = moment().subtract(this.props.query.timespan, 'hours').toISOString();
    }

    let sameTagLabel;
    switch (this.props.query.timespan) {
      case "168":
        sameTagLabel = "Previous Week";
        break;
      case "720":
        sameTagLabel =  "Previous Month";
        break;
      default:
        sameTagLabel = "Previous custom time period";
        break
    }

    let selectedTag = this.props.comparator;
    if (selectedTag === this.props.query.section ||
       selectedTag === this.props.query.topic) {
     selectedTag = sameTagLabel;
    }

    this.props.category === 'sections' && tags.push({
      label: sameTagLabel,
      url : `section/${this.props.query.section}`
    });
    this.props.category === 'topics' && tags.push({
      label: sameTagLabel,
      url : `topic/${this.props.query.topic}`
    });

    let count = typeof comparatorData.articleCount == 'number' ? comparatorData.articleCount : null;

    return (
      <div
        className="sectionModifier"
        data-component='sectionModifier'
        style={styles.modifierWrapper}
      >
        <Row style={styles.row}>
          <Col sm={2}
               xs={12}
            >
            <span style={styles.title}><span style={styles.titleText}>Timespan:</span></span>
          </Col>
          <Col sm={10}
               xs={12}
            >
            <TimespanSelector
              current={this.props.query.timespan}
              options={this.props.timespanOptions}
              query={this.props.query}
              />
            <DateRange
              onChange={this.props.onDateRangeChange}
              startDate={startDate}
              endDate={endDate}
              />
          </Col>
        </Row>

        <Row style={styles.row}>
          <Col sm={2}
            xs={12}
          >
            <span style={styles.title}>
              <OverlayTrigger
                trigger="click"
                placement="bottom"
                rootClose
                overlay={
                  <Popover id="tag-description">
                      <p>
                        <Text message={`explanations.sectionModifier.${this.props.category}`}/>
                      </p>
                  </Popover>
                  }
              >
                <Glyphicon glyph="question-sign"
                  style={styles.infoIcon}
                />
              </OverlayTrigger>
              <span style={styles.titleText}
                aria-dscribedby="tag-description"
              >
                Compare with:
              </span>
            </span>

          </Col>
          <Col sm={10}
            xs={12}
          >
            <Tags
              tags={tags}
              currentTag={selectedTag}
              uuid={this.props.uuid}
              category={this.props.category}
              query={this.props.query}
            />
          </Col>
        </Row>

        <Row style={styles.row}>
          <Col sm={2}
            xs={12}
          >
            <span style={styles.title}><span style={styles.titleText}>Filters:</span></span>
          </Col>
          <Filters
            onChange={this.handleFilterChange}
            availableFilters={this.props.availableFilters}
          />
        </Row>

        <Row>
          <Col sm={2}
            xs={12}
          >
            <span style={styles.title}></span>
          </Col>
          <Col sm={10}
            xs={12}
          >
            <div style={styles.descriptorText}>
              <ModifierDescription
                articleCount={count}
                comparator={this.props.comparator}
              />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}


Modifier.defaultProps = {
  category : 'articles',
  renderDateRange : true,
  renderComparator : true,
  renderFilters : true,
  query : { currentComparator: null }
};
