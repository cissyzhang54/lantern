import alt from '../alt';

class ComparatorActions {

  constructor() {
    this.generateActions(
      'updateData',
      'loadingFailed',
      'destroy'
    );
  }

  loadingData() {
    setImmediate(()=> {
      this.dispatch();
    });
  }

}

export default alt.createActions(ComparatorActions);
