import alt from '../alt';

class SectionQueryActions {
  constructor() {
    this.generateActions(
      'addFilter',
      'removeFilter',
      'selectFilter',
      'selectDateRange',
      'setSection',
      'destroy'
    );
  }
}

export default alt.createActions(SectionQueryActions);
