import React from "react";
import DocumentTitle from 'react-document-title';
import { Link } from "react-router";
import Search from "../components/Search";
import Logo from "../components/Logo";

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
        <Search/>
        <h2><span className="small">Recent Articles</span></h2>
        <div><Link to="/articles/0049a468-4be5-11e5-b558-8a9722977189">Private equity secondaries evolve with Palamon deal</Link></div>
        <div><Link to="/articles/200bcb86-4bb9-11e5-9b5d-89a026fda5c9">Uber: Chinese traffic jam</Link></div>
      </AltContainer>
    </DocumentTitle>);
  }
}
