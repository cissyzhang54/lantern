import React from 'react';
import DocumentTitle from 'react-document-title';
import connectToStores from 'alt/utils/connectToStores';
import Link from 'react-router/lib/Link';
import _ from 'underscore';
import moment from 'moment';
import Header from "../components/Header";
import Messaging from '../components/Messaging';
import ErrorHandler from '../components/ErrorHandler';
import SectionModifier from "../components/SectionModifier";
import SectionHeadlineStats from "../components/SectionHeadlineStats";
import SectionReferrers from "../components/SectionReferrers.js";
import SectionWhere from "../components/SectionWhere";
import SectionHow from "../components/SectionHow";
import SectionWhen from "../components/SectionWhen";
import SectionNext from "../components/SectionNext";
import SectionWho from "../components/SectionWho";
import SectionInteract from "../components/SectionInteract";
import Text from '../components/Text'

import AnalyticsActions from '../actions/AnalyticsActions';
import AnalyticsStore from '../stores/AnalyticsStore';

import FeatureFlag from '../utils/featureFlag';
import * as formatAuthors from '../utils/formatAuthors';

import ChunkWrapper from '../components/ChunkWrapper';

class ArticleView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  static getStores() {
    return [AnalyticsStore];
  }

  static getPropsFromStores() {
    return AnalyticsStore.getState();
  }

  componentWillUnmount() {
    AnalyticsActions.destroy();
  }

  componentWillMount() {
    AnalyticsActions.updateQuery({
      uuid : this.props.params.uuid,
      dateFrom: null,
      type: 'article',
      comparatorType: this.props.params.comparatorType,
      comparator: this.props.params.comparator
    });
  }

  componentWillUpdate(nextProps) {
    if (!_.isEqual(nextProps.params, this.props.params)) {
      AnalyticsActions.updateQuery.defer(nextProps.params);
    }
  }

  componentDidMount() {
    let analytics = require('../utils/analytics');
    analytics.sendGAEvent('pageview');
    analytics.trackScroll();
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
          category="Article"
          type="LOADING"
        />
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

    let data = this.props.data;
    let comparatorData = this.props.comparatorData || { article: {}};
    let title = (data) ? 'Lantern - ' + data.title : '';

    let headlineStats = {
      timeOnPage: {
        metricType: 'time',
        label: 'Time on Page',
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

        <SectionNext
          data={data}
          comparatorData={comparatorData}
          renderBounceRate={FeatureFlag.check('article:bounceRate')}
        />

        <SectionInteract
          data={data}
          comparatorData={comparatorData}
          renderWho={FeatureFlag.check('article:interact')}
        />

        <SectionReferrers
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

export default connectToStores(ArticleView);
