import React from 'react';
import DocumentTitle from 'react-document-title';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import connectToStores from 'alt/utils/connectToStores';
import FeatureFlag from '../utils/featureFlag';

import FormatData from "../utils/formatData";

import Header from '../components/Header';
import Messaging from '../components/Messaging';
import ErrorHandler from '../components/ErrorHandler';
import SectionModifier from '../components/SectionModifier';
import SectionHeadlineStats from '../components/SectionHeadlineStats';
import SectionWho from '../components/SectionWho';
import DualScaleLineChart from "../components/DualScaleLineChart";
import ChunkWrapper from "../components/ChunkWrapper";
import SectionWhere from '../components/SectionWhere';
import BarChart from '../components/BarChart.js';


import AnalyticsActions from '../actions/AnalyticsActions';
import AnalyticsStore from '../stores/AnalyticsStore';

import _ from 'underscore';

function decode(uri){
  return uri ? decodeURI(uri) : null
}

class TopicView extends React.Component {

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
      topic: decode(this.props.params.topic),
      type: 'topic',
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
          category="Article"
          type="ERROR"
          message={this.props.errorMessage}
          error={this.props.error}
        />
      );
    } else if (!this.props.data) {
      return (
        <Messaging
          category="Topic"
          type="LOADING"
        />);
    }

    let updating;
    if (this.props.loading) {
      updating = (
        <Messaging
          category="Topic"
          type="UPDATING"
        />
      )
    } else {
      updating = (
        <Messaging
          category="Topic"
          type="PLACEHOLDER"
        />
      )
    }

    let data = this.props.data;
    let query = this.props.query
    let comparatorData = this.props.comparatorData
    let title = (data) ? 'Lantern - ' + this.props.params.topic : '';

    let dataFormatter = new FormatData(this.props.data, this.props.comparatorData);
    let [publishData, publishID, publishKeys] =  dataFormatter.getMetric('publishTimes', 'Articles published');
    let [readData, readID, readKeys] =  dataFormatter.getMetric('readTimes', 'Articles read');

    let [refData, refID, refKeys] = dataFormatter.getPCTMetric('referrerTypes', 'Views');
    let [socialData, socialID, socialKeys] = dataFormatter.getPCTMetric('socialReferrers', 'Views');
    let [internalData, internalID, internalKeys] = dataFormatter.getPCTMetric('internalReferrerTypes', 'Views');

    let headlineStats = {
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
              category={'topics'}
              comparatorData={comparatorData}
              comparatorQuery={this.props.query}
              data={data}
              dateRange='historical'
              query={query}
              renderDevice
              renderReferrers
              renderRegion
              renderUserCohort
              uuid={this.props.params.topic}
            />
          </ChunkWrapper>
          <ChunkWrapper component="header">
            {updating}

            <Header
              title={'Topic: ' + this.props.params.topic}
            />
          </ChunkWrapper>
          <SectionHeadlineStats
            comparatorData={comparatorData}
            config={headlineStats}
            data={data}
          />

          <ChunkWrapper component="ArticlesPublished">
            <Row>
              <Col xs={12}>
                <h3>{'Articles Published vs Articles Read for this topic'}</h3>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <DualScaleLineChart
                  categories={[publishID, readID]}
                  keys={publishKeys.concat(readKeys)}
                  leftData={publishData}
                  rightData={readData}
                  xLabel='Time'
                  y2Label='Articles read'
                  yLabel='Articles published'
                />
              </Col>
            </Row>
          </ChunkWrapper>

          <SectionWho
            comparatorData={comparatorData}
            data={data}
            renderWho={FeatureFlag.check('topic:who')}
          />

          <ChunkWrapper component="section-referrers">
            <Row>
              <Col xs={12}>
                <h3>{'Where do the users come from?'}</h3>
              </Col>
            </Row>
            <Row>
              <Col
                sm={4}
                xs={12}
              >
                <h4>{'External Sources'}</h4>
                <BarChart
                  category={refID}
                  data={refData}
                  keys={refKeys}
                  usePercentages
                  xLabel="Referrer"
                  yLabel="Page Views"
                />
              </Col>

              <Col
                sm={4}
                xs={12}
              >
                <h4>{'Social Network Breakdown'}</h4>
                <BarChart
                  category={socialID}
                  data={socialData}
                  keys={socialKeys}
                  usePercentages
                  xLabel="Social Network"
                  yLabel="Page Views"
                />
              </Col>

              <Col
                sm={4}
                xs={12}
              >
                <h4>{'Internal Referrer Types'}</h4>
                <BarChart
                  category={internalID}
                  data={internalData}
                  keys={internalKeys}
                  usePercentages
                  xLabel="Referrer"
                  yLabel="Page Views"
                />
              </Col>
            </Row>
          </ChunkWrapper>
          <SectionWhere
            comparatorData={comparatorData}
            data={data}
            renderWhere={FeatureFlag.check('topic:where')}
          />
      </div>

    </DocumentTitle>)
  }
}

export default connectToStores(TopicView);
