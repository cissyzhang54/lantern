import { Route, DefaultRoute } from "react-router";
import React from "react";

import AppController from "./controllers/AppController";
import Home from "./handlers/Home";
import Article from "./handlers/Article";
import ArticleList from "./handlers/ArticleList";
import Playground from './handlers/Playground';
import PlaygroundLoader from './handlers/PlaygroundLoader';


export default (
  <Route handler={ AppController } path="/" >
    <DefaultRoute handler={Home} />
    <Route path="playground" handler={Playground}>
      <Route path=":componentName" handler={PlaygroundLoader}/>
    </Route>
    <Route path="articles" handler={ArticleList} />
    <Route path="articles/:id" handler={Article} />
  </Route>
);
