import React from "react";
import DocumentTitle from 'react-document-title';
import { Link } from "react-router";
import Search from "../components/Search";
import Loading from "../components/Loading";

export default class Home extends React.Component {

  render () {
    let title = 'Lantern -  Search';

    return (<DocumentTitle title={title}>
      <div>
        <h2 className="sr-only">Search</h2>
        <Search/>
      </div>
    </DocumentTitle>);
  }
}
