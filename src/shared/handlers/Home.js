import React from "react";
import DocumentTitle from 'react-document-title';
import { Link } from "react-router";
import Search from "../components/Search";

export default class Home extends React.Component {

  render () {
    let title = 'Lantern -  Search';

    return (<DocumentTitle title={title}>
      <div>
      <h2>Home View</h2>
      <Search/>
      <ul>
        <li><Link to="/articles">Article List</Link></li>
        <li><Link to="/playground">Playground</Link></li>
      </ul>
      </div>
    </DocumentTitle>);
  }
}
