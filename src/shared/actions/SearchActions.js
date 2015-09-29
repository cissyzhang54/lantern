import alt from '../alt';

class SearchActions {

  constructor() {
    this.generateActions(
      'search',
      'searchFailed',
      'updateResults',
      'getMoreResults',
      'destroy'
    );
  }

  searching() {
    setImmediate(()=> {
      this.dispatch();
    });
  }

}

export default alt.createActions(SearchActions);
