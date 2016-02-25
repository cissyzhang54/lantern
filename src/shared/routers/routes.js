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
import SectionRealtimeView from '../handlers/SectionRealtimeView';

import HistoricalAnalyticsView from '../handlers/HistoricalAnalyticsView';

function scrollToTop() {
  if (isBrowser()) {
    window.scrollTo(0, 0);
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
      path="articles/:uuid"
      component={HistoricalAnalyticsView}
      onEnter={scrollToTop}
      analyticsView="article"
    >
      <Route
        path=":timespan(/:comparatorType/:comparator)"
        component={HistoricalAnalyticsView}
        onEnter={scrollToTop}
        analyticsView="article"
        />
    </Route>
    <Redirect from="sections/:section"
      to="sections/:section/168"
    />
    <Route
      path="sections/:section"
      onEnter={scrollToTop}
      component={HistoricalAnalyticsView}
      analyticsView="section"
    >
      <Route
        path=":timespan"
        onEnter={scrollToTop}
        component={HistoricalAnalyticsView}
        analyticsView="section"
      />
      <Route
        path=":timespan/:comparatorType/:comparator"
        onEnter={scrollToTop}
        component={HistoricalAnalyticsView}
        analyticsView="section"
      />
    </Route>
    <Redirect from="topics/:topic"
      to="topics/:topic/168"
    />
    <Route
      path="topics/:topic"
      onEnter={scrollToTop}
      component={HistoricalAnalyticsView}
      analyticsView="topic"
    >
      <Route
        path=":timespan"
        onEnter={scrollToTop}
        component={HistoricalAnalyticsView}
        analyticsView="topic"
      />
      <Route
        path=":timespan/:comparatorType/:comparator"
        onEnter={scrollToTop}
        component={HistoricalAnalyticsView}
        analyticsView="topic"
      />
    </Route>

    <Route
      path="pickoftheday"
      onEnter={scrollToTop}
      component={TopArticlesView}
      analyticsView="pickoftheday"
    />
    <Route
      path="realtime/sections/:section"
      onEnter={scrollToTop}
      component={SectionRealtimeView}
      analyticsView="realtime-section"
    />
    <Redirect
      from="realtime/articles/:uuid"
      to="realtime/articles/:uuid/48h"
      />
    <Route
      path="realtime/articles/:uuid"
      component={ArticleRealtimeView}
    >
      <Route
        path=":timespan"
        component={ArticleRealtimeView}
        onEnter={scrollToTop}
        />
    </Route>
    <Route
      path="*"
      name='404'
      onEnter={scrollToTop}
      component={Error404}
    />
  </Route>
);
