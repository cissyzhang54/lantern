import React from "react";
import Iso from "iso";
import alt from "../shared/alt";
import Router from "react-router";
import routes from "../shared/routers/routes";

import "./styles/app"

Iso.bootstrap(function (state, meta, container) {
  alt.bootstrap(state);
  Router.run(routes, Router.HistoryLocation, (Handler, state) => {
    React.render(<Handler/>, document.getElementById('react-app'));
  });

});
