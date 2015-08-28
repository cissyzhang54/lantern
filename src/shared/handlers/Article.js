import React from 'react/addons';
import { Link } from 'react-router';
import connectToStores from 'alt/utils/connectToStores';
import Header from "../components/Header";
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
            logoSrc='http://pinsoftstudios.com/wp-content/uploads/2012/10/pie-chart-fi.jpg'
        />
        <h2>Article View</h2>
        <div>id: {this.props.data ? this.props.data.uuid : 'loading'}</div>
        <div><Link to="/articles">&lt;&lt; Article List</Link></div>
      </div>
    );
  }
}

export default connectToStores(ArticleView);
