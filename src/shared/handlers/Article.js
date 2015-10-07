import React from 'react/addons';
import Link from 'react-router/lib/components/Link';
import DocumentTitle from 'react-document-title';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import Alert from 'react-bootstrap/lib/Alert';
import connectToStores from 'alt/utils/connectToStores';
import moment from 'moment';

import Header from "../components/Header";
import SectionModifier from "../components/SectionModifier";
import LineChart from "../components/LineChart";
import PieChart from "../components/PieChart";
import BarChart from "../components/BarChart.js";
import Table from "../components/Table.js";
import Logo from "../components/Logo";

import SectionHeadlineStats from "../components/SectionHeadlineStats";

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
      queryState.query.dateTo = moment(articleState.data.article.published)
      queryState.query.dateFrom = moment()
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
    let renderHeaderRow = FeatureFlag.check('article:title');
    let renderReadTimeChartComponent = FeatureFlag.check('article:readTimes');
    let renderDeviceChartComponent = FeatureFlag.check('article:devices');
    let renderChannelsChartComponent = FeatureFlag.check('article:channels');
    let renderExternalReferrersComponent = FeatureFlag.check('article:referrers');
    let renderExternalHeader = renderExternalReferrersComponent;
    let devices = data.article.devices.map((d) => d || 'unknown');
    let channels = data.article.channels.map((d) => d || 'unknown');
    let refs = data.article.referrer_types.map((d)=> {
      return {
        referrer: d[0] ? d[0] : 'Unknown',
        views: d[1]
      };
    });
    let refUrls = data.article.referrer_urls.map((d, i) => {
      const maxLen = 60;
      const displayString = d[0].length > maxLen ? d[0].substr(0, maxLen)+'…' : d[0];
      let url = (
        <a
          target="_blank"
          href={d[0]}
          >
          {displayString}
        </a>
      );
      return {
        referrer: d[0] ? url : 'Not available',
        views: d[1]
      };
    });

    /* Header Row HTML */
    let headerRow = <Header
          identifier='article:title'
          title={data.article.title}
          author={'By: ' + data.article.author}
          published={'Published: ' + data.article.published_human}
          uuid={data.article.uuid}
          />
    /* Line Charts */
    let readTimeChartComponent = <LineChart
      data={data.article.readTimes}
      keys={['value']}
      yLabel='Page Views'
      xLabel='Time'
      cols={12}
      />

      /* Pie Charts */

    let deviceChartComponent = (
      <Col xs={6}>
        <h5>Devices:</h5>
        <PieChart
          data={devices}
          keys={['views']}
        />
      </Col>
    );

    let channelsChartComponent =  <Col xs={6}>
      <h5>Channels:</h5>
      <PieChart
        data={channels}
        keys={['views']}
        />
      </Col>

    let externalReferrersComponent = (
      <div>
        <Row>
          <Col xs={12}>
            <h5>External Sources</h5>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={6}>
            <BarChart
              data={refs}
              keys={['views']}
              category={'referrer'}
              yLabel="Page Views"
              xLabel="Referrer"
            />
          </Col>
          <Col xs={12} sm={6}>
            <Table
              headers={['Referrer', 'Views']}
              rows={refUrls}
            />
          </Col>
        </Row>
      </div>
    );

    let externalHeader = (
      <Row>
        <Col xs={12}>
          <h4>Where did the users come from?</h4>
        </Col>
      </Row>
    );

    return (<DocumentTitle title={title}>
      <Col xs='12'>

        {updating}
        {renderHeaderRow ? headerRow : {}}

        <SectionModifier
          tags={data.article.topics.concat(data.article.sections)}
          renderDateRange={FeatureFlag.check('article:modifier:DateRange')}
          renderComparator={FeatureFlag.check('article:modifier:comparator')}
          renderFilters={FeatureFlag.check('article:modifier:filters')}
          query={this.props.query}
          uuid={this.props.params.uuid}
          />

        <main >
          <SectionHeadlineStats data={data.article} comparatorData={comparatorData.article} />
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
          <Row>
            <Col xs={12}>
              <h4>How did users access the article?</h4>
            </Col>
          </Row>
          <Row>
              {renderDeviceChartComponent ? deviceChartComponent : {}}
              {renderChannelsChartComponent ? channelsChartComponent : {}}
          </Row>
          {renderExternalHeader ? externalHeader : {}}
          {renderExternalReferrersComponent ? externalReferrersComponent : {}}
        </main>
      </Col>
    </DocumentTitle>);
  }
}

export default connectToStores(ArticleView);
