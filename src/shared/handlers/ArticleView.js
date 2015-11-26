import React from 'react/addons';
import DocumentTitle from 'react-document-title';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import connectToStores from 'alt/utils/connectToStores';
import moment from 'moment';

import Header from "../components/Header";
import Messaging from '../components/Messaging';
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

import ArticleStore from '../stores/ArticleStore';
import ArticleActions from '../actions/ArticleActions';
import ComparatorStore from '../stores/ComparatorStore';
import ComparatorActions from '../actions/ComparatorActions';
import ArticleQueryStore from '../stores/ArticleQueryStore';
import ArticleQueryActions from '../actions/ArticleQueryActions';
import ComparatorQueryStore from '../stores/ComparatorQueryStore';
import ComparatorQueryActions from '../actions/ComparatorQueryActions';
import FeatureFlag from '../utils/featureFlag';
import * as formatAuthors from '../utils/formatAuthors';

import ChunkWrapper from '../components/ChunkWrapper';

function decode(uri){
  return uri ? decodeURI(uri) : null
}

class ArticleView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}
    this.state.comparator = decode(this.props.params.comparator)
    this.state.comparatorType = decode(this.props.params.comparatorType)
    this.state.uuid = decode(this.props.params.uuid)
  }

  static getStores() {
    return [ArticleStore, ComparatorStore, ArticleQueryStore, ComparatorQueryStore];
  }

  static getPropsFromStores() {
    let comparatorState = ComparatorStore.getState();
    let articleState = ArticleStore.getState();
    let articleQueryState = ArticleQueryStore.getState();
    let comparatorQueryState = ComparatorQueryStore.getState();
    return {
      articleQuery : articleQueryState.query,
      comparatorQuery : comparatorQueryState.query,
      data : articleState.data,
      articleLoading : articleState.loading,
      errorMessage : articleState.errorMessage,
      comparatorData : comparatorState.data,
      comparatorLoading : comparatorState.loading,
      comparatorErrorMessage : comparatorState.errorMessage,
    };
  }

  componentWillUnmount() {
    ArticleActions.unlistenToQuery();
    ComparatorActions.unlistenToQuery();
    ArticleActions.destroy();
    ComparatorActions.destroy();
    ArticleQueryActions.destroy();
    ComparatorQueryActions.destroy();
    this.state = {};
  }

  componentWillMount() {
    ArticleActions.listenToQuery();
    ComparatorActions.listenToQuery();
  }

  componentDidMount() {
    let analytics = require('../utils/analytics');
    analytics.sendGAEvent('pageview');
    analytics.trackScroll();
  }

  render() {
    if (this.props.errorMessage) {
      return (<Messaging
        category="Article"
        type="ERROR"
        message={this.props.errorMessage}
      />);
    } else if (this.props.comparatorErrorMessage) {
      return (<Messaging
        category="Comparator"
        type="ERROR"
        message={this.props.comparatorErrorMessage}
      />);
    } else if (!this.props.data) {
      return (<Messaging
        category="Article"
        type="LOADING"
      />);
    }
    let updating = (this.props.sectionLoading || this.props.comparatorLoading)
      ? <Messaging category="Article" type="UPDATING" />
      : <Messaging category="Article" type="PLACEHOLDER" />

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

    return (<DocumentTitle title={title}>
      <div>

        <ChunkWrapper component="modifier">
          <SectionModifier
            data={data}
            comparatorData={comparatorData}
            comparatorQuery={this.props.comparatorQuery}
            renderDevice={FeatureFlag.check('article:modifier:filters:Device')}
            renderRegion={FeatureFlag.check('article:modifier:filters:Region')}
            renderReferrers={FeatureFlag.check('article:modifier:filters:Referrers')}
            renderUserCohort={FeatureFlag.check('article:modifier:filters:UserCohort')}
            query={this.props.comparatorQuery}
            uuid={data.uuid}
            dateRange='published'
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
