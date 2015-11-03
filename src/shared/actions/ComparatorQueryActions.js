import alt from '../alt';

class ComparatorQueryActions {
  constructor() {
    this.generateActions(
        'addFilter',
        'removeFilter',
        'setCategory',
        'setPublishDate',
        'setUUID',
        'setSection',
        'selectComparator',
        'removeComparator',
        'selectFilter',
        'selectDateRange',
        'destroy'
    );
  }
}

export default alt.createActions(ComparatorQueryActions);
