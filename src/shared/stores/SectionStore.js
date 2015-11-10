import alt from '../alt';
import assign from 'object-assign';
import Raven from 'raven-js';

import SectionActions from '../actions/SectionActions';
import SectionSource from '../sources/SectionSource';
import SectionQueryStore from '../stores/SectionQueryStore';
import SectionQueryActions from '../actions/SectionQueryActions';

class SectionStore {

  constructor() {
    this.data = null;
    this.errorMessage = null;
    this.loading = false;
    this.bindActions(SectionActions);
    this.exportAsync(SectionSource);
    this._queryHandlerRef = null;
  }

  listenToQuery() {
    if (this._queryHandlerRef) return;
    this._queryHandlerRef = this.loadData.bind(this);
    SectionQueryStore.listen(this._queryHandlerRef);
  }

  unlistenToQuery() {
    if (!this._queryHandlerRef) return;
    SectionQueryStore.unlisten(this._queryHandlerRef);
    this._queryHandlerRef = null;
  }

  loadData(store) {
    if (!store.query.section) return
    this.getInstance().loadSectionData(store.query);
  }

  loadingData() {
    this.loading = true;
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

export default alt.createStore(SectionStore, 'SectionStore');
