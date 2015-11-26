import alt from '../alt';

class ArticleQueryActions {
  constructor() {
    this.generateActions(
        'addFilter',
        'removeFilter',
        'selectFilter',
        'selectDateRange',
        'setUUID',
        'clickedOnArticle',
        'destroy'
    );
  }
}

export default alt.createActions(ArticleQueryActions);
