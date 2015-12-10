import React from 'react/addons';
import DocumentTitle from 'react-document-title';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import connectToStores from 'alt/utils/connectToStores';
import FeatureFlag from '../utils/featureFlag';

import FormatData from "../utils/formatData";

import Header from '../components/Header';
import Messaging from '../components/Messaging';
import SectionModifier from '../components/SectionModifier';
import SectionHeadlineStats from '../components/SectionHeadlineStats';
import SectionWho from '../components/SectionWho';
import DualScaleLineChart from "../components/DualScaleLineChart";
import ChunkWrapper from "../components/ChunkWrapper";
import SectionWhere from '../components/SectionWhere';
import BarChart from '../components/BarChart.js';


import AnalyticsActions from '../actions/AnalyticsActions';
import AnalyticsStore from '../stores/AnalyticsStore';

import moment from 'moment';
import _ from 'underscore';

function decode(uri){
  return uri ? decodeURI(uri) : null
}

class TopicView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}
    this.state.topic = decode(this.props.params.topic)
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
      return (<Messaging category="Topic" type="ERROR" message={this.props.errorMessage} />);
    } else if (!this.props.data) {
      return (<Messaging category="Topic" type="LOADING" />);
    }
    let updating = (this.props.loading)
      ? <Messaging category="Topic" type="UPDATING" />
      : <Messaging category="Topic" type="PLACEHOLDER" />

    let data = this.props.data;
    let query = this.props.query
    let comparatorData = this.props.comparatorData
    let comparatorQuery = this.props.comparatorQuery
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
            data={data}
            comparatorData={comparatorData}
            comparatorQuery={this.props.query}
            renderDevice={true}
            renderRegion={true}
            renderReferrers={true}
            renderUserCohort={true}
            query={query}
            category={'topics'}
            uuid={this.props.params.topic}
            dateRange='historical'
            />
          </ChunkWrapper>
          <ChunkWrapper component="header">
            {updating}

            <Header
              title={'Topic: ' + this.props.params.topic}
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
                  leftData={publishData}
                  rightData={readData}
                  keys={publishKeys.concat(readKeys)}
                  categories={[publishID, readID]}
                  yLabel='Articles published'
                  y2Label='Articles read'
                  xLabel='Time' />
              </Col>
            </Row>
          </ChunkWrapper>

          <SectionWho
            data={data}
            comparatorData={comparatorData}
            renderWho={FeatureFlag.check('topic:who')}
            />

          <ChunkWrapper component="section-referrers">
            <Row>
              <Col xs={12}>
                <h3>Where do the users come from?</h3>
              </Col>
            </Row>
            <Row>
              <Col xs={12} sm={4}>
                <h4>External Sources</h4>
                <BarChart
                  data={refData}
                  keys={refKeys}
                  category={refID}
                  yLabel="Page Views"
                  xLabel="Referrer"
                  usePercentages={true} />
              </Col>

              <Col xs={12} sm={4}>
                <h4>Social Network Breakdown</h4>
                <BarChart
                  data={socialData}
                  keys={socialKeys}
                  category={socialID}
                  yLabel="Page Views"
                  xLabel="Social Network"
                  usePercentages={true}  />
              </Col>

              <Col xs={12} sm={4}>
                <h4>Internal Referrer Types</h4>
                <BarChart
                  data={internalData}
                  keys={internalKeys}
                  category={internalID}
                  yLabel="Page Views"
                  xLabel="Referrer"
                  usePercentages={true} />
              </Col>
            </Row>
          </ChunkWrapper>
          <SectionWhere
            data={data}
            comparatorData={comparatorData}
            renderWhere={FeatureFlag.check('topic:where')}
            />
      </div>

    </DocumentTitle>)
  }
}

export default connectToStores(TopicView);
