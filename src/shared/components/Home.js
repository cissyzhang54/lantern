import React from "react";
import { Link } from "react-router";
import Search from "./Search";

export default class Home extends React.Component {
  render () {
    return <div>
      <Link to="/articles">Article List</Link>
      <h1>Home View</h1>
      <Search/>
      </div>;
  }
}
