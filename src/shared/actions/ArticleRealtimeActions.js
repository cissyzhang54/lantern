import alt from '../alt';

class ArticleRealtimeActions {
  constructor() {
    this.generateActions(
      'connect',
      'disconnect',
      'subscribeToArticle',
      'loadingData',
      'loadingFailed',
      'updateLastHour'
    );
  }
}

export default alt.createActions(ArticleRealtimeActions);
