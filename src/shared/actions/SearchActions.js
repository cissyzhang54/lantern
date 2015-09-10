import alt from '../alt';

class SearchActions {

  constructor() {
    this.generateActions(
      'search',
      'searchFailed',
      'updateResults',
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
