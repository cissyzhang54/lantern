import alt from '../alt';
import assign from 'object-assign';
import _ from 'underscore';
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
      handleLoadingFailed: ArticleActions.LOADING_FAILED
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

  handleLoadingFailed(errorMessage) {
    this.loading = false;
    this.errorMessage = errorMessage;

    //Raven.captureMessage(`Article not found: ${query.uuid}`, e)
    Raven.captureMessage(`Error loading article`)
  }


}

export default alt.createStore(ArticleStore, 'ArticleStore');
