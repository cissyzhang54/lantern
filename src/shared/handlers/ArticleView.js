import React from 'react';
import DocumentTitle from 'react-document-title';
import Link from 'react-router/lib/Link';
import moment from 'moment';
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
    let data = this.props.data;
    let comparatorData = this.props.comparatorData || { article: {}};
    let title = (data) ? 'Lantern - ' + data.title : '';

    let dataFormatter = new FormatData(this.props.data, this.props.comparatorData);
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
        label: 'Time on Page',
        size: 'large',
        comparatorFormatName: 'timeOnPage',
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
        label: 'Scroll Depth',
        size: 'large',
        comparatorFormatName: 'scrollDepth',
        toolTip: (<Text message='explanations.articleHandler.scrollDepth' />)
      }
    }

    // don't show the realtime link if the article is older than 24 hours
    let now = moment()
    let publish = moment(data.published)
    let dur = moment.duration(now.diff(publish), 'ms');
    let showRealtimeLink = dur.as('hours') < 24
    let realtimeLink = null;
    if (showRealtimeLink) {
      realtimeLink = (
        <Link
          to={'/realtime/articles/' + data.uuid}
        >
          Real time view
        </Link>
      );
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
          {realtimeLink}
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

        <SectionSocial
          data={data}
          comparatorData={comparatorData}
          renderBounceRate={FeatureFlag.check('article:bounceRate')}
        />

        <SectionInteract
          data={data}
          comparatorData={comparatorData}
          renderWho={FeatureFlag.check('article:interact')}
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
