import DataAPI from '../utils/DataAPIUtils';
import ComparatorActions from '../actions/ComparatorActions';

let ComparatorSource = {
  loadComparatorData: {
    remote(state, comparatorQuery) {
      return DataAPI.getComparatorData(comparatorQuery);
    },
    local() {
      return null;
    },
    success: ComparatorActions.updateData,
    error: ComparatorActions.loadingFailed,
    loading: ComparatorActions.loadingData,

    shouldFetch(comparatorQuery) {
      return true;
    }
  }
};

export default ComparatorSource;
