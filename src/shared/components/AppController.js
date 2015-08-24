import React from "react";
import { Router, RouteHandler, Route, Link } from 'react-router';


export default class AppController extends React.Component {
  render() {
    return (<div>
        <header>
          <h1><Link to="/">Lantern</Link></h1>
        </header>
        <main>
          <RouteHandler/>
        </main>
      </div>);
  }
}
