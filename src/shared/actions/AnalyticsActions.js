import alt from '../alt';

class AnalyticsActions {

  constructor() {
    this.generateActions(
      'updateData',
      'updateQuery',
      'loadingFailed',
      'destroy'
    );
  }

  loadingData() {
    setImmediate(() => this.dispatch())
  }

}

export default alt.createActions(AnalyticsActions);
