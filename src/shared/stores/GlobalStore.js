import alt from '../alt';
import assign from 'object-assign';
import GlobalActions from '../actions/GlobalActions';
import GlobalSource from '../sources/GlobalSource';
import Raven from 'raven-js';
const UPDATE_INTERVAL = 30000 ; // 5 minutes

class GlobalStore {

  constructor() {
    const state = {
        latestIndex: {
          data : {},
          lastUpdated : 0
        }
    }

    // props for our views
    this.state = state;

    // add the actions
    this.bindActions(GlobalActions);
    this.exportAsync(GlobalSource);

    this._boundPoller = this.startIndexStatusPoll.bind(this);
  }

  startIndexStatusPoll() {
    this.getInstance().loadIndexStatus();
    this.pollingTimer = setTimeout(this._boundPoller, UPDATE_INTERVAL);
  }

  stopIndexStatusPoll() {
    clearTimeout(this.pollingTimer);
  }

  updateLatestIndex(newData) {
    this.setState(newData);
  }

  /**
   * @param {error} Error - an error that tells us when loading has failed
   */
  loadingFailed(error) {
    this.setState({
      errorMessage: error.message,
      error: error,
      data: {}
    })
    Raven.captureException(error, this.state);
  }
}

export default alt.createStore(GlobalStore, 'GlobalStore');
