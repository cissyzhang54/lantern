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
    let title = (this.props.data) ? 'Lantern - ' + this.props.data.title : '';
    return (<DocumentTitle title={title}>
      <div>
        <Header
            title={this.props.data ? this.props.data.title : 'loading'}
            author={this.props.data ? 'By: ' + this.props.data.author : 'loading'}
            published={this.props.data ? 'Date: ' + this.props.data.published : 'loading'}
        />
        <Modifier/>
        <main>
          <Row>
            <Col xs={12} sm={3} >
              <Col xs={4} sm={12} >
                <SingleMetric metric={this.props.data ? this.props.data.wordCount : 0} metricType='integer' label='Article Wordcount' size='small' />
              </Col>
              <Col xs={4} sm={12} >
                <SingleMetric metric={this.props.data ? this.props.data.imageCount : 0} metricType='integer' label='Images' size='small' />
              </Col>
              <Col xs={4} sm={12} >
                <SingleMetric metric={this.props.data ? this.props.data.bodyLinksCount : 0} metricType='integer' label='Body Links' size='small' />
              </Col>
            </Col>
            <Col xs={12} sm={9} >
              <Col xs={12} sm={4} >
                <SingleMetric metric={this.props.data ? this.props.data.timeOnPage : 0} comparatorMetric={2} metricType='time' label='Time on Page' size='large' />
              </Col>
              <Col xs={12} sm={4} >
                <SingleMetric metric={this.props.data ? this.props.data.pageViews : 0} comparatorMetric={8092} metricType='integer' label='Page Views' size='large' />
              </Col>
              <Col xs={12} sm={4} >
                <SingleMetric metric={this.props.data ? this.props.data.socialReaders : 0} comparatorMetric={808} metricType='integer' label='Social Readers' size='large' />
              </Col>
            </Col>
          </Row>
          <LineChart
            data={this.props.data ? this.props.data.readTimes : []}
            keys={['value']}
            title="When did readers access the article?"/>
          <Row>
            <Col lg={12} >
              <div>id: {this.props.data ? this.props.data.uuid : 'loading'}</div>
              <div><Link to="/articles">&lt;&lt; Article List</Link></div>
            </Col>
          </Row>
        </main>
      </div>
    </DocumentTitle>);
  }
}

export default connectToStores(ArticleView);
