import React from 'react/addons';
import { Link } from 'react-router';
import connectToStores from 'alt/utils/connectToStores';
import Header from "../components/Header";
import Modifier from "../components/Modifier";

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

    return (
      <div>
        <Header
            title={this.props.data ? this.props.data.title : 'loading'}
            author={this.props.data ? 'By: ' + this.props.data.author : 'loading'}
            published={this.props.data ? 'Date: ' + this.props.data.published : 'loading'}
        />
        <Modifier/>
        <main>
          <SingleMetric
            metric={this.props.pageViews}
            comparitorMetric={8092}
            metricType='integer'
            label='Page Views'
            size='large'
          />
          <SingleMetric
            metric={this.props.socialReaders}
            comparitorMetric={808}
            metricType='integer'
            label='Social Readers'
            size='large'
            />
          <div>id: {this.props.data ? this.props.data.uuid : 'loading'}</div>
          <div><Link to="/articles">&lt;&lt; Article List</Link></div>
        </main>
      </div>
    );
  }
}

export default connectToStores(ArticleView);
