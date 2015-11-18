import alt from '../alt';
import moment from 'moment';

import ArticleQueryActions from '../actions/ArticleQueryActions';

function makeNewQuery() {
  return {
    uuid: null,
    dateFrom: moment().subtract(29,'days').toISOString(),
    dateTo: moment(),
    filters: {}
  }
}

class ArticleQueryStore {

  constructor() {
    this.query = makeNewQuery();
    this.bindActions(ArticleQueryActions);
  }

  selectDateRange(dates) {
    this.query.dateFrom = dates.from;
    this.query.dateTo = dates.to;
  }

  setUUID(uuid) {
    this.query.uuid = uuid;
  }

  selectFilter(filter) {
    let key;
    switch (filter.key){
      case 'Device': key = 'device_type'; break;
      case 'Region': key = 'geo_region'; break;
      case 'UserCohort': key = 'user_cohort'; break;
      case 'Referrers': key = 'referrer_type'; break;
    }
    if (!filter.value.length) {
      return delete this.query.filters[key];
    }

    this.query.filters[key] = filter.value;
  }

  destroy() {
    this.query = makeNewQuery();
  }

}

export default alt.createStore(ArticleQueryStore, 'ArticleQueryStore');
