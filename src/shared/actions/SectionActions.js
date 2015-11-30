import alt from '../alt';

class SectionActions {

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

export default alt.createActions(SectionActions);
