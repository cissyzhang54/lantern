import alt from '../alt';
import moment from 'moment';

import ComparatorActions from '../actions/ComparatorActions';
import ComparatorQueryActions from '../actions/ComparatorQueryActions';

class ComparatorQueryStore {

  constructor() {
    this.query = {
      publishDate: null,
      dateFrom: null,
      dateTo: moment(),
      comparator: null,
      comparatorType: null,
      filters: { }
    }
    this.bindActions(ComparatorQueryActions);
  }

  selectDateRange(dates) {
    this.query.dateFrom = dates.from;
    this.query.dateTo = dates.to;
  }

  setPublishDate(publishDate) {
    this.query.publishDate = publishDate;
    if (!this.query.dateFrom) this.query.dateFrom = publishDate;
  }

  selectComparator(comparator) {
    this.query.comparatorType = comparator.comparatorType;
    this.query.comparator = comparator.comparator;
  }

  removeComparator() {
    this.query.comparator = null;
    this.query.comparatorType = null;
    setImmediate(_ => ComparatorActions.destroy())
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
    this.query = {
      publishDate: null,
      dateFrom: null,
      dateTo: moment(),
      comparator: null,
      comparatorType: null,
      filters: { }
    }
  }

}

export default alt.createStore(ComparatorQueryStore, 'ComparatorQueryStore');
