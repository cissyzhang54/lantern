import { Route, DefaultRoute } from "react-router";
import React from "react";

import AppController from "./components/AppController";
import Home from "./components/Home";
import Article from "./components/Article";

export default (
  <Route handler={ AppController } path="/" >
    <DefaultRoute handler={Home} />
    <Route path="articles/:id" handler={Article} />
  </Route>
);
