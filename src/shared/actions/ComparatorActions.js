import alt from '../alt';

class ComparatorActions {

  constructor() {
    this.generateActions(
      'loadData',
      'loadingData',
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

export default alt.createActions(ComparatorActions);
