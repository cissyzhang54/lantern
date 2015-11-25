import DataAPI from '../utils/DataAPIUtils';
import ArticleRealtimeActions from '../actions/ArticleRealtimeActions';

let ArticleRealtimeSource = {
  loadArticleRealtimeData: {
    remote(state, query) {
      return DataAPI.getArticleRealtimeData(query);
    },
    local() {
      return null;
    },
    success: ArticleRealtimeActions.updateLastHour,
    error: ArticleRealtimeActions.loadingFailed,
    loading: ArticleRealtimeActions.loadingData,

    shouldFetch(query) {
      return true;
    }
  }
};

export default ArticleRealtimeSource;
