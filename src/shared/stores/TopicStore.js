import alt from '../alt';
import assign from 'object-assign';
import Raven from 'raven-js';

import TopicActions from '../actions/TopicActions';
import TopicSource from '../sources/TopicSource';
import TopicQueryStore from '../stores/TopicQueryStore';
import TopicQueryActions from '../actions/TopicQueryActions';

class TopicStore {

  constructor() {
    this.data = null;
    this.errorMessage = null;
    this.loading = false;
    this.bindActions(TopicActions);
    this.exportAsync(TopicSource);
    this._queryHandlerRef = null;
  }

  listenToQuery() {
    if (this._queryHandlerRef) return;
    this._queryHandlerRef = this.loadData.bind(this);
    TopicQueryStore.listen(this._queryHandlerRef);
  }

  unlistenToQuery() {
    if (!this._queryHandlerRef) return;
    TopicQueryStore.unlisten(this._queryHandlerRef);
    this._queryHandlerRef = null;
  }

  loadData(store) {
    if (!store.query.topic) return;
    this.loading = true;
    this.getInstance().loadTopicData(store.query);
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

export default alt.createStore(TopicStore, 'TopicStore');
