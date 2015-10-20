import { Route, DefaultRoute, NotFoundRoute } from "react-router";
import React from "react";

import AppController from "../controllers/AppController";
import Home from "../handlers/Home";
import Error404 from "../handlers/404";
import Article from "../handlers/Article";
import Playground from '../handlers/Playground';
import PlaygroundLoader from '../handlers/PlaygroundLoader';


export default (
  <Route handler={ AppController } path="/" >
    <DefaultRoute handler={Home} />
    <Route path="playground" handler={Playground}>
      <Route path=":componentName" handler={PlaygroundLoader}/>
    </Route>
    <Route path="articles/:uuid" handler={Article} />
    <Route path="articles/:uuid/:comparatorType/:comparator" handler={Article} />
    <NotFoundRoute name='404' handler={Error404}   />
  </Route>
);
