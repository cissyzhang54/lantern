import React from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';
import DocumentTitle from 'react-document-title';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import FormatData from "../utils/formatData";
import FeatureFlag from '../utils/featureFlag';

import Header from '../components/Header';
import Messaging from '../components/Messaging';
import ErrorHandler from '../components/ErrorHandler';
import SectionModifier from '../components/SectionModifier';
import BarChart from '../components/BarChart.js';
import Table from '../components/Table.js';
import DualScaleLineChart from "../components/DualScaleLineChart";
import SectionWho from "../components/SectionWho";
import SectionWhere from "../components/SectionWhere";
import SectionHeadlineStats from "../components/SectionHeadlineStats";

import AnalyticsActions from '../actions/AnalyticsActions';
import AnalyticsStore from '../stores/AnalyticsStore';

import ChunkWrapper from "../components/ChunkWrapper";

import _ from 'underscore'

function decode(uri){
  return uri ? decodeURI(uri) : null
}

class SectionView extends React.Component {

  constructor(props) {
    super(props);
  }

  static getStores() {
    return [AnalyticsStore];
  }

  static getPropsFromStores() {
    return AnalyticsStore.getState();
  }

  componentWillMount() {
    AnalyticsActions.updateQuery({
      section: decode(this.props.params.section),
      type: 'section',
      comparator: decode(this.props.params.comparator),
      comparatorType: decode(this.props.params.comparatorType)
    });
  }

  componentWillUnmount(){
    AnalyticsActions.destroy();
  }

  componentDidMount() {
    let analytics = require('../utils/analytics');
    analytics.sendGAEvent('pageview');
    analytics.trackScroll();
  }

  componentWillUpdate(nextProps) {
    if (!_.isEqual(nextProps.params, this.props.params)) {
      AnalyticsActions.updateQuery.defer(nextProps.params);
    }
  }

