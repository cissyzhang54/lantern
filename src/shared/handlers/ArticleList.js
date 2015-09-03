import React from 'react';
import DocumentTitle from 'react-document-title';
import { Link } from 'react-router';

class ArticleList extends React.Component {

  componentDidMount() {
    let analytics = require('../utils/analytics');
    analytics.sendGAEvent('pageview');
  }

  render() {
    let title = 'Lantern -  Article List';

    return (<DocumentTitle title={title}>
      <div>
        <h2>Articles List</h2>
        <div><Link to="/articles/0049a468-4be5-11e5-b558-8a9722977189">Private equity secondaries evolve with Palamon deal</Link></div>
        <div><Link to="/articles/200bcb86-4bb9-11e5-9b5d-89a026fda5c9">Uber: Chinese traffic jam</Link></div>
        <div><Link to="/articles/fake-uuid">BROKEN LINK</Link></div>
      </div>
    </DocumentTitle>);
  }
}

export default ArticleList;
