import alt from '../alt';

class TopicQueryActions {
  constructor() {
    this.generateActions(
      'addFilter',
      'removeFilter',
      'selectFilter',
      'selectDateRange',
      'setTopic',
      'destroy'
    );
  }
}

export default alt.createActions(TopicQueryActions);
