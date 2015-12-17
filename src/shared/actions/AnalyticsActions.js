import alt from '../alt';

class AnalyticsActions {

  constructor() {
    this.generateActions(
      'updateData',
      'updateQuery',
      'loadingFailed',
      'loadingData',
      'destroy'
    );
  }
}

export default alt.createActions(AnalyticsActions);
