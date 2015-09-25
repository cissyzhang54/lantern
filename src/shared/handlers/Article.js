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

  componentWillMount() {
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

  componentWillUnmount() {
    ArticleActions.destroy();
    ComparatorActions.destroy();
    QueryStore.unlisten(this._boundQueryHandlerRef);
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
  }

  render() {
    if (this.props.errorMessage) {
      return (<div><Error404/></div>);
    }

    let data = this.props.data;
    let hasComparator = this.props.params.comparator !== undefined ? true : false;
    let comparatorData = this.props.comparatorData;

    if (!data || this.props.loading || comparatorData == null && this.props.params.comparator !== undefined) {

      const loadingStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      };

      return (<div style={loadingStyle}><Logo message="Loading Article..." loading /></div>);
    }

    let title = (data) ? 'Lantern - ' + data.article.title : '';
    return (<DocumentTitle title={title}>
      <div>
        <Row>
          <Header
              identifier='article:title'
              title={data.article.title}
              author={'By: ' + data.article.author}
              published={'Published: ' + data.article.published_human}
              uuid={data.article.uuid}
              />
        </Row>
        <Row>
          <Modifier
            identifier='article:modifier'
            tags={data.article.topics.concat(data.article.sections)}
            query={this.props.query}
            />
        </Row>
        <main>
          <Row >
            <Col xs={12} sm={3} >
              <Col xs={4} sm={12} >
                <SingleMetric
                  identifier='article:wordCount'
                  metric={data.article.wordCount}
                  metricType='integer'
                  label='Article Wordcount'
                  size='small'
                />
              </Col>
              <Col xs={4} sm={12} >
                <SingleMetric
                  identifier='article:imageCount'
                  metric={data.article.imageCount}
                  metricType='integer'
                  label='Images'
                  size='small'
                />
              </Col>
              <Col xs={4} sm={12} >
                <SingleMetric
                  identifier='article:bodyLinksCount'
                  metric={data.article.bodyLinksCount}
                  metricType='integer'
                  label='Body Links'
                  size='small'
                />
              </Col>
            </Col>
            <Col xs={12} sm={9} >
              <Col xs={12} sm={4} >
                <SingleMetric
                  identifier='article:timeOnPage'
                  metric={data.article.timeOnPage}
                  metricType='time'
                  label='Time on Page'
                  size='large'
                />
              </Col>
              <Col xs={12} sm={4} >
                <SingleMetric
                  identifier='article:pageViews'
                  metric={data.article.pageViews}
                  comparatorMetric={hasComparator ? comparatorData.article.category_average_view_count : ''}
                  metricType='integer'
                  label='Page Views'
                  size='large'
                />
              </Col>
              <Col xs={12} sm={4} >
                <SingleMetric
                  identifier='article:socialReaders'
                  metric={data.article.socialReaders}
                  metricType='integer'
                  label='Social Readers'
                  size='large'
                />
              </Col>
            </Col>
          </Row>
          <LineChart
            identifier='article:readTimes'
            data={data.article.readTimes}
            keys={['value']}
            title="When did readers access the article?"
            yLabel='Page Views'
            xLabel='Time'
          />
          <Row>
            <Row>
              <Col xs={12}>
                <h4>How did readers access the article?</h4>
              </Col>
             </Row>
           <Row>
             <PieChart
                identifier='article:devices'
                title="Devices"
                cols={6}
              />
              <PieChart
                identifier='article:channels'
                data={data.article.channels}
                keys={['views']}
                title="Channels"
                cols={6}
              />
            </Row>
          </Row>
        </main>
      </div>
    </DocumentTitle>);
  }
}

export default connectToStores(ArticleView);
