import { Route, DefaultRoute, NotFoundRoute } from "react-router";
import React from "react";

import AppController from "../controllers/AppController";
import Search from "../handlers/Search";
import Error404 from "../handlers/404";
import ArticleView from "../handlers/ArticleView";
import Playground from '../handlers/Playground';
import PlaygroundLoader from '../handlers/PlaygroundLoader';


export default (
  <Route handler={ AppController } path="/" >
    <DefaultRoute handler={Search} />
    <Route path="playground" handler={Playground}>
      <Route path=":componentName" handler={PlaygroundLoader}/>
    </Route>
    <Route path="articles/:uuid" handler={ArticleView} />
    <Route path="articles/:uuid/:comparatorType/:comparator" handler={ArticleView} />
    <NotFoundRoute name='404' handler={Error404}   />
  </Route>
);
