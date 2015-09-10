import alt from '../alt';
import assign from 'object-assign';
import Raven from 'raven-js';

import SearchActions from '../actions/SearchActions';
import SearchSource from '../sources/SearchSource';

class SearchStore {

  constructor() {
    this.results = [];
    this.errorMessage = null;
    this.searching = false;
    this.bindListeners({
      handleUpdateResults: SearchActions.UPDATE_RESULTS,
      handleSearching: SearchActions.SEARCHING,
      handleSearchFailed: SearchActions.SEARCH_FAILED,
      handleSearch: SearchActions.SEARCH,
      handleDestroy: SearchActions.DESTROY
    });

    this.exportAsync(SearchSource);

  }

  handleSearching() {
    this.loading = true;
    this.results = [];
  }

  handleUpdateResults(results) {
    this.loading = false;
    this.results = results;
    this.errorMessage = null;
  }

  handleSearchFailed(error) {
    this.loading = false;
    this.errorMessage = error.message;

    Raven.captureException(error, {
      extra: error
    });
  }

  handleSearch(query) {
    this.getInstance().search(query);
  }

  handleDestroy() {
    this.loading = false;
    this.results = [];
    this.errorMessage = null;
  }

}

export default alt.createStore(SearchStore, 'SearchStore');
