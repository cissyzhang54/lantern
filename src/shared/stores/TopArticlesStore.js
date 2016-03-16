import alt from '../alt';
import assign from 'object-assign';
import moment from 'moment';
import _ from 'underscore';
import Raven from 'raven-js';

import TopArticlesActions from '../actions/TopArticlesActions';
import TopArticlesSource from '../sources/TopArticlesSource';

class TopArticlesStore {

  constructor() {
    const state = {
      data: {},
      loading: false,
      dateFrom: null,
      dateTo: null
    }

    // props for our views
    this.state = state;

    // add the actions
    this.bindActions(TopArticlesActions);
    this.exportAsync(TopArticlesSource);
  }

  fetch() {
    setTimeout(() => {
      var dates = {
        dateFrom: moment().subtract(1, 'days').startOf('day').toISOString(),
        dateTo: moment().subtract(1, 'days').endOf('day').toISOString()
      }

      this.getInstance().loadData(dates);
      this.setState(dates);
    }, 0);
  }

  updateData(newData) {
    this.setState(assign({}, { loading: false }, newData));
  }

  /**
   * @param {error} Error - an error that tells us when loading has failed
   */
  loadingFailed(error) {
    this.setState({
      errorMessage: error.message,
      error: error,
      loading: false,
      dateTo: null,
      dateFrom: null,
      data: {}
    })
    Raven.captureException(error, this.state);
  }

  /**
   * @param {?} ??? - who knows mate
   * just read the code
   */
  loadingData() {
    if (this.getInstance().isLoading()) this.setState({loading: true});
  }

}

export default alt.createStore(TopArticlesStore, 'TopArticlesStore');
