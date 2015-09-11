import alt from '../alt';
import assign from 'object-assign';
import Raven from 'raven-js';

import SearchActions from '../actions/SearchActions';
import SearchSource from '../sources/SearchSource';

class SearchStore {

  constructor() {
    this.results = [];
    this.errorMessage = null;
    this.loading = false;
    this.query = '';
    this.bindListeners({
      handleUpdateResults: SearchActions.UPDATE_RESULTS,
      handleSearchFailed: SearchActions.SEARCH_FAILED,
      handleSearch: SearchActions.SEARCH,
      handleDestroy: SearchActions.DESTROY
    });

    this.exportAsync(SearchSource);

  }

  handleUpdateResults(results) {
    this.loading = false;
    this.results = results;
    this.errorMessage = results.length ? null : 'Zero Results Found';
  }

  handleSearchFailed(error) {
    this.loading = false;
    this.errorMessage = error.message;

    Raven.captureException(error, {
      extra: error
    });
  }

  handleSearch(query) {
    this.loading = true;
    this.query = query;
    this.getInstance().search(query);
  }

  handleDestroy() {
    this.query = '';
    this.loading = false;
    this.results = [];
    this.errorMessage = null;
  }

}

export default alt.createStore(SearchStore, 'SearchStore');
