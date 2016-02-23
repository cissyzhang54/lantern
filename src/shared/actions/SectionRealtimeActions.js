import alt from '../alt';

class SectionRealtimeActions {
  constructor() {
    this.generateActions(
      'connect',
      'disconnect',
      'subscribeToSection',
      'loadingData',
      'loadingFailed',
      'handleData'
    );
  }
}

export default alt.createActions(SectionRealtimeActions);
