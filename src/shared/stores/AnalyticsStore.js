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
    },
    availableFilters: {
      devices: [],
      regions: [],
      cohort: [],
      referrers: []
    },
    activeQuery: null
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
    newData.activeQuery = newData.query;

    if (this.state.query.type === 'article') {
      let queryProps = assign({}, this.state.query, {dateFrom : newData.data.published})
      newData.query = queryProps;
    }

    if (Object.keys(this.state.query.filters).length === 0) {
      let getKeys = (item) => item[0];

      assign(newData, { availableFilters: {
        devices: newData.data.devices.map(getKeys),
        regions: newData.data.regions.map(getKeys),
        cohort: newData.data.userCohort.map(getKeys),
        referrers: newData.data.referrerTypes.map(getKeys)
      }})
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
      setTimeout(() => {
        this.getInstance().loadData(queryProps);
      }, 0);
    }
  }

  removeFilter(filterProps) {
    var newState = this.state;
    delete newState.query.filters[filterProps];
    this.updateQuery(newState.query);
  }

  addFilter(filterProps) {
    var newState = this.state;
    newState.query.filters[filterProps[0]] = filterProps[1];
    this.updateQuery(newState.query);
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
    if (this.getInstance().isLoading()) this.setState({loading: true});
  }

  /**
   * clears the state
   */
  destroy() {
    this.setState(newState());
  }

}

export default alt.createStore(AnalyticsStore, 'AnalyticsStore');
