import alt from '../alt';

class ArticleActions {

  constructor() {
    this.generateActions(
      'updateData',
      'loadingFailed',
      'destroy'
    );
  }

  loadingData() {
    setImmediate(_ => this.dispatch());
  }

}

export default alt.createActions(ArticleActions);
