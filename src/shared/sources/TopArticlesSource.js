import DataAPI from '../utils/DataAPIUtils';
import TopArticlesActions from '../actions/TopArticlesActions';

let TopArticlesSource = {
  loadData: {

    remote(state, query) {
      return DataAPI.getTopArticlesData(query);
    },

    local(state, dates) {
      if (state.dateFrom === dates.dateFrom && state.dateTo === dates.dateTo) {
        return state;
      }

      return null; // trigger remote fetch
    },

    success: TopArticlesActions.updateData,
    error: TopArticlesActions.loadingFailed,
    loading: TopArticlesActions.loadingData
  }
}

export default TopArticlesSource;
