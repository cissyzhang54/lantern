import { Route, DefaultRoute } from "react-router";
import React from "react";

import AppController from "./components/AppController";
import Home from "./components/Home";
import Article from "./components/Article";
import ArticleList from "./components/ArticleList";

export default (
  <Route handler={ AppController } path="/" >
    <DefaultRoute handler={Home} />
    <Route path="articles" handler={ArticleList} />
    <Route path="articles/:id" handler={Article} />
  </Route>
);