import React from 'react';
import DocumentTitle from 'react-document-title';
import Header from "../components/Header";
import SectionModifier from "../components/SectionModifier";
import SectionHeadlineStats from "../components/SectionHeadlineStats";
import SectionJourney from "../components/SectionJourney.js";
import SectionWhere from "../components/SectionWhere";
import SectionHow from "../components/SectionHow";
import SectionWhen from "../components/SectionWhen";
import SectionSocial from "../components/SectionSocial";
import SectionWho from "../components/SectionWho";
import SectionInteract from "../components/SectionInteract";
import Text from '../components/Text'
import TabNav from '../components/TabNav'
import Messaging from '../components/Messaging';
import FormatData from "../utils/formatData";

import FeatureFlag from '../utils/featureFlag';
import * as formatAuthors from '../utils/formatAuthors';

import ChunkWrapper from '../components/ChunkWrapper';

class ArticleView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    let analytics = require('../utils/analytics');
    analytics.sendGAEvent('pageview');
    analytics.trackScroll();
  }

  render() {
    const data = this.props.data;
    const comparatorData = this.props.comparatorData || { article: {}};
    comparatorData.comparator = unescape(this.props.params.comparatorType + ' ' + this.props.params.comparator);
    const title = (data) ? 'Lantern - ' + data.title : '';

    const dataFormatter = new FormatData(data, comparatorData);
    let [retentionRateData, , keys] = dataFormatter.getPCTMetric('isLastPage', 'Article', 'Exited FT', 'Stayed on FT')

    let dataPoint;
    for (let i = 0; i < retentionRateData.length; i++) {
      dataPoint = retentionRateData[i];
      if (dataPoint.category === 'Stayed on FT') {
        data.retentionRate = parseFloat(dataPoint[keys[0] + ' %']);
        comparatorData.retentionRate = parseFloat(dataPoint[keys[1] + ' %']);
      }
    }

    let headlineStats = {
      timeOnPage: {
        metricType: 'time',
        label: 'Average Time on Page',
        size: 'large',
        comparatorFormatName: 'timeOnPage'
      },
      pageViews: {
        metricType: 'integer',
        label: 'Page Views',
        size: 'large',
        comparatorFormatName: 'categoryAverageViewCount'
      },
      uniqueVisitors: {
        metricType: 'integer',
        label: 'Unique Visitors',
        size: 'large',
        comparatorFormatName: 'categoryAverageUniqueVisitors'
      },
      retentionRate: {
        metricType: 'percentage',
        label: 'Retention Rate',
        size: 'large',
        comparatorFormatName: 'retentionRate'
      },
      scrollDepth: {
        metricType: 'percentage',
        label: 'Average Scroll Depth',
        size: 'large',
        comparatorFormatName: 'scrollDepth',
        toolTip: (<Text message='explanations.articleHandlers.scrollDepth' />)
      }
    }

    let updating = (this.props.loading)
      ? (<Messaging
        category="Article"
        type="UPDATING"
         />)
      : (<Messaging
        category="Article"
        type="PLACEHOLDER"
         />)

    return (<DocumentTitle title={title}>
      <div>

        <TabNav
          analyticsView={this.props.route.analyticsView}
          publishDate={data.published}
          uuid={data.uuid}
          />

        <ChunkWrapper component="modifier">
          <SectionModifier
            data={data}
            comparatorData={comparatorData}
            comparatorQuery={this.props.query}
            query={this.props.query}
            uuid={data.uuid}
            dateRange='published'
            availableFilters={this.props.availableFilters}
          />
        </ChunkWrapper>

        <ChunkWrapper component="header">
          {updating}

          <Header
            title={data.title}
            linkURL={'http://www.ft.com/cms/s/0/' + data.uuid + '.html'}
            author={'By: ' + formatAuthors.join(data.author)}
            published={'First Published: ' + data.published_human}
            uuid={data.uuid}
          />
        </ChunkWrapper>

        <SectionHeadlineStats
          data={data}
          comparatorData={comparatorData}
          config={headlineStats}
        />

        <SectionWhen
          data={data}
          comparatorData={comparatorData}
          renderReadTimes={FeatureFlag.check('article:readTimes')}
          renderTimeSincePublished={FeatureFlag.check('article:timeSincePublished')}
        />

        <SectionInteract
          data={data}
          comparatorData={comparatorData}
          renderWho={FeatureFlag.check('article:interact')}
        />

        <SectionSocial
        data={data}
        comparatorData={comparatorData}
        />

        <SectionJourney
          data={data}
          comparatorData={comparatorData}
          renderReferrers={FeatureFlag.check('article:referrers')}
          renderInternalRefTypes={FeatureFlag.check('article:referrers:internalRefTypes')}
        />

        <SectionWho
          data={data}
          comparatorData={comparatorData}
          renderWho={FeatureFlag.check('article:who')}
        />

        <SectionWhere
          data={data}
          comparatorData={comparatorData}
          renderWhere={FeatureFlag.check('article:where')}
        />

        <SectionHow
          data={data}
          comparatorData={comparatorData}
          renderDevices={FeatureFlag.check('article:devices')}
          renderChannels={FeatureFlag.check('article:channels')}
        />

      </div>
    </DocumentTitle>);
  }
}

export default ArticleView;
