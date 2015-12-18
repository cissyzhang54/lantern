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
    return function(dispatch) {
      setImmediate(()=> {
        dispatch();
      });
    };
  }

}

export default alt.createActions(SearchActions);
