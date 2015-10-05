import React from 'react/addons';
import Link from 'react-router/lib/components/Link';
import DocumentTitle from 'react-document-title';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import Alert from 'react-bootstrap/lib/Alert';
import connectToStores from 'alt/utils/connectToStores';
import moment from 'moment';

import Header from "../components/Header";
import Modifier from "../components/Modifier";
import LineChart from "../components/LineChart";
import PieChart from "../components/PieChart";
import BarChart from "../components/BarChart.js";
import Table from "../components/Table.js";
import Logo from "../components/Logo";
import SingleMetric from "../components/SingleMetric";
import ArticleStore from '../stores/ArticleStore';
import ArticleActions from '../actions/ArticleActions';
import ComparatorStore from '../stores/ComparatorStore';
import ComparatorActions from '../actions/ComparatorActions';
import QueryStore from '../stores/QueryStore';
import QueryActions from '../actions/QueryActions';
import Error404 from '../handlers/404';
import FeatureFlag from '../utils/featureFlag';

const loadingStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};
const updatingStyle = {
  position: 'absolute',
  top: '2em',
  left: '40%',
  width: '20%',
  textAlign: 'center',
};

function updateQuery(uuid, comparator){
  QueryActions.selectUUID(uuid);
  if (comparator){
    QueryActions.selectComparator(comparator);
  }
}

const DEFAULT_STATE = {
  uuid: null,
  loading: true,
  updating: false,
  comparator: null
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
    this.state.loading = !this.props.data
    this.state.updating = this.props.articleLoading || this.props.comparatorLoading

    let data = this.props.data;
    let hasComparator = (this.props.params.comparator !== undefined);
    let comparatorData = this.props.comparatorData || { article: {}};
    let title = (data) ? 'Lantern - ' + data.article.title : '';
    let renderHeaderRow = FeatureFlag.check('article:title');
    let renderModifierRow = FeatureFlag.check('article:modifier');
    let renderWordCountComponent = FeatureFlag.check('article:wordCount');
    let renderImageCountComponent = FeatureFlag.check('article:imageCount');
    let renderBodyLinksComponent = FeatureFlag.check('article:bodyLinksCount');
    let renderTimeOnPageComponent = FeatureFlag.check('article:timeOnPage');
    let renderPageViewsComponent = FeatureFlag.check('article:pageViews');
    let renderSocialReadersComponent = FeatureFlag.check('article:socialReaders');
    let renderReadTimeChartComponent = FeatureFlag.check('article:readTimes');
    let renderDeviceChartComponent = FeatureFlag.check('article:devices');
    let renderChannelsChartComponent = FeatureFlag.check('article:channels');
    let renderExternalReferrersComponent = FeatureFlag.check('article:referrers');
    let renderExternalHeader = renderExternalReferrersComponent;
    let updating = <div></div>

    if (this.props.errorMessage) {
      return (<div><Error404/></div>);
    } else if (this.state.loading) {
      return (
        <div style={loadingStyle}>
          <Logo message="Loading Article..." loading />
        </div>
      );
    } else if (this.state.updating) {
      updating = (
        <Alert bsStyle="warning" style={updatingStyle}>
          <strong>Updating Article...</strong>
        </Alert>
      );
    }

    /* Header Row HTML */
    let headerRow = <Row className='container-fluid'>
        <Header
          identifier='article:title'
          title={data.article.title}
          author={'By: ' + data.article.author}
          published={'Published: ' + data.article.published_human}
          uuid={data.article.uuid}
          />
    </Row>;

    /* Modifier Row HTML */
    let modifierRow = <Row className='container-fluid'>
      <Modifier
        tags={data.article.topics.concat(data.article.sections)}
        renderDateRange={FeatureFlag.check('article:modifier:DateRange')}
        renderComparator={FeatureFlag.check('article:modifier:comparator')}
        renderFilters={FeatureFlag.check('article:modifier:filters')}
        query={this.props.query}
        uuid={this.props.params.uuid}
        />
    </Row>;

    /* Single Metric Components */
    let wordCountComponent = <SingleMetric
      metric={data.article.wordCount}
      metricType='integer'
      label='Article Wordcount'
      size='small'
      />;
    let imageCountComponent = <SingleMetric
      metric={data.article.imageCount}
      metricType='integer'
      label='Images'
      size='small'
      />;
    let bodyLinksComponent =  <SingleMetric
      identifier='article:bodyLinksCount'
      metric={data.article.bodyLinksCount}
      metricType='integer'
      label='Body Links'
      size='small'
      />;
    let timeOnPageComponent = <SingleMetric
      metric={data.article.timeOnPage}
      metricType='time'
      label='Time on Page'
      size='large'
      />;
    let pageViewsComponent = <SingleMetric
      metric={data.article.pageViews}
      comparatorMetric={hasComparator ? comparatorData.article.category_average_view_count : ''}
      metricType='integer'
      label='Page Views'
      size='large'
      />;
    let socialReadersComponent = <SingleMetric
      metric={data.article.socialReaders}
      metricType='integer'
      label='Social Readers'
      size='large'
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

    let devices = data.article.devices.map((d) => {
      if (!d[0]) d[0] = 'Unknown';
      return d;
    });
    let deviceChartComponent = (
      <Col xs={6}>
        <h5>Devices:</h5>
        <PieChart
          data={devices}
          keys={['views']}
        />
      </Col>
    );

    let chans = data.article.channels.map((d) => {
      if (!d[0]) d[0] = 'Unknown';
      return d;
    });
    let channelsChartComponent =  <Col xs={6}>
      <h5>Channels:</h5>
      <PieChart
        data={chans}
        keys={['views']}
        />
      </Col>

    let refs = data.article.referrer_names.map((d)=> {
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
          <h4>Where did the readers come from?</h4>
        </Col>
      </Row>
    );

    return (<DocumentTitle title={title}>
      <div className='container-fluid'>

        {updating}
        {renderHeaderRow ? headerRow : {}}
        {renderModifierRow ? modifierRow : {}}

        <main className='container-fluid'>
          <Row >
            <Col xs={12} sm={3} >
              <Col xs={4} sm={12} >
                {renderWordCountComponent ? wordCountComponent : {}}
              </Col>
              <Col xs={4} sm={12} >
                {renderImageCountComponent ? imageCountComponent : {}}
              </Col>
              <Col xs={4} sm={12} >
                {renderBodyLinksComponent ? bodyLinksComponent : {}}
              </Col>
            </Col>
            <Col xs={12} sm={9} >
              <Col xs={12} sm={4} >
                {renderTimeOnPageComponent ? timeOnPageComponent : {}}
              </Col>
              <Col xs={12} sm={4} >
                {renderPageViewsComponent ? pageViewsComponent : {}}
              </Col>
              <Col xs={12} sm={4} >
                {renderSocialReadersComponent ? socialReadersComponent : {}}
              </Col>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <h4>When did readers access the article?</h4>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              {renderReadTimeChartComponent ? readTimeChartComponent : {}}
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <h4>How did readers access the article?</h4>
            </Col>
          </Row>
          <Row>
              {renderDeviceChartComponent ? deviceChartComponent : {}}
              {renderChannelsChartComponent ? channelsChartComponent : {}}
          </Row>
          {renderExternalHeader ? externalHeader : {}}
          {renderExternalReferrersComponent ? externalReferrersComponent : {}}
        </main>
      </div>
    </DocumentTitle>);
  }
}

export default connectToStores(ArticleView);
