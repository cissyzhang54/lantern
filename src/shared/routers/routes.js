import { Route, Redirect } from "react-router";
import React from "react";

import AppController from "../controllers/AppController";
import Search from "../handlers/Search";
import Error404 from "../handlers/404";
import TopArticlesView from "../handlers/TopArticlesView";
import Playground from '../handlers/Playground';
import PlaygroundLoader from '../handlers/PlaygroundLoader';
import ArticleRealtimeView from '../handlers/ArticleRealtimeView';

import HistoricalAnalyticsView from '../handlers/HistoricalAnalyticsView';


export default (
  <Route component={ AppController } >
    <Route
      path="/"
      component={Search} />
    <Route
      path="playground"
      component={Playground}>
      <Route
        path=":componentName"
        component={PlaygroundLoader}
      />
    </Route>
    <Route
      path="articles/:uuid/:comparatorType/:comparator"
      component={HistoricalAnalyticsView}
      analyticsView="article"
    />
    <Redirect from="articles/:uuid" to="articles/:uuid/global/FT" />
    <Route
      path="sections/:section"
      component={HistoricalAnalyticsView}
      analyticsView="section"
    />
    <Route
      path="sections/:section/:comparatorType/:comparator"
      component={HistoricalAnalyticsView}
      analyticsView="section"
    />
    <Route
      path="topics/:topic"
      component={HistoricalAnalyticsView}
      analyticsView="topic"
    />
    <Route
      path="topics/:topic/:comparatorType/:comparator"
      component={HistoricalAnalyticsView}
      analyticsView="topic"
    />
    <Route
      path="pickoftheday"
      component={TopArticlesView}
      analyticsView="pickoftheday"
    />
    <Route
      path="realtime/articles/:uuid"
      component={ArticleRealtimeView}
      analyticsView="realtime"
    />
    <Route
      path="*"
      name='404'
      component={Error404}
    />
  </Route>
);
