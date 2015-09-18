import alt from '../alt';
import assign from 'object-assign';
import Raven from 'raven-js';

import UserActions from '../actions/UserActions';

class UserStore {

  constructor() {
    this.user = null;
    this.bindActions(UserActions);
  }

  handleUpdateUser(user) {
    this.user = user;
  }

  handleDestroy() {
    this.user = null;
  }

}

export default alt.createStore(UserStore, 'UserStore');
