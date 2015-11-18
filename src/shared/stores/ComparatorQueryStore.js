import alt from '../alt';
import moment from 'moment';

import ComparatorActions from '../actions/ComparatorActions';
import ComparatorQueryActions from '../actions/ComparatorQueryActions';

class ComparatorQueryStore {

  constructor() {
    this.query = {
      category: null,
      section: null,
      topic: null,
      publishDate: null,
      uuid: null,
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

  setCategory(category) {
    this.query.category = category;
  }

  setSection(section) {
    this.query.section = section;
  }

  setTopic(topic) {
    this.query.topic = topic;
  }

  setPublishDate(publishDate) {
    this.query.publishDate = publishDate;
    if (!this.query.dateFrom) this.query.dateFrom = publishDate;
  }

  setUUID(uuid) {
    this.query.uuid = uuid;
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
      category: null,
      section: null,
      topic: null,
      publishDate: null,
      uuid: null,
      dateFrom: null,
      dateTo: moment(),
      comparator: null,
      comparatorType: null,
      filters: { }
    }
  }

}

export default alt.createStore(ComparatorQueryStore, 'ComparatorQueryStore');
