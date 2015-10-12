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

import ArticleStore from '../stores/ArticleStore';
import ArticleActions from '../actions/ArticleActions';
import ComparatorStore from '../stores/ComparatorStore';
import ComparatorActions from '../actions/ComparatorActions';
import QueryStore from '../stores/QueryStore';
import QueryActions from '../actions/QueryActions';
import Error404 from '../handlers/404';
import FeatureFlag from '../utils/featureFlag';

const DEFAULT_STATE = {
  uuid: null,
  comparator: null
}
const STYLES = {
  LOADING: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  UPDATING : {
    position: 'absolute',
    top: '2em',
    left: '40%',
    width: '20%',
    textAlign: 'center',
  }
};
const MESSAGES = {
  PLACEHOLDER : (<div></div>),
  ERROR_404 : (<div><Error404/></div>),
  LOADING : (
    <div style={STYLES.LOADING}>
      <Logo message="Loading Article..." loading />
    </div>
  ),
  UPDATING : (
    <Alert bsStyle="warning" style={STYLES.UPDATING}>
      <strong>Updating Article...</strong>
    </Alert>
  )
}

function updateQuery(uuid, comparator){
  QueryActions.selectUUID(uuid);
  if (comparator){
    QueryActions.selectComparator(comparator);
  }
}

class ArticleView extends React.Component {

  constructor(props) {
    super(props);
    this.state = DEFAULT_STATE
    this.state.comparator = this.props.params.comparator || null
    this.state.uuid = this.props.params.uuid || null
  }

  static getStores() {
    return [ArticleStore, ComparatorStore, QueryStore];
  }

  static getPropsFromStores() {
    let comparatorState = ComparatorStore.getState();
    let articleState = ArticleStore.getState();
    let queryState = QueryStore.getState();
    if (articleState.data && !(queryState.query.dateTo && queryState.query)){
      queryState.query.dateTo = moment();
      queryState.query.dateFrom = moment(articleState.data.article.published);
    }

    return {
      query : queryState.query,
      data : articleState.data,
      articleLoading : articleState.loading,
      errorMessage : articleState.errorMessage,
      comparatorData : comparatorState.data,
      comparatorLoading : comparatorState.loading,
      comparatorErrorMessage : comparatorState.errorMessage,
    };
  }

  componentWillUnmount() {
    QueryStore.unlisten(this._boundQueryHandlerRef);
    ArticleActions.destroy();
    ComparatorActions.destroy();
    QueryActions.destroy();
    this.state = DEFAULT_STATE
  }

  _handleQueryChange(queryStore) {
    let hasComparatorChanged = this.props.query.comparator !== this.state.comparator
    if (queryStore.query.uuid && !hasComparatorChanged){
      ArticleStore.loadArticleData(this.props.query);
    }
    if (queryStore.query.comparator){
      ComparatorStore.loadComparatorData(this.props.query);
    }
    this.state.comparator = this.props.query.comparator
  }

  componentDidMount() {
    let analytics = require('../utils/analytics');
    analytics.sendGAEvent('pageview');
    analytics.trackScroll();

    // XXX consider putting this inside ArticleStore?
    this._boundQueryHandlerRef = this._handleQueryChange.bind(this)
    QueryStore.listen(this._boundQueryHandlerRef);

    if (this.props.params.uuid != QueryStore.getState().query.uuid) {
      updateQuery(this.props.params.uuid, this.props.params.comparator)
    }
  }

  render() {
    if (this.props.errorMessage) {
      return MESSAGES.ERROR_404;
    } else if (!this.props.data) {
      return MESSAGES.LOADING;
    }
    let updating = (this.props.articleLoading || this.props.comparatorLoading)
      ? MESSAGES.UPDATING
      : MESSAGES.PLACEHOLDER

    let data = this.props.data;
    let comparatorData = this.props.comparatorData || { article: {}};
    let title = (data) ? 'Lantern - ' + data.article.title : '';

    return (<DocumentTitle title={title}>
      <Col xs={12}>

        {updating}

        <Header
          title={data.article.title}
          author={'By: ' + data.article.author}
          published={'Published: ' + data.article.published_human}
          uuid={data.article.uuid}
          />

        <SectionModifier
          data={data.article}
          tags={data.article.topics.concat(data.article.sections)}
          renderDevice={FeatureFlag.check('article:modifier:filters:Device')}
          renderRegion={FeatureFlag.check('article:modifier:filters:Region')}
          renderReferrers={FeatureFlag.check('article:modifier:filters:Referrers')}
          renderUserCohort={FeatureFlag.check('article:modifier:filters:UserCohort')}
          query={this.props.query}
          uuid={this.props.params.uuid}
        />

        <main >

          <SectionHeadlineStats
            data={data.article}
            comparatorData={comparatorData.article}
          />

          <SectionWhen
            data={data.article}
            comparatorData={comparatorData.article}
            renderReadTimes={FeatureFlag.check('article:readTimes')}
          />

          <SectionNext
            data={data.article}
            comparatorData={comparatorData.article}
            renderBounceRate={FeatureFlag.check('article:bounceRate')}
          />

          <SectionReferrers
            data={data.article}
            comparatorData={comparatorData.article}
            renderReferrers={FeatureFlag.check('article:referrers')}
          />

          <SectionWho
            data={data.article}
            comparatorData={comparatorData.article}
            renderWho={FeatureFlag.check('article:who')}
          />

          <SectionWhere
            data={data.article}
            comparatorData={comparatorData.article}
            renderWhere={FeatureFlag.check('article:where')}
          />

          <SectionHow
            data={data.article}
            comparatorData={comparatorData.article}
            renderDevices={FeatureFlag.check('article:devices')}
            renderChannels={FeatureFlag.check('article:channels')}
          />

        </main>
      </Col>
    </DocumentTitle>);
  }
}

export default connectToStores(ArticleView);
