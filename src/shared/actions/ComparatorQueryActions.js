import alt from '../alt';

class ComparatorQueryActions {
  constructor() {
    this.generateActions(
        'addFilter',
        'removeFilter',
        'setPublishDate',
        'selectComparator',
        'removeComparator',
        'selectFilter',
        'selectDateRange',
        'destroy'
    );
  }
}

export default alt.createActions(ComparatorQueryActions);
