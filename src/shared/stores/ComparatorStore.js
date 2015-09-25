import alt from '../alt';
import assign from 'object-assign';
import Raven from 'raven-js';

import ComparatorActions from '../actions/ComparatorActions';
import ComparatorSource from '../sources/ComparatorSource';
import QueryStore from '../stores/QueryStore';

class ComparatorStore {

  constructor() {
    this.data = null;
    this.errorMessage = null;
    this.loading = false;

   // this.bindActions(ComparatorActions);

    this.bindListeners({
      handleUpdateData: ComparatorActions.UPDATE_DATA,
      handleLoadingData: ComparatorActions.LOADING_DATA,
      handleLoadingFailed: ComparatorActions.LOADING_FAILED,
      handleDestroy: ComparatorActions.DESTROY
    });

    this.exportAsync(ComparatorSource);
  }

  handleLoadingData() {
    this.loading = true;
    this.data = null;
  }

  handleUpdateData(newData) {
    this.loading = false;
    this.data = newData;
    this.errorMessage = null;
  }

  handleLoadingFailed(error) {
    this.loading = false;
    this.errorMessage = error.message;

    Raven.captureException(error, {
      extra: error
    });
  }

  handleDestroy() {
    this.loading = false;
    this.data = null;
    this.errorMessage = null;
  }

}

export default alt.createStore(ComparatorStore, 'ComparatorStore');
