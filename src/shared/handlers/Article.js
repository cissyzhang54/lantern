import React from 'react/addons';
import { Link } from 'react-router';
import DocumentTitle from 'react-document-title';
import connectToStores from 'alt/utils/connectToStores';
import Header from "../components/Header";
import { Col, Row } from 'react-bootstrap';
import Modifier from "../components/Modifier";
import LineChart from "../components/LineChart";

import SingleMetric from "../components/SingleMetric";
import ArticleStore from '../stores/ArticleStore';
import ArticleActions from '../actions/ArticleActions';

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
    return [ArticleStore];
  }

  static getPropsFromStores() {
    let state = ArticleStore.getState();
    return state;
  }

  componentWillMount() {
    ArticleActions.requestData(this.props.params.id);
  }

  componentWillUnmount() {
    ArticleActions.destroy();
  }

  render() {
    let data = this.props.data;

    let title = (data) ? 'Lantern - ' + data.article.title : '';
    return (<DocumentTitle title={title}>
      <div>
        <Row style={style}>
          <Header
              title={data ? data.article.title : 'loading'}
              author={data ? 'By: ' + data.article.author : 'loading'}
              published={data ? 'Published: ' + data.article.published_human : 'loading'}
              />
        </Row>
        <Row  style={style}>
          <Modifier tags={data ? data.article.topics.concat(data.article.sections) : []}/>
        </Row>
        <main>
          <Row >
            <Col xs={12} sm={3} >
              <Col xs={4} sm={12} >
                <SingleMetric metric={data ? data.article.wordCount : 0} metricType='integer' label='Article Wordcount' size='small' />
              </Col>
              <Col xs={4} sm={12} >
                <SingleMetric metric={data ? data.article.imageCount : 0} metricType='integer' label='Images' size='small' />
              </Col>
              <Col xs={4} sm={12} >
                <SingleMetric metric={data ? data.article.bodyLinksCount : 0} metricType='integer' label='Body Links' size='small' />
              </Col>
            </Col>
            <Col xs={12} sm={9} >
              <Col xs={12} sm={4} >
                <SingleMetric metric={data ? data.article.timeOnPage : 0} comparatorMetric={2} metricType='time' label='Time on Page' size='large' />
              </Col>
              <Col xs={12} sm={4} >
                <SingleMetric metric={data ? data.article.pageViews : 0} comparatorMetric={8092} metricType='integer' label='Page Views' size='large' />
              </Col>
              <Col xs={12} sm={4} >
                <SingleMetric metric={data ? data.article.socialReaders : 0} comparatorMetric={808} metricType='integer' label='Social Readers' size='large' />
              </Col>
            </Col>
          </Row>
          <LineChart
            data={data ? data.article.readTimes : []}
            keys={['value']}
            title="When did readers access the article?"/>
          <Row>
            <Col lg={12} >
              <div>id: {data ? data.article.uuid : 'loading'}</div>
            </Col>
          </Row>
        </main>
      </div>
    </DocumentTitle>);
  }
}

export default connectToStores(ArticleView);
