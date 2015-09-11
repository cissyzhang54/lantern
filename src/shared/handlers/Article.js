import React from 'react/addons';
import Link from 'react-router/lib/components/Link';
import DocumentTitle from 'react-document-title';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import connectToStores from 'alt/utils/connectToStores';

import Header from "../components/Header";
import Modifier from "../components/Modifier";
import LineChart from "../components/LineChart";
import Loading from "../components/Loading";
import SingleMetric from "../components/SingleMetric";
import ArticleStore from '../stores/ArticleStore';
import ArticleActions from '../actions/ArticleActions';
import QueryStore from '../stores/QueryStore';
import QueryActions from '../actions/QueryActions';
import Error404 from '../handlers/404';

const style = {
  'margin': '10px 0',
  'padding': '10px 0',
  'borderBottom': '1px solid #ccc'
};

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

      return (<div style={loadingStyle}><Loading message="Loading Article..." /></div>);
    }

    let title = (data) ? 'Lantern - ' + data.article.title : '';
    return (<DocumentTitle title={title}>
      <div>
        <Row style={style}>
          <Header
              identifier='article:title'
              title={data.article.title}
              author={'By: ' + data.article.author}
              published={'Published: ' + data.article.published_human}
              />
        </Row>
        <Row  style={style}>
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
            yLabel='Unique Readers'
            xLabel='Time'
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
