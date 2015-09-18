import alt from '../alt';

class UserActions {

  constructor() {
    this.generateActions(
      'updateUser',
      'destroy'
    );
  }

}

export default alt.createActions(UserActions);
