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
    this.total = 0;
    this.from = 0;
    this.bindListeners({
      handleUpdateResults: SearchActions.UPDATE_RESULTS,
      handleSearchFailed: SearchActions.SEARCH_FAILED,
      handleGetMoreResults: SearchActions.GET_MORE_RESULTS,
      handleSearch: SearchActions.SEARCH,
      handleDestroy: SearchActions.DESTROY
    });

    this.exportAsync(SearchSource);

  }

  handleUpdateResults(data) {
    this.loading = false;
    this.results = this.results.concat(data.results);
    this.total = data.total;
    this.from += data.results.length;
    this.errorMessage = data.results.length ? null : 'Zero Results Found';
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
    this.from = 0;
    this.results = [];
    this.total = 0;
    this.getInstance().search(query);
  }

  handleGetMoreResults() {
    if (this.results.length < this.total)
      this.getInstance().search(this.query, this.from);
  }

  handleDestroy() {
    this.query = '';
    this.loading = false;
    this.results = [];
    this.from = 0;
    this.total = 0;
    this.errorMessage = null;
  }

}

export default alt.createStore(SearchStore, 'SearchStore');
