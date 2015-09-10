import alt from '../alt';

class ArticleActions {

  updateData(data) {
    this.dispatch(data);
  }

  loadingData() {
    setImmediate(()=> {
      this.dispatch();
    });
  }

  loadingFailed(error) {
    this.dispatch(error);
  }

  destroy() {
    this.dispatch();
  }

}

export default alt.createActions(ArticleActions);
