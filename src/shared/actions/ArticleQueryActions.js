import alt from '../alt';

class ArticleQueryActions {
  constructor() {
    this.generateActions(
        'addFilter',
        'removeFilter',
        'selectFilter',
        'selectDateRange',
        'selectUUID',
        'destroy'
    );
  }
}

export default alt.createActions(ArticleQueryActions);
