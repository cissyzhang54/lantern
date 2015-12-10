import alt from '../alt';

class FilterActions {

  constructor() {
    this.generateActions(
      'selectFilter'
    );
  }

}

export default alt.createActions(FilterActions);
