import DataAPI from '../utils/DataAPIUtils';
import SearchActions from '../actions/SearchActions';

let SearchSource = {
  search: {
    remote(state, query) {
      return DataAPI.search(query);
    },
    local() {
      return null;
    },
    success: SearchActions.updateResults,
    error: SearchActions.searchFailed,
    loading: SearchActions.searching,

    shouldFetch(query) {
      return true;
    }
  }
};

export default SearchSource;
