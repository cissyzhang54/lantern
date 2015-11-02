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

    this.devices = getKeys(newData.devices);
    this.regions = getKeys(newData.regions);
    this.cohort = getKeys(newData.user_cohort);
    this.referrers = getKeys(newData.referrer_types);
  }

  handleQueryChange(query) {
    this.query = query.query;
  }

}

export default alt.createStore(FilterStore, 'FilterStore');



function getKeys(data) {
  let d;
  let keys = [];
  for (let i = 0; i < data.length; i++) {
    d = data[i];
    if (d[1]) keys.push(d[0])
  }
  return keys
}

export { getKeys as getKeys };
