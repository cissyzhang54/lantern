import React from 'react/addons';
import Link from 'react-router/lib/components/Link';
import DocumentTitle from 'react-document-title';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import connectToStores from 'alt/utils/connectToStores';

import Header from "../components/Header";
import Modifier from "../components/Modifier";
import LineChart from "../components/LineChart";
import PieChart from "../components/PieChart";
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

class ArticleView extends React.Component {

  constructor(props) {
    super(props);
  }

  static getStores() {
    return [ArticleStore, ComparatorStore, QueryStore];
  }

  static getPropsFromStores() {
    let comparatorState = ComparatorStore.getState();
    let articleState = ArticleStore.getState();
    let queryState = QueryStore.getState();
    return {
      query : queryState.query,
      data : articleState.data,
      loading : articleState.loading,
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
  }

  _handleQueryChange() {
    ArticleStore.loadArticleData(this.props.query);
    if (this.props.query.comparator){
      ComparatorStore.loadComparatorData(this.props.query);
    }
  }

  componentDidMount() {
    let analytics = require('../utils/analytics');
    analytics.sendGAEvent('pageview');
    analytics.trackScroll();

    // XXX consider putting this inside ArticleStore?
    this._boundQueryHandlerRef = this._handleQueryChange.bind(this);
    QueryStore.listen(this._boundQueryHandlerRef);

    if (this.props.data) {
      return;
    }

    QueryActions.selectUUID(this.props.params.uuid);
    if (this.props.params.comparator){
      QueryActions.selectComparator(this.props.params.comparator);
    }

  }

  render() {
    if (this.props.errorMessage && !this.props.loading) {
      return (<div><Error404/></div>);
    }

    let data = this.props.data;
    let hasComparator = (this.props.params.comparator !== undefined);
    let comparatorData = this.props.comparatorData;

    if (!data || this.props.loading || comparatorData == null && hasComparator) {

      const loadingStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      };

      return (
        <div style={loadingStyle}>
          <Logo message="Loading Article..." loading />
        </div>
      );
    }

    let title = (data) ? 'Lantern - ' + data.article.title : '';

    /* Header Row HTML */
    let renderHeaderRow = FeatureFlag.check('article:title');
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
    let renderModifierRow = FeatureFlag.check('article:modifier');
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
    let renderWordCountComponent = FeatureFlag.check('article:wordCount');
    let wordCountComponent = <SingleMetric
      metric={data.article.wordCount}
      metricType='integer'
      label='Article Wordcount'
      size='small'
      />;
    let renderImageCountComponent = FeatureFlag.check('article:imageCount');
    let imageCountComponent = <SingleMetric
      metric={data.article.imageCount}
      metricType='integer'
      label='Images'
      size='small'
      />;
    let renderBodyLinksComponent = FeatureFlag.check('article:bodyLinksCount');
    let bodyLinksComponent =  <SingleMetric
      identifier='article:bodyLinksCount'
      metric={data.article.bodyLinksCount}
      metricType='integer'
      label='Body Links'
      size='small'
      />;
    let renderTimeOnPageComponent = FeatureFlag.check('article:timeOnPage');
    let timeOnPageComponent = <SingleMetric
      metric={data.article.timeOnPage}
      metricType='time'
      label='Time on Page'
      size='large'
      />;
    let renderPageViewsComponent = FeatureFlag.check('article:pageViews');
    let pageViewsComponent = <SingleMetric
      metric={data.article.pageViews}
      comparatorMetric={hasComparator ? comparatorData.article.category_average_view_count : ''}
      metricType='integer'
      label='Page Views'
      size='large'
      />;
    let renderSocialReadersComponent = FeatureFlag.check('article:socialReaders');
    let socialReadersComponent = <SingleMetric
      metric={data.article.socialReaders}
      metricType='integer'
      label='Social Readers'
      size='large'
      />

    /* Line Charts */
    let renderReadTimeChartComponent = FeatureFlag.check('article:readTimes');
    let readTimeChartComponent = <LineChart
      data={data.article.readTimes}
      keys={['value']}
      yLabel='Page Views'
      xLabel='Time'
      cols={12}
      />

    /* Pie Charts */
    let renderDeviceChartComponent = FeatureFlag.check('article:devices');
    let deviceChartComponent =  <PieChart />;

    let renderChannelsChartComponent = FeatureFlag.check('article:channels');
    let channelsChartComponent =  <PieChart
      data={data.article.channels}
      keys={['views']}
      />;

    return (<DocumentTitle title={title}>
      <div className='container-fluid'>

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
          </Row>
          <Row>
            <Row>
              <Col xs={12}>
                <h4>How did readers access the article?</h4>
              </Col>
            </Row>
            <Row>
              <Col xs={6}>
                <h4>Devices:</h4>
                {renderDeviceChartComponent ? deviceChartComponent : {}}
              </Col>
              <Col xs={6}>
                <h4>Channels:</h4>
                {renderChannelsChartComponent ? channelsChartComponent : {}}
              </Col>
            </Row>
          </Row>
        </main>
      </div>
    </DocumentTitle>);
  }
}

export default connectToStores(ArticleView);
