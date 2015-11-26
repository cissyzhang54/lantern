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
        'setTopic',
        'selectComparator',
        'removeComparator',
        'selectFilter',
        'selectDateRange',
        'clickedOnArticle',
        'destroy'
    );
  }
}

export default alt.createActions(ComparatorQueryActions);
