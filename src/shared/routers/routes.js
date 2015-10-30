import { Route, Redirect } from "react-router";
import React from "react";

import AppController from "../controllers/AppController";
import Search from "../handlers/Search";
import Error404 from "../handlers/404";
import ArticleView from "../handlers/ArticleView";
import SectionView from "../handlers/SectionView";
import Playground from '../handlers/Playground';
import PlaygroundLoader from '../handlers/PlaygroundLoader';


export default (
  <Route component={ AppController } >
    <Route
      path="/"
      component={Search} />
    <Route path="playground" component={Playground}>
      <Route path=":componentName" component={PlaygroundLoader}/>
    </Route>
    <Route path="articles/:uuid/:comparatorType/:comparator" component={ArticleView} />
    <Redirect from="articles/:uuid" to="articles/:uuid/global/FT" />
    <Route path="sections/:section" component={SectionView} />
    <Route path="*" name='404' component={Error404}   />
  </Route>
);