  render() {
    if (this.props.errorMessage) {
      return (
        <ErrorHandler
          category="Section"
          message={this.props.errorMessage}
          error={this.props.error}
          type="ERROR"
        />
      );
    } else if (!this.props.data) {
      return (
        <Messaging
          category="Section"
          type="LOADING"
        />);
    }
    let updating
    if (this.props.loading) {
      updating = (
        <Messaging
          category="Section"
          type="UPDATING"
        />
      );
    }
    else {
      updating = (
        <Messaging
          category="Section"
          type="PLACEHOLDER"
        />
      );
    }

    let data = this.props.data
    let query = this.props.query
    let comparatorData = this.props.comparatorData
    let title = (data) ? 'Lantern - ' + this.props.params.section : '';

    let dataFormatter = new FormatData(this.props.data, this.props.comparatorData);
    let [publishData, publishID, publishKeys] =  dataFormatter.getMetric('publishTimes', 'Articles published');
    let [readData, readID, readKeys] =  dataFormatter.getMetric('readTimes', 'Articles read');

    let [topicViewData] = dataFormatter.getMetric('topicViews', 'Views');
    let [topicCountData] = dataFormatter.getMetric('topicCount', 'Count');
    let comparatorSelected = Object.keys(comparatorData).length > 0;

    let topicCountHeaders = comparatorSelected ? ['Topic', `Articles tagged in (${this.props.params.section})`, `Articles tagged in (${this.props.params.comparator} comparator)`] : ['Topic', 'Articles tagged in'];
    let topicViewHeaders = comparatorSelected ? ['Topic', `Views (${this.props.params.section})`, `Views (${this.props.params.comparator} comparator)`] : ['Topic', 'Views'];
    let variableTableWidth = comparatorSelected ? 12 : 6;

    let [refData, refID, refKeys] = dataFormatter.getPCTMetric('referrerTypes', 'Views');
    let [socialData, socialID, socialKeys] = dataFormatter.getPCTMetric('socialReferrers', 'Views');
    let [internalData, internalID, internalKeys] = dataFormatter.getPCTMetric('internalReferrerTypes', 'Views');

    let headlineStats = {
      topicsCovered: {
        metricType: 'integer',
        label: 'Topics Covered',
        size: 'large',
        comparatorFormatName: 'topicsCovered'
      },
      uniqueVisitors: {
        metricType: 'integer',
        label: 'Unique Visitors',
        size: 'large',
        comparatorFormatName: 'uniqueVisitors'
      },
      articleCount: {
        metricType: 'integer',
        label: 'Articles Published',
        size: 'large',
        comparatorFormatName: 'articleCount'
      }
    }

    return(<DocumentTitle title={title}>
      <div>

        <ChunkWrapper component="modifier">
          <SectionModifier
            data={data}
            comparatorData={comparatorData}
            comparatorQuery={this.props.query}
            renderDevice
            renderRegion
            renderReferrers
            renderUserCohort
            query={query}
            category={'sections'}
            uuid={this.props.params.section}
            dateRange='historical'
          />
        </ChunkWrapper>

          <ChunkWrapper component="header">
            {updating}

            <Header
              title={'Section: ' + this.props.params.section}
            />
          </ChunkWrapper>

          <SectionHeadlineStats
            data={data}
            comparatorData={comparatorData}
            config={headlineStats}
          />

          <ChunkWrapper component="ArticlesPublished">
            <Row>
              <Col xs={12}>
                <h3>Articles Published vs Articles Read for this topic</h3>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <DualScaleLineChart
                  categories={[publishID, readID]}
                  leftData={publishData}
                  rightData={readData}
                  keys={publishKeys.concat(readKeys)}
                  yLabel='Articles published'
                  y2Label='Articles read'
                  xLabel='Time'
                />
              </Col>
            </Row>
          </ChunkWrapper>

          <ChunkWrapper component="Topics">
            <Row>
              <Col xs={12}>
                <h3>Topics Published vs Topics Read</h3>
              </Col>
            </Row>
            <Row>
              <Col
                md={variableTableWidth}
                xs={12}
              >
                <h4>Topics ranked by most tagged</h4>
                <Table
                  headers={topicCountHeaders}
                  rows={topicCountData}
                />
              </Col>
              <Col
                md={variableTableWidth}
                xs={12}
              >
                <h4>Topics ranked by most viewed</h4>
                <Table
                  headers={topicViewHeaders}
                  rows={topicViewData}
                />
              </Col>
            </Row>
          </ChunkWrapper>

          <SectionWho
            data={data}
            comparatorData={comparatorData}
            renderWho={FeatureFlag.check('section:who')}
          />

          <ChunkWrapper component="section-referrers">
            <Row>
              <Col xs={12}>
                <h3>Where do the users come from?</h3>
              </Col>
            </Row>
            <Row>
              <Col
                xs={12}
                sm={4}
              >
                <h4>External Sources</h4>
                <BarChart
                  data={refData}
                  keys={refKeys}
                  category={refID}
                  yLabel="Page Views"
                  xLabel="Referrer"
                  usePercentages
                />
              </Col>

              <Col
                xs={12}
                sm={4}
              >
                <h4>Social Network Breakdown</h4>
                <BarChart
                  data={socialData}
                  keys={socialKeys}
                  category={socialID}
                  yLabel="Page Views"
                  xLabel="Social Network"
                  usePercentages
                />
              </Col>

              <Col
                xs={12}
                sm={4}
              >
                <h4>Internal Referrer Types</h4>
                <BarChart
                  data={internalData}
                  keys={internalKeys}
                  category={internalID}
                  yLabel="Page Views"
                  xLabel="Referrer"
                  usePercentages
                />
              </Col>
            </Row>
          </ChunkWrapper>

          <SectionWhere
            data={data}
            comparatorData={comparatorData}
            renderWhere={FeatureFlag.check('article:where')}
          />

      </div>
  </DocumentTitle>)

  }
}

export default connectToStores(SectionView);
