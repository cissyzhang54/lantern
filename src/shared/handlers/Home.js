import React from "react";
import { Link } from "react-router";
import Search from "../components/Search";

export default class Home extends React.Component {
  render () {
    return <div>
      <h2>Home View</h2>
      <Search/>
      <ul>
        <li><Link to="/articles">Article List</Link></li>
        <li><Link to="/playground">Playground</Link></li>
      </ul>
      </div>;
  }
}
