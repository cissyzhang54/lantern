import alt from '../alt';
import assign from 'object-assign';
import Raven from 'raven-js';
import uuid from 'uuid';

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
    this.lastRequest;
  }

  updateResults(data) {
    if (data.requestId !== this.lastRequest) {
      return;
    }
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
    let requestId = uuid.v4();
    this.lastRequest = requestId;
    this.loading = true;
    this.query = query;
    this.from = 0;
    this.results = [];
    this.total = 0;
    this.getInstance().search({
      term: query,
      requestId: requestId
    });
  }

  getMoreResults() {
    if (this.results.length < this.total) {
      let requestId = uuid.v4();
      this.lastRequest = requestId;
      this.getInstance().search({
        term: this.query,
        requestId: requestId}
        , this.from);
    }
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
