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

  loadingData() {
    //setImmediate(_ => this.dispatch());
  }

}

export default alt.createActions(SectionActions);
