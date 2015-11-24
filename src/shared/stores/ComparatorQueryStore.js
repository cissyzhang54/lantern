import alt from '../alt';
import moment from 'moment';

import ComparatorActions from '../actions/ComparatorActions';
import ComparatorQueryActions from '../actions/ComparatorQueryActions';

function makeNewQuery () {
  return {
    category: null,
    section: null,
    topic: null,
    publishDate: null,
    uuid: null,
    dateFrom: moment().subtract(29,'days').toISOString(),
    dateTo: moment(),
    comparator: null,
    comparatorType: null,
    filters: { }
  }
}

class ComparatorQueryStore {

  constructor() {
    this.query = makeNewQuery();
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

  clickedOnArticle(article) {
    this.query.publishDate = article.publishDate;
    this.query.dateFrom = article.publishDate;
    this.query.uuid = article.uuid;
    this.query.category = 'articles';
    this.query.comparator = 'FT';
    this.query.comparatorType = 'global';
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
    this.query = makeNewQuery();
  }

}

export default alt.createStore(ComparatorQueryStore, 'ComparatorQueryStore');
