import DataAPI from '../utils/DataAPIUtils';
import ArticleRealtimeActions from '../actions/ArticleRealtimeActions';
import moment from 'moment';

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

    shouldFetch(state, query) {
      return this.isStateStale(state, query.uuid);
    },

    isStateStale(state, uuid) {
      const timeDiffSinceLastUpdate = moment.utc().diff(moment(state.lastUpdated));
      const isFresh = timeDiffSinceLastUpdate < 60000;
      return (state.uuid !== uuid || isFresh === false);
    }
  }
};

export default ArticleRealtimeSource;
