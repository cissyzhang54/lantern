import DataAPI from '../utils/DataAPIUtils';
import TopicActions from '../actions/TopicActions';

let TopicSource = {
  loadTopicData: {
    remote(state, query) {
      return DataAPI.getTopicData(query)
    },
    local() {
      return null;
    },
    success: TopicActions.updateData,
    error: TopicActions.loadingFailed,
    loading: TopicActions.loadingData,

    shouldFetch(query) {
      return true;
    }
  }
};

export default TopicSource;
