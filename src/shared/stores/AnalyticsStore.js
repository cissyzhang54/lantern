import alt from '../alt';
import assign from 'object-assign';
import moment from 'moment';
import _ from 'underscore';

import AnalyticsActions from '../actions/AnalyticsActions';
import AnalyticsSource from '../sources/AnalyticsSource';

function newState() {
  return {
    data: null,
    comparatorData: null,
    loading: false,
    errorMessage: null,
    error: null,
    query: {
      type: null,
      topic: null,
      section: null,
      uuid: null,
      dateFrom: moment().subtract(30, 'days').toISOString(),
      dateTo: moment().toISOString(),
      filters: {},
      comparator: 'FT',
      comparatorType: 'global',
      publishDate: null
    }
  }
}


class AnalyticsStore {

  constructor() {
    const state = newState();
    // props for our views
    this.state = state;
    // add the actions
    this.bindActions(AnalyticsActions);
    this.exportAsync(AnalyticsSource);
  }

  /**
   * @param {newData} object - a payload with our data from the source
   * which contains two properties, `data` and `comparatorData`
   *
   * this method gets triggered by the updateData action which
   * handles a successful retrieval of data from the server
   */
  updateData(newData) {
    newData.loading = false;
    if (this.state.query.type === 'article') {
      let queryProps = assign({}, this.state.query, {dateFrom : newData.data.published})
      newData.query = queryProps;
    }
    this.setState(newData);
  }

  /**
   * @param {newQueryProps} object - an object with the new query
   * properties to update
   *
   * this method updates the query and triggers a data load
   */
  updateQuery(newQueryProps) {
    let queryProps = assign({}, this.state.query, newQueryProps);
    const isSame = _.isEqual(queryProps, this.state.query);
    const hasFilterSet = newQueryProps.hasOwnProperty('filters');
    if (!isSame || hasFilterSet) {
      this.setState({query: queryProps});
      this.getInstance().loadData();
    }
  }

  /**
   * @param {error} Error - an error that tells us when loading has failed
   */
  loadingFailed(error) {
    this.setState({
      errorMessage: error.message,
      error: error,
      loading: false
    })
  }

  /**
   * @param {?} ??? - who knows mate
   * just read the code
   */
  loadingData() {
    this.setState({loading: true})
  }

  /**
   * clears the state
   */
  destroy() {
    this.setState(newState());
  }

}

export default alt.createStore(AnalyticsStore, 'AnalyticsStore');
