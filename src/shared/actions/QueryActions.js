import alt from '../alt';

class QueryActions {
  constructor() {
    this.generateActions(
        'addFilter',
        'removeFilter',
        'selectComparator',
        'selectDateRange',
        'selectUUID',
        'destroy'
    );
  }
}

export default alt.createActions(QueryActions);
