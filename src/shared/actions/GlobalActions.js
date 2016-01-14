import alt from '../alt';

class GlobalActions {

  constructor() {
    this.generateActions(
      'fetch',
      'updateLatestIndex',
      'loadingFailed',
      'startIndexStatusPoll',
      'stopIndexStatusPoll'
    );
  }
}

export default alt.createActions(GlobalActions);
