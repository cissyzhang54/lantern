import DataAPI from '../utils/DataAPIUtils';
import AnalyticsActions from '../actions/AnalyticsActions';

let AnalyticsSource = {
  loadData: {

    remote(state) {
      switch (state.query.type) {
        case 'article':
          return DataAPI.getArticleData(state.query);
        case 'section':
          return DataAPI.getSectionData(state.query);
        case 'topic':
          return DataAPI.getTopicData(state.query);
        default:
      }
    },

    local() {
    },

    success: AnalyticsActions.updateData,
    error: AnalyticsActions.loadingFailed,
    loading: AnalyticsActions.loadingData,

    shouldFetch(query) {
      return true;
    }

  }

}

export default AnalyticsSource;