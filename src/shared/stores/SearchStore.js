import alt from '../alt';
import assign from 'object-assign';
import Raven from 'raven-js';
import uuid from 'uuid';
import _ from 'underscore';

import SearchActions from '../actions/SearchActions';
import SearchSource from '../sources/SearchSource';

class SearchStore {

  constructor() {
    this.results = [];
    this.sections = [];
    this.topics = [];
    this.errorMessage = null;
    this.error = null;
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
    this.sections = countSortAndGetTop10(this.results, 'sections');
    this.topics = countSortAndGetTop10(this.results, 'topics');
    this.total = data.total;
    this.from += data.results.length;
    this.errorMessage = data.results.length ? null : 'Zero Results Found';
  }

  searchFailed(error) {
    this.loading = false;
    this.errorMessage = error.message;
    this.error = error;

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
    this.sections = [];
    this.topics = [];
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
    this.sections = [];
    this.topics = [];
    this.from = 0;
    this.total = 0;
    this.errorMessage = null;
  }

}

// given an array of results, it goes through all of the
// results and gets a count of unique values inside the
// array inside `property`, then it sorts them by count
// and returns the top 10.
function countSortAndGetTop10(results, property) {
  let allproperties = [];
  let propertyTypeCounts = {};
  results.forEach((result, i) => {
    allproperties = allproperties.concat(result[property]);
  });
  propertyTypeCounts = _.countBy(allproperties, (pt) => pt);
  return _.sortBy(Object.keys(propertyTypeCounts), (pt) => -propertyTypeCounts[pt]).slice(0, 10);
}

export default alt.createStore(SearchStore, 'SearchStore');
