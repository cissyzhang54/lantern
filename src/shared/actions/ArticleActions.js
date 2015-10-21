import alt from '../alt';

class ArticleActions {

  constructor() {
    this.generateActions(
      'loadData',
      'updateData',
      'loadingFailed',
      'destroy',
      'listenToQuery'
    );
  }

  loadingData() {
    setImmediate(_ => this.dispatch());
  }

}

export default alt.createActions(ArticleActions);
