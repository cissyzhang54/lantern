import { Route, Redirect } from "react-router";
import React from "react";
import isBrowser from "../utils/isBrowser";
import AppController from "../controllers/AppController";
import Search from "../handlers/Search";
import Error404 from "../handlers/404";
import TopArticlesView from "../handlers/TopArticlesView";
import Playground from '../handlers/Playground';
import PlaygroundLoader from '../handlers/PlaygroundLoader';
import ArticleRealtimeView from '../handlers/ArticleRealtimeView';

import HistoricalAnalyticsView from '../handlers/HistoricalAnalyticsView';

function scrollToTop() {
  if (isBrowser()) {
    window.scrollTop = 0;
  }
}

export default (
  <Route component={AppController}>
    <Route
      path="/"
      onEnter={scrollToTop}
      component={Search}
    />
    <Route
      path="playground"
      onEnter={scrollToTop}
      component={Playground}
    >
      <Route
        path=":componentName"
        onEnter={scrollToTop}
        component={PlaygroundLoader}
      />
    </Route>
    <Route
      path="articles/:uuid/:comparatorType/:comparator"
      component={HistoricalAnalyticsView}
      onEnter={scrollToTop}
      analyticsView="article"
    />
    <Redirect from="articles/:uuid"
      to="articles/:uuid/global/FT"
    />
    <Route
      path="sections/:section"
      onEnter={scrollToTop}
      component={HistoricalAnalyticsView}
      analyticsView="section"
    />
    <Route
      path="sections/:section/:comparatorType/:comparator"
      onEnter={scrollToTop}
      component={HistoricalAnalyticsView}
      analyticsView="section"
    />
    <Route
      path="topics/:topic"
      onEnter={scrollToTop}
      component={HistoricalAnalyticsView}
      analyticsView="topic"
    />
    <Route
      path="topics/:topic/:comparatorType/:comparator"
      onEnter={scrollToTop}
      component={HistoricalAnalyticsView}
      analyticsView="topic"
    />
    <Route
      path="pickoftheday"
      onEnter={scrollToTop}
      component={TopArticlesView}
      analyticsView="pickoftheday"
    />
    <Route
      path="realtime/articles/:uuid"
      onEnter={scrollToTop}
      component={ArticleRealtimeView}
      analyticsView="realtime"
    />
    <Route
      path="realtime/articles/:uuid/:timespan"
      onEnter={scrollToTop}
      component={ArticleRealtimeView}
      analyticsView="realtime"
    />
    <Route
      path="*"
      name='404'
      onEnter={scrollToTop}
      component={Error404}
    />
  </Route>
);
