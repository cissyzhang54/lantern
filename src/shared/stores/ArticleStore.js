import alt from '../alt';
import Raven from 'raven-js';

import ArticleActions from '../actions/ArticleActions';
import ArticleSource from '../sources/ArticleSource';
import ArticleQueryStore from '../stores/ArticleQueryStore';
import ComparatorQueryActions from '../actions/ComparatorQueryActions';

class ArticleStore {

  constructor() {
    this.data = null;
    this.errorMessage = null;
    this.loading = false;
    this.bindActions(ArticleActions);
    this.exportAsync(ArticleSource);
    this._queryHandlerRef = null;
  }

  listenToQuery() {
    if (this._queryHandlerRef) return;
    this._queryHandlerRef = this.loadData.bind(this);
    ArticleQueryStore.listen(this._queryHandlerRef);
  }

  unlistenToQuery() {
    if (!this._queryHandlerRef) return;
    ArticleQueryStore.unlisten(this._queryHandlerRef);
    this._queryHandlerRef = null;
  }

  loadData(store) {
    if (!store.query.uuid) return
    this.getInstance().loadArticleData(store.query);
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

export default alt.createStore(ArticleStore, 'ArticleStore');
