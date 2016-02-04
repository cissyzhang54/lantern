import React from "react";
import DocumentTitle from 'react-document-title';
import Search from "../components/Search";

import SearchStore from '../stores/SearchStore'
import SearchActions from '../actions/SearchActions';
import AltContainer from 'alt-container';

export default class Home extends React.Component {

  componentDidMount() {
    let analytics = require('../utils/analytics');
    analytics.sendGAPageViewEvent();
  }

  render () {
    let title = 'Lantern -  Search';

    return (<DocumentTitle title={title}>
      <AltContainer
        store={SearchStore}
        actions={SearchActions}
      >
        <h2 className="sr-only">Search</h2>
        <Search />
      </AltContainer>
    </DocumentTitle>);
  }
}
