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
import QueryStore from '../stores/QueryStore';
import QueryActions from '../actions/QueryActions';
import Error404 from '../handlers/404';

class ArticleView extends React.Component {

  constructor(props) {
    super(props);
  }

  static getStores() {
    return [ArticleStore, QueryStore];
  }

  static getPropsFromStores() {
    let articleState = ArticleStore.getState();
    let queryState = QueryStore.getState();
    return {
      query : queryState.query,
      data : articleState.data,
      loading : articleState.loading,
      errorMessage : articleState.errorMessage
    };
  }

  componentWillMount() {
    // XXX consider putting this inside ArticleStore?
    this._boundQueryHandlerRef = this._handleQueryChange.bind(this);
    QueryStore.listen(this._boundQueryHandlerRef);

    if (this.props.data) {
      return;
    }

    QueryActions.selectUUID(this.props.params.id);

  }

  componentWillUnmount() {
    ArticleActions.destroy();
    QueryStore.unlisten(this._boundQueryHandlerRef);
  }

  _handleQueryChange() {
    ArticleStore.loadArticleData(this.props.query);
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

    if (!data || this.props.loading) {

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
                <SingleMetric identifier='article:wordCount' metric={data.article.wordCount} metricType='integer' label='Article Wordcount' size='small' />
              </Col>
              <Col xs={4} sm={12} >
                <SingleMetric identifier='article:imageCount' metric={data.article.imageCount} metricType='integer' label='Images' size='small' />
              </Col>
              <Col xs={4} sm={12} >
                <SingleMetric identifier='article:bodyLinksCount' metric={data.article.bodyLinksCount} metricType='integer' label='Body Links' size='small' />
              </Col>
            </Col>
            <Col xs={12} sm={9} >
              <Col xs={12} sm={4} >
                <SingleMetric identifier='article:timeOnPage' metric={data.article.timeOnPage} comparatorMetric={2} metricType='time' label='Time on Page' size='large' />
              </Col>
              <Col xs={12} sm={4} >
                <SingleMetric identifier='article:pageViews' metric={data.article.pageViews} comparatorMetric={8092} metricType='integer' label='Page Views' size='large' />
              </Col>
              <Col xs={12} sm={4} >
                <SingleMetric identifier='article:socialReaders' metric={data.article.socialReaders} comparatorMetric={808} metricType='integer' label='Social Readers' size='large' />
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
          <PieChart
            identifier='article:devices'
            data={[
          ['Mobile', 0.2, 0.2, 0.2, 0.2, 0.2, 0.4, 0.3, 0.2, 0.2, 0.1, 0.2, 0.2, 0.1, 0.1, 0.2, 0.4, 0.4, 0.3, 0.3, 0.3, 0.2, 0.4, 0.2, 0.5, 0.2, 0.2, 0.4, 0.2, 0.2, 0.2, 0.2, 0.4, 0.1, 0.2, 0.2, 0.2, 0.2, 0.1, 0.2, 0.2, 0.3, 0.3, 0.2, 0.6, 0.4, 0.3, 0.2, 0.2, 0.2, 0.2],
          ['Desktop', 1.4, 1.5, 1.5, 1.3, 1.5, 1.3, 1.6, 1.0, 1.3, 1.4, 1.0, 1.5, 1.0, 1.4, 1.3, 1.4, 1.5, 1.0, 1.5, 1.1, 1.8, 1.3, 1.5, 1.2, 1.3, 1.4, 1.4, 1.7, 1.5, 1.0, 1.1, 1.0, 1.2, 1.6, 1.5, 1.6, 1.5, 1.3, 1.3, 1.3, 1.2, 1.4, 1.2, 1.0, 1.3, 1.2, 1.3, 1.3, 1.1, 1.3],
          ['Toaster', 2.5, 1.9, 2.1, 1.8, 2.2, 2.1, 1.7, 1.8, 1.8, 2.5, 2.0, 1.9, 2.1, 2.0, 2.4, 2.3, 1.8, 2.2, 2.3, 1.5, 2.3, 2.0, 2.0, 1.8, 2.1, 1.8, 1.8, 1.8, 2.1, 1.6, 1.9, 2.0, 2.2, 1.5, 1.4, 2.3, 2.4, 1.8, 1.8, 2.1, 2.4, 2.3, 1.9, 2.3, 2.5, 2.3, 1.9, 2.0, 2.3, 1.8],
        ]}
            title="What devices did readers use?"
            cols={4}
            />
          <Row>
            <Col lg={12} >
              <div>id: {data.article.uuid}</div>
            </Col>
          </Row>
        </main>
      </div>
    </DocumentTitle>);
  }
}

export default connectToStores(ArticleView);
