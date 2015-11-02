import React from 'react/addons';
import DocumentTitle from 'react-document-title';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import Alert from 'react-bootstrap/lib/Alert';
import connectToStores from 'alt/utils/connectToStores';
import moment from 'moment';

import Header from "../components/Header";
import Logo from "../components/Logo";
import SectionModifier from "../components/SectionModifier";
import SectionHeadlineStats from "../components/SectionHeadlineStats";
import SectionReferrers from "../components/SectionReferrers.js";
import SectionWhere from "../components/SectionWhere";
import SectionHow from "../components/SectionHow";
import SectionWhen from "../components/SectionWhen";
import SectionNext from "../components/SectionNext";
import SectionWho from "../components/SectionWho";
import SectionInteract from "../components/SectionInteract";

import ArticleStore from '../stores/ArticleStore';
import ArticleActions from '../actions/ArticleActions';
import ComparatorStore from '../stores/ComparatorStore';
import ComparatorActions from '../actions/ComparatorActions';
import ArticleQueryStore from '../stores/ArticleQueryStore';
import ArticleQueryActions from '../actions/ArticleQueryActions';
import ComparatorQueryStore from '../stores/ComparatorQueryStore';
import ComparatorQueryActions from '../actions/ComparatorQueryActions';
import Error404 from '../handlers/404';
import FeatureFlag from '../utils/featureFlag';
import * as formatAuthors from '../utils/formatAuthors';

const STYLES = {
  MASK: {
    width: '100%',
    height: '100%',
    position: 'fixed',
    top: '0',
    left: '0',
    zIndex: 2,
    cursor:'wait',
    background: 'rgba(255, 255, 255, 0.4)'
  },
  LOADING: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  UPDATING : {
    position: 'fixed',
    top: '2em',
    left: '40%',
    width: '20%',
    textAlign: 'center',
    zIndex: 2
  }
};
const MESSAGES = {
  PLACEHOLDER : (<div></div>),
  LOADING : (
    <div style={STYLES.LOADING}>
      <Logo message="Loading Article..." loading />
    </div>
  ),
  UPDATING : (
    <div style={STYLES.MASK}>
      <Alert bsStyle="warning" style={STYLES.UPDATING}>
        <strong>Updating Article...</strong>
      </Alert>
    </div>
  ),
  ERROR: (extra) => { return (<div>
    <Error404
      title="Lantern - Article Not Found"
      message={[
              'Ooops!',
              'We could not find the article you requested',
              'Perhaps the article was published less than 24 hours ago?'
              ]}
      extra={<pre>
                {extra}
              </pre>
            }
      />
  </div>)}
}

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

  componentWillMount() {
    let hasArticleChanged = this.state.uuid !== ArticleQueryStore.getState().query.uuid;
    let hasComparatorChanged = this.state.comparator !== ComparatorQueryStore.getState().query.comparator;
    if (hasArticleChanged){
      ArticleQueryActions.setUUID(this.state.uuid);
      ComparatorQueryActions.setUUID(this.state.uuid);
    }
    if (this.state.comparator && hasComparatorChanged){
      ComparatorQueryActions.selectComparator(this.state);
    }
  }

  componentWillUnmount() {
    ArticleActions.destroy();
    ComparatorActions.destroy();
    ArticleQueryActions.destroy();
    ComparatorQueryActions.destroy();
    this.state = {};
  }

  componentDidMount() {
    let analytics = require('../utils/analytics');
    analytics.sendGAEvent('pageview');
    analytics.trackScroll();
    ArticleActions.listenToQuery();
    ComparatorActions.listenToQuery();
  }

  render() {
    if (this.props.errorMessage) {
      return (MESSAGES.ERROR(this.props.errorMessage));
    } else if (!this.props.data) {
      return MESSAGES.LOADING;
    }
    let updating = (this.props.articleLoading || this.props.comparatorLoading)
      ? MESSAGES.UPDATING
      : MESSAGES.PLACEHOLDER

    let data = this.props.data;
    let comparatorData = this.props.comparatorData || { article: {}};
    let title = (data) ? 'Lantern - ' + data.title : '';

    return (<DocumentTitle title={title}>
      <div>
        <Col xs={12}>

        <SectionModifier
          data={data}
          comparatorData={comparatorData}
          renderDevice={FeatureFlag.check('article:modifier:filters:Device')}
          renderRegion={FeatureFlag.check('article:modifier:filters:Region')}
          renderReferrers={FeatureFlag.check('article:modifier:filters:Referrers')}
          renderUserCohort={FeatureFlag.check('article:modifier:filters:UserCohort')}
          query={this.props.comparatorQuery}
          uuid={data.uuid}
          />

          <Col xs={12}>

            {updating}

            <Header
              title={data.title}
              linkURL={'http://www.ft.com/cms/s/0/' + data.uuid + '.html'}
              author={'By: ' + formatAuthors.join(data.author)}
              published={'Published: ' + data.published_human}
              uuid={data.uuid}
              />

            <main >

              <SectionHeadlineStats
                data={data}
                comparatorData={comparatorData}
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

            </main>
          </Col>
        </Col>
      </div>
    </DocumentTitle>);
  }
}

export default connectToStores(ArticleView);