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
