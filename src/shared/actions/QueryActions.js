import alt from '../alt';

class QueryActions {
  constructor() {
    this.generateActions(
        'addFilter',
        'removeFilter',
        'selectComparator',
        'selectFilter',
        'selectDateRange',
        'selectUUID',
        'destroy'
    );
  }
}

export default alt.createActions(QueryActions);
