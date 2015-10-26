import alt from '../alt';
import assign from 'object-assign';
import Raven from 'raven-js';

import ComparatorActions from '../actions/ComparatorActions';
import ComparatorSource from '../sources/ComparatorSource';
import ComparatorQueryStore from '../stores/ComparatorQueryStore';

class ComparatorStore {

  constructor() {
    this.data = null;
    this.errorMessage = null;
    this.loading = false;
    this.bindActions(ComparatorActions);
    this.exportAsync(ComparatorSource);
  }

  listenToQuery() {
    ComparatorQueryStore.listen(this.loadData.bind(this));
  }

  loadingData() {
    this.loading = true;
  }

  loadData(store) {
    if (!store.query.comparator) return //comparatorWasRemoved
    setImmediate(_ => this.getInstance().loadComparatorData(store.query));
  }

  updateData(newData) {
    this.loading = false;
    this.data = newData;
    this.errorMessage = null;
  }

  loadingFailed(error) {
    this.loading = false;
    this.errorMessage = error.message;

    Raven.captureException(error, {
      extra: error
    });
  }

  destroy() {
    this.loading = false;
    this.data = null;
    this.errorMessage = null;
  }

}

export default alt.createStore(ComparatorStore, 'ComparatorStore');
