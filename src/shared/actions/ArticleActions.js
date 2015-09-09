import alt from '../alt';



class ArticleActions {
  constructor() {

  }

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

}

export default alt.createActions(ArticleActions);
