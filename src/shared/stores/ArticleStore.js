import alt from '../alt';
import assign from 'object-assign';
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
  }

  listenToQuery() {
    ArticleQueryStore.listen(this.loadData.bind(this));
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
    setImmediate(_ => ComparatorQueryActions.setPublishDate(newData.article.published))
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
