import alt from '../alt';
import assign from 'object-assign';
import _ from 'underscore';


import QueryActions from '../actions/QueryActions';

class QueryStore {

  constructor() {
    this.bindActions(QueryActions);
    this.query = {
        uuid: null,
        datefrom: null, // XXX make this a default sensible range
        dateTo: null,
        comparator: null,
        filters: []
    };
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

}

export default alt.createStore(QueryStore, 'QueryStore');
