import alt from '../alt';

class AnalyticsActions {

  constructor() {
    this.generateActions(
      'updateData',
      'updateQuery',
      'updateUuid',
      'updateComparatorType',
      'addFilter',
      'removeFilter',
      'loadingFailed',
      'loadingData',
      'destroy'
    );
  }
}

export default alt.createActions(AnalyticsActions);
