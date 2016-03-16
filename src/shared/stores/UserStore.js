import alt from '../alt';
import assign from 'object-assign';
import Raven from 'raven-js';

import UserActions from '../actions/UserActions';

class UserStore {

  constructor() {
    this.user = null;
    this.bindActions(UserActions);
  }

  updateUser(user) {
    this.user = user;
    Raven.setUserContext(user);
  }

  destroy() {
    this.user = null;
  }

}

export default alt.createStore(UserStore, 'UserStore');
