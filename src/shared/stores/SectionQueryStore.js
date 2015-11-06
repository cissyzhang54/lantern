import alt from '../alt';
import moment from 'moment';

import SectionQueryActions from '../actions/SectionQueryActions';

class SectionQueryStore {

  constructor() {
    this.query = {
      section: null,
      dateFrom: null,
      dateTo: moment(),
      filters: {}
    }
    this.bindActions(SectionQueryActions);
  }

  selectDateRange(dates) {
    this.query.dateFrom = dates.from;
    this.query.dateTo = dates.to;
  }

  setSection(section) {
    this.query.section = section;
  }

  selectFilter(filter) {
    let key;
    switch (filter.key){
      case 'Device': key = 'device_type'; break;
      case 'Region': key = 'geo_region'; break;
      case 'UserCohort': key = 'userCohort'; break;
      case 'Referrers': key = 'referrer_type'; break;
    }
    if (!filter.value.length) {
      return delete this.query.filters[key];
    }

    this.query.filters[key] = filter.value;
  }

  destroy() {
    this.query = {
      section: null,
      dateFrom: null,
      dateTo: moment(),
      filters: {}
    }
  }

}

export default alt.createStore(SectionQueryStore, 'SectionQueryStore');
