import alt from '../alt';

class ComparatorQueryActions {
  constructor() {
    this.generateActions(
        'addFilter',
        'removeFilter',
        'setPublishDate',
        'setUUID',
        'selectComparator',
        'removeComparator',
        'selectFilter',
        'selectDateRange',
        'destroy'
    );
  }
}

export default alt.createActions(ComparatorQueryActions);
