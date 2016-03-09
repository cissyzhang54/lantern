import React from 'react';
import DocumentTitle from 'react-document-title';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import FeatureFlag from '../utils/featureFlag';

import FormatData from "../utils/formatData";

import Header from '../components/Header';
import Messaging from '../components/Messaging';
import SectionModifier from '../components/SectionModifier';
import SectionHeadlineStats from '../components/SectionHeadlineStats';
import SectionWho from '../components/SectionWho';
import LineChart from "../components/LineChart";
import ChunkWrapper from "../components/ChunkWrapper";
import SectionWhere from '../components/SectionWhere';
import BarChart from '../components/BarChart.js';
import ToolTip from '../components/ToolTip'
import Text from '../components/Text'

class TopicView extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let analytics = require('../utils/analytics');
    analytics.sendGAPageViewEvent();
    analytics.trackScroll();
  }

  render() {
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
    let comparatorData = this.props.comparatorData;
    comparatorData.comparator = this.props.params.comparator;
    let title = (data) ? 'Lantern - ' + this.props.params.topic : '';

    let dataFormatter = new FormatData(this.props.data, this.props.comparatorData);
    let [readData, readID, readKeys] =  dataFormatter.getMetric('readTimes', 'Article page views');

    let [refData, refID, refKeys] = dataFormatter.getPCTMetric('referrerTypes', 'Views');
    let [socialData, socialID, socialKeys] = dataFormatter.getPCTMetric('socialReferrers', 'Views');
    let [internalData, , ] = dataFormatter.getPCTMetric('internalReferrerTypes', 'Views');

    let totalInternal = internalData.reduce((prev, curr) => {
      return prev + curr.Views;
    }, 0);

    let totalExternal = refData.reduce((prev, curr) => {
      return prev + curr.Views;
    }, 0);

    refData.push({
      Views: totalInternal,
      category: 'internal'
    })

    refData.sort((a, b) => {
      return b.Views - a.Views;
    });

    refData.forEach((d) => {
      d['Views %'] = Math.floor(d.Views / (totalExternal + totalInternal) * 100);
    });

    const isFTComparator = this.props.params.comparator === 'FT';

    const headlineStats = {
      uniqueVisitors: {
        metricType: 'integer',
        label: 'Unique Visitors',
        size: 'large',
        comparatorFormatName: isFTComparator ? null : 'uniqueVisitors',
        toolTip: (<Text message='explanations.metric.uniqueVisitors' />)
      },
      articlePublishCount: {
        metricType: 'integer',
        label: 'Articles Published',
        size: 'large',
        comparatorFormatName: isFTComparator ? null : 'articlePublishCount'
      }
    }

    return(<DocumentTitle title={title}>
      <div>
        <ChunkWrapper
          component="header"
          noBorder
        >
          {updating}

          <Header
            title={'Topic: ' + this.props.params.topic}
          />
        </ChunkWrapper>
          <ChunkWrapper component="modifier">
            <SectionModifier
              category={'topics'}
              comparatorData={comparatorData}
              comparator={this.props.params.comparator}
              comparatorType={this.props.params.comparatorType}
              data={data}
              dateRange='historical'
              query={query}
              renderDevice
              renderReferrers
              renderRegion
              renderUserCohort
              uuid={this.props.params.topic}
              availableFilters={this.props.availableFilters}
              timespanOptions={[
                {label: 'Last 7 days', value: 24 * 7},
                {label: 'Last 30 days', value: 24 * 30}
               ]}
              onDateRangeChange={this.props.onDateRangeChange}
            />
          </ChunkWrapper>

          <SectionHeadlineStats
            comparatorData={comparatorData}
            config={headlineStats}
            data={data}
          />

          <ChunkWrapper component="ArticlesRead">
            <Row>
              <Col xs={12}>
                <h3>{'Story page views for this topic'}</h3>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <LineChart
                  category={readID}
                  keys={readKeys}
                  data={readData}
                  xLabel='Time'
                  yLabel='Article page views'
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
                sm={6}
                xs={12}
              >
                <h4>
                  <ToolTip
                    type="html"
                    message='explanations.sectionJourney.articleViews.external'
                    id={'external-sources-desc'}
                  />
                  {'Referrers'}
                </h4>
                <BarChart
                  category={refID}
                  data={refData}
                  keys={refKeys}
                  xLabel="Referrer"
                  yLabel="Page Views"
                />
              </Col>

              <Col
                sm={6}
                xs={12}
              >
                <h4>{'Social Networks'}</h4>
                <BarChart
                  category={socialID}
                  data={socialData}
                  keys={socialKeys}
                  xLabel="Social Network"
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

export default TopicView;
