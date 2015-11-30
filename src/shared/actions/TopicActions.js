import alt from '../alt';

class TopicActions {

  constructor() {
    this.generateActions(
      'loadData',
      'updateData',
      'loadingFailed',
      'destroy',
      'listenToQuery',
      'unlistenToQuery'
    );
  }

}

export default alt.createActions(TopicActions);
