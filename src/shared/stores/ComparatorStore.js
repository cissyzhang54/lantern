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
    this._queryHandlerRef = null;
  }

  listenToQuery() {
    if (this._queryHandlerRef) return;
    this._queryHandlerRef = this.loadData.bind(this)
    ComparatorQueryStore.listen(this._queryHandlerRef);
  }

  unlistenToQuery() {
    if (!this._queryHandlerRef) return;
    ComparatorQueryStore.unlisten(this._queryHandlerRef);
    this._queryHandlerRef = null;
  }

  loadData(store) {
    if (!store.query.comparator) return
    this.loading = true;
    this.getInstance().loadComparatorData(store.query);
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
