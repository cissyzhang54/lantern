import alt from '../alt';

class QueryActions {
  constructor() {
    this.generateActions(
        'addFilter',
        'removeFilter',
        'selectComparator',
        'selectDateRange',
        'selectUUID'
    );
  }
}

export default alt.createActions(QueryActions);
