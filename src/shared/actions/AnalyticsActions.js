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
    return function(dispatch) {
      setImmediate(() => dispatch())
    };
  }

}

export default alt.createActions(AnalyticsActions);
