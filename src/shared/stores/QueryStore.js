import alt from '../alt';
import assign from 'object-assign';
import _ from 'underscore';

import QueryActions from '../actions/QueryActions';

const defaultQuery = {
  uuid: null,
  dateFrom: null,
  dateTo: null,
  comparator: null,
  filters: []
};

class QueryStore {

  constructor() {
    this.bindActions(QueryActions);
    this.query = defaultQuery
  }

  _update(param, updates) {
    if(this.query[param] && updates){
      this.query[param] = assign(this.query[param], updates);
    }
  }

  addFilter(filter) {
    this._update('filters', _.union(query.filters, [filter]));
  }
  removeFilter(filter) {
    this._update('filters', _.without(query.filters, [filter]));
  }

  selectDateRange(dates) {
    this.query.dateFrom = dates.from;
    this.query.dateTo = dates.to;
  }

  selectUUID(uuid) {
    this.query.uuid = uuid;
  }

  selectComparator(comparatorId) {
    this.query.comparator = comparatorId;
  }

  destroy() {
    this.query = defaultQuery;
  }

}

export default alt.createStore(QueryStore, 'QueryStore');
