import React from 'react/addons';
import Link from 'react-router/lib/components/Link';
import DocumentTitle from 'react-document-title';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import Alert from 'react-bootstrap/lib/Alert';
import connectToStores from 'alt/utils/connectToStores';
import moment from 'moment';

import Header from "../components/Header";
import LineChart from "../components/LineChart";
import Logo from "../components/Logo";

import SectionModifier from "../components/SectionModifier";
import SectionHeadlineStats from "../components/SectionHeadlineStats";
import SectionUserOrigins from "../components/SectionUserOrigins";
import SectionUserAccess from "../components/SectionUserAccess";

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

function getReaderComparator (data, comparatorData) {
  let compTimeData = comparatorData.article.readTimes;
  let articleTimeData = data.article.readTimes;
  let merged = [];
  let i;
  let compTime;
  let articleTime;

  if (compTimeData.length <= 0) return articleTimeData;

  for (i = 0; i<compTimeData.length; ++i) {
    compTime = moment(compTimeData[i].time);
    let flag = false;
    let j = 0;
    while (flag != true) {
      articleTime = moment(articleTimeData[j].time);
      if((compTime - articleTime) === 0) {
        let t = articleTimeData[j];
        t.comparator = compTimeData[i].comparator;
        merged.push(t);
        flag = true;
      } else if (j === articleTimeData.length - 1) {
        merged.push(articleTimeData[j]);
        flag = true;
      }
      j++;
    }
  }

  return merged;
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
    if (queryStore.query.comparator && hasComparatorChanged){
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
    let hasComparator = (this.props.params.comparator !== undefined);
    let comparatorData = this.props.comparatorData || { article: {}};
    let title = (data) ? 'Lantern - ' + data.article.title : '';
    let renderReadTimeChartComponent = FeatureFlag.check('article:readTimes');

    /* Line Charts */
    let timeData = data.article.readTimes;
    let lineKeys = ['value'];

    if (hasComparator && comparatorData.article.readTimes) {
      lineKeys.push('comparator');
      timeData = getReaderComparator (data, comparatorData);
    }

    let readTimeChartComponent = <LineChart
      data={timeData}
      keys={lineKeys}
      yLabel='Page Views'
      xLabel='Time'
      cols={12}
      />


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
          renderDateRange={FeatureFlag.check('article:modifier:DateRange')}
          renderComparator={FeatureFlag.check('article:modifier:comparator')}
          renderFilters={FeatureFlag.check('article:modifier:filters')}
          query={this.props.query}
          uuid={this.props.params.uuid}
          />

        <main >

          <SectionHeadlineStats
            data={data.article}
            comparatorData={comparatorData.article}
            />

          <Row>
            <Col xs={12}>
              <h4>When did users access the article?</h4>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              {renderReadTimeChartComponent ? readTimeChartComponent : {}}
            </Col>
          </Row>

          <SectionUserAccess
            data={data.article}
            comparatorData={comparatorData.article}
            />

          <SectionUserOrigins
            data={data.article}
            comparatorData={comparatorData.article}
            />

        </main>
      </Col>
    </DocumentTitle>);
  }
}

export default connectToStores(ArticleView);
