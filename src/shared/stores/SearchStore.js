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
    this.bindActions(SearchActions);
    this.exportAsync(SearchSource);
  }

  updateResults(data) {
    this.loading = false;
    this.results = this.results.concat(data.results);
    this.total = data.total;
    this.from += data.results.length;
    this.errorMessage = data.results.length ? null : 'Zero Results Found';
  }

  searchFailed(error) {
    this.loading = false;
    this.errorMessage = error.message;

    Raven.captureException(error, {
      extra: error
    });
  }

  search(query) {
    this.loading = true;
    this.query = query;
    this.from = 0;
    this.results = [];
    this.total = 0;
    this.getInstance().search(query);
  }

  getMoreResults() {
    if (this.results.length < this.total)
      this.getInstance().search(this.query, this.from);
  }

  destroy() {
    this.query = '';
    this.loading = false;
    this.results = [];
    this.from = 0;
    this.total = 0;
    this.errorMessage = null;
  }

}

export default alt.createStore(SearchStore, 'SearchStore');
