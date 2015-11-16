import alt from '../alt';
import assign from 'object-assign';
import Raven from 'raven-js';

import ArticleActions from '../actions/ArticleActions';
import SectionActions from '../actions/SectionActions';
import TopicActions from '../actions/TopicActions';
import ArticleQueryStore from '../stores/ArticleQueryStore.js';
import SectionQueryStore from '../stores/SectionQueryStore.js';
import TopicQueryStore from '../stores/TopicQueryStore.js';

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
      handleTopicUpdateData : TopicActions.UPDATE_DATA,
      handleOverviewUpdateData : SectionActions.UPDATE_DATA,
      handleUpdateData : ArticleActions.UPDATE_DATA
    });
    ArticleQueryStore.listen(this.handleQueryChange.bind(this));
    SectionQueryStore.listen(this.handleQueryChange.bind(this));
    TopicQueryStore.listen(this.handleQueryChange.bind(this));
  }

  handleOverviewUpdateData(newData) {
    return this.handleUpdateData(newData)
  }

  handleTopicUpdateData(newData) {
    return this.handleUpdateData(newData)
  }

  handleUpdateData(newData) {
    // do not update if the filter is set
    if (Object.keys(this.query.filters).length) {
      return;
    }

    this.devices = getKeys(newData.devices);
    this.regions = getKeys(newData.regions);
    this.cohort = getKeys(newData.userCohort);
    this.referrers = getKeys(newData.referrerTypes);
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
