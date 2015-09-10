import alt from '../alt';
import assign from 'object-assign';
import Raven from 'raven-js';

import ArticleActions from '../actions/ArticleActions';
import ArticleSource from '../sources/ArticleSource';
import QueryStore from '../stores/QueryStore';

class ArticleStore {

  constructor() {
    this.data = null;
    this.errorMessage = null;
    this.loading = false;
    this.bindListeners({
      handleUpdateData: ArticleActions.UPDATE_DATA,
      handleLoadingData: ArticleActions.LOADING_DATA,
      handleLoadingFailed: ArticleActions.LOADING_FAILED,
      handleDestroy: ArticleActions.DESTROY
    });

    this.exportAsync(ArticleSource);

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

export default alt.createStore(ArticleStore, 'ArticleStore');
