import React from 'react';
import { Link } from 'react-router';

class ArticleList extends React.Component {

  render() {

    return (
      <div>
        <h2>Articles List</h2>
        <div><Link to="/articles/1234">Article: 1234</Link></div>
        <div><Link to="/articles/4321">Article: 4321</Link></div>
      </div>
    );
  }
}

export default ArticleList;