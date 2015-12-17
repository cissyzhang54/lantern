import DataAPI from '../utils/DataAPIUtils';
import AnalyticsActions from '../actions/AnalyticsActions';

let AnalyticsSource = {
  loadData: {

    remote(state, newQuery) {
      switch (newQuery.type) {
        case 'article':
          return DataAPI.getArticleData(newQuery);
        case 'section':
          return DataAPI.getSectionData(newQuery);
        case 'topic':
          return DataAPI.getTopicData(newQuery);
        default:
      }
    },

    local() {
      return null;
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
