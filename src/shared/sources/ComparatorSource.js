import DataAPI from '../utils/DataAPIUtils';
import ComparatorActions from '../actions/ComparatorActions';

let ComparatorSource = {
  loadComparatorData: {
    remote(state, query) {
      return DataAPI.getComparatorData(query);
    },
    local() {
      return null;
    },
    success: ComparatorActions.updateData,
    error: ComparatorActions.loadingFailed,
    loading: ComparatorActions.loadingData,

    shouldFetch(query) {
      return true;
    }
  }
};

export default ComparatorSource;
