import React from 'react';
import DocumentTitle from 'react-document-title';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import FormatData from "../utils/formatData";
import FeatureFlag from '../utils/featureFlag';
import Header from '../components/Header';
import Messaging from '../components/Messaging';
import SectionModifier from '../components/SectionModifier';
import BarChart from '../components/BarChart.js';
import Table from '../components/Table.js';
import LineChart from "../components/LineChart";
import SectionWho from "../components/SectionWho";
import SectionWhere from "../components/SectionWhere";
import SectionHeadlineStats from "../components/SectionHeadlineStats";
import TabNav from '../components/TabNav';
import ChunkWrapper from "../components/ChunkWrapper";
import ArticleList from '../components/ArticleList';
import ToolTip from '../components/ToolTip'
import Text from '../components/Text'

class SectionView extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let analytics = require('../utils/analytics');
    analytics.sendGAPageViewEvent();
    analytics.trackScroll();
  }

  render() {
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
    comparatorData.comparator = this.props.params.comparator;
    let title = (data) ? 'Lantern - ' + this.props.params.section : '';

    let dataFormatter = new FormatData(this.props.data, this.props.comparatorData);
    let [readData, readID, readKeys] =  dataFormatter.getMetric('readTimes', 'Article page views');

    let [topicViewData] = dataFormatter.getMetric('topicViews', 'Views');
    let [topicCountData] = dataFormatter.getMetric('topicCount', 'Count');
    let comparatorSelected = Object.keys(comparatorData).length > 0;

    let topicCountHeaders = comparatorSelected ? ['Topic', `Articles tagged in (${this.props.params.section})`, `Articles tagged in (${this.props.params.comparator} comparator)`] : ['Topic', 'Articles tagged in'];
    let topicViewHeaders = comparatorSelected ? ['Topic', `Views (${this.props.params.section})`, `Views (${this.props.params.comparator} comparator)`] : ['Topic', 'Views'];
    let variableTableWidth = comparatorSelected ? 12 : 6;

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
      /*topicsCovered: {
        metricType: 'integer',
        label: 'Topics Covered',
        size: 'large',
        comparatorFormatName: 'topicsCovered'
        },*/
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

    let links = [
      {
        title: "Live",
        url:`/realtime/sections/${this.props.params.section}`,
        type: "realtime"
      },
      {
        title: "Archive",
        url:`/sections/${this.props.params.section}`,
        type: "section"
      }
    ];

    return(<DocumentTitle title={title}>
      <div>

        <ChunkWrapper
          component="header"
          noBorder
        >
          {updating}

          <Header
            title={'Section: ' + this.props.params.section}
          />
        </ChunkWrapper>

        <TabNav
          links={links}
          analyticsView={"section"}
        />

        <ChunkWrapper component="modifier">
          <SectionModifier
            data={data}
            comparatorData={comparatorData}
            comparator={this.props.params.comparator}
            comparatorType={this.props.params.comparatorType}
            renderDevice
            renderRegion
            renderReferrers
            renderUserCohort
            query={query}
            category={'sections'}
            uuid={this.props.params.section}
            availableFilters={this.props.availableFilters}
            timespanOptions={[
              {label: 'Last 7 days', value: 24 * 7},
              {label: 'Last 30 days', value: 24 * 30}
             ]}
            onDateRangeChange={this.props.onDateRangeChange}
          />
        </ChunkWrapper>

          <SectionHeadlineStats
            data={data}
            comparatorData={comparatorData}
            config={headlineStats}
          />

          <ArticleList
            articleList={data.articleList}
          />

          <ChunkWrapper component="ArticlesRead">
            <Row>
              <Col xs={12}>
                <h3>Story page views for this section</h3>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <LineChart
                  category={readID}
                  data={readData}
                  keys={readKeys}
                  yLabel='Article page views'
                  xLabel='Time'
                />
              </Col>
            </Row>
          </ChunkWrapper>

          <ChunkWrapper featureflag={FeatureFlag.check('section:topics')} component="Topics">
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
                sm={6}
              >
                <h4>
                  <ToolTip
                    type="html"
                    message='explanations.sectionJourney.articleViews.external'
                    id={'external-sources-desc'}
                  />
                  Referrers
                </h4>
                <BarChart
                  data={refData}
                  keys={refKeys}
                  category={refID}
                  yLabel="Page Views"
                  xLabel="Referrer"
                />
              </Col>

              <Col
                xs={12}
                sm={6}
              >
                <h4>Social Networks</h4>
                <BarChart
                  data={socialData}
                  keys={socialKeys}
                  category={socialID}
                  yLabel="Page Views"
                  xLabel="Social Network"
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

export default SectionView;
