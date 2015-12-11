import alt from '../alt';
import assign from 'object-assign';
import Raven from 'raven-js';

import AnalyticsActions from '../actions/AnalyticsActions';
import AnalyticsStore from '../stores/AnalyticsStore';
import FilterActions from '../actions/FilterActions';

class FilterStore {
  constructor() {
    this.state = {
      devices: [],
      regions: [],
      cohort: [],
      referrers: [],
      query: {
        filters : {}
      }
    }
    this.bindActions(FilterActions);
    this.bindListeners({
      handleUpdateData : AnalyticsActions.UPDATE_DATA
    });
  }

  handleUpdateData(newData) {
    // do not update if the filter is set
    if (Object.keys(this.state.query.filters).length) {
      return;
    }

    let data = newData.data;

    let newState = assign({}, this.state, {
      devices: getKeys(data.devices),
      regions: getKeys(data.regions),
      cohort: getKeys(data.userCohort),
      referrers: getKeys(data.referrerTypes)
    })

    this.setState(newState);
  }

  selectFilter(filter) {
    let query = this.state.query;
    let key;
    switch (filter.key){
      case 'Device': key = 'device_type'; break;
      case 'Region': key = 'geo_region'; break;
      case 'UserCohort': key = 'user_cohort'; break;
      case 'Referrers': key = 'referrer_type'; break;
    }
    if (!filter.value.length) {
      delete query.filters[key];
    }  else {
      query.filters[key] = filter.value;
    }

    this.setState({query : query});

    // XXX altough ugly, we need to do this to
    // dispatch on the next tick.
    setTimeout(() => {
      AnalyticsActions.updateQuery(query);
    }, 1);
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
