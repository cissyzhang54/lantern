import alt from '../alt';
import moment from 'moment';

import TopicQueryActions from '../actions/TopicQueryActions';

class TopicQueryStore {

  constructor() {
    this.query = {
      topic: null,
      dateFrom: null,
      dateTo: moment(),
      filters: {}
    }
    this.bindActions(TopicQueryActions);
  }

  selectDateRange(dates) {
    this.query.dateFrom = dates.from;
    this.query.dateTo = dates.to;
  }

  setTopic(topic) {
    this.query.topic = topic;
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
      topic: null,
      dateFrom: null,
      dateTo: moment(),
      filters: {}
    }
  }

}

export default alt.createStore(TopicQueryStore, 'TopicQueryStore');
