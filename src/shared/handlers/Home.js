import React from "react";
import DocumentTitle from 'react-document-title';
import { Link } from "react-router";
import Search from "../components/Search";
import Logo from "../components/Logo";
import RecentArticles from "../components/RecentArticles";

import SearchStore from '../stores/SearchStore'
import SearchActions from '../actions/SearchActions';
import AltContainer from 'alt/AltContainer';

export default class Home extends React.Component {

  componentDidMount() {
    let analytics = require('../utils/analytics');
    analytics.sendGAEvent('pageview');
  }

  render () {
    let title = 'Lantern -  Search';

    return (<DocumentTitle title={title}>
      <AltContainer store={SearchStore} actions={SearchActions}>
        <h2 className="sr-only">Search</h2>
        <Search />
        <RecentArticles identifier="home:recentArticles"/>
      </AltContainer>
    </DocumentTitle>);
  }
}
