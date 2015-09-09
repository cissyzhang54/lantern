import DataAPI from '../utils/DataAPIUtils';
import ArticleActions from '../actions/ArticleActions';

let ArticleSource = {
  loadArticleData: {
    remote(state, query) {
      return DataAPI.getArticleData(query);
    },
    local() {
      return null;
    },
    success: ArticleActions.updateData,
    error: ArticleActions.loadingFailed,
    loading: ArticleActions.loadingData,

    shouldFetch(query) {
      return true;
    }
  }
};

export default ArticleSource;
