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
import Text from "./Text";

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
    this.state = {};
    this.setState({
      isSectionOrTopic : ['sections', 'topics'].indexOf(this.props.category) >= 0,
      isGlobalFTComparator : this.props.comparatorQuery.comparatorType === 'global'
    });
  }

  handleDateRangeChange (dates) {
    let updatedDates = {
      dateFrom: dates.startDate.format('YYYY-MM-DD'),
      dateTo: dates.endDate.format('YYYY-MM-DD')
    }

    return AnalyticsActions.updateQuery(updatedDates);

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

    this.props.category === 'sections' && tags.push({label: this.props.query.section, url : `section/${this.props.query.section}`});
    this.props.category === 'topics' && tags.push({label: this.props.query.topic, url : `topic/${this.props.query.topic}`});

    let count = typeof comparatorData.articleCount == 'number' ? comparatorData.articleCount : null;

    return (
      <div data-component='sectionModifier'
        style={styles.modifierWrapper}
      >
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
                Metadata Tags:
              </span>
            </span>

          </Col>
          <Col sm={10}
            xs={12}
          >
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

        <Row style={styles.row}>
          <Col sm={2}
            xs={12}
          >
            <span style={styles.title}><span style={styles.titleText}>Date Range:</span></span>
          </Col>
          <Col sm={4}
            xs={12}
          >
            <DateRange
              onChange={this.handleDateRangeChange}
              startDate={this.props.query.dateFrom}
              endDate={this.props.query.dateTo}
              dateRange={this.props.dateRange}
            />
          </Col>
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
                comparator={this.props.comparatorQuery.comparator}
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
