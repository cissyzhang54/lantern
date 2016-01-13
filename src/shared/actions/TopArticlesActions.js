import alt from '../alt';

class TopArticlesActions {

  constructor() {
    this.generateActions(
      'fetch',
      'updateData',
      'loadingFailed',
      'loadingData'
    );
  }
}

export default alt.createActions(TopArticlesActions);
