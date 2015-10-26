import alt from '../alt';
import assign from 'object-assign';
import Raven from 'raven-js';

import ArticleActions from '../actions/ArticleActions';
import ArticleQueryStore from '../stores/ArticleQueryStore.js';

class FilterStore {
  constructor() {
    this.devices = [];
    this.regions = [];
    this.cohort = [];
    this.referrers = [];
    this.query = {
      filters : {}
    }
    this.bindListeners({
      handleUpdateData : ArticleActions.UPDATE_DATA
    });
    ArticleQueryStore.listen(this.handleQueryChange.bind(this));
  }

  handleUpdateData(newData) {
    // do not update if the filter is set
    if (Object.keys(this.query.filters).length) {
      return;
    }

    let article = newData.article;

    this.devices = getKeys(article.devices);
    this.regions = getKeys(article.regions);
    this.cohort = getKeys(article.user_cohort);
    this.referrers = getKeys(article.referrer_types);

  }

  handleQueryChange(query) {
    this.query = query.query;
  }

}

export default alt.createStore(FilterStore, 'FilterStore');

function getKeys(data) {
  return data.map(d => d[0]);
}
