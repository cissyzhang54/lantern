// polyfill for deprecated SVG PathSeg apis
// remove when we update to c3 v0.4.11
// https://github.com/masayuki0812/c3/issues/1566
require('pathseg');
import React from "react";
import ReactDOM from "react-dom";
import Iso from "iso";
import alt from "../shared/alt";
import Router from "react-router";
import routes from "../shared/routers/routes";
import createBrowserHistory from "history/lib/createBrowserHistory";
import "./styles/app"

let history = createBrowserHistory();

Iso.bootstrap(function (state, meta, container) {
  alt.bootstrap(state);
  ReactDOM.render(
    <Router history={history}>{routes}</Router>,
    document.getElementById('react-app')
  );
});
