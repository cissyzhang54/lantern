import React from 'react';
import DocumentTitle from 'react-document-title';
import { Link } from 'react-router';

class ArticleList extends React.Component {

  render() {
    let title = 'Lantern -  Article List';

    return (<DocumentTitle title={title}>
      <div>
        <h2>Articles List</h2>
        <div><Link to="/articles/1234">Article: 1234</Link></div>
        <div><Link to="/articles/4321">Article: 4321</Link></div>
      </div>
    </DocumentTitle>);
  }
}

export default ArticleList;