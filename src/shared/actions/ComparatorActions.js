import alt from '../alt';

class ComparatorActions {

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

export default alt.createActions(ComparatorActions);
