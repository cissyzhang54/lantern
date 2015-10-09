import React from "react";
import DocumentTitle from 'react-document-title';
import UserStore from '../stores/UserStore'
import NavBar from '../components/NavBar';
import User from '../components/User';
import connectToStores from 'alt/utils/connectToStores';

class AppController extends React.Component {

  constructor(props) {
    super(props);
  }

  static getStores() {
    return [UserStore];
  }

  static getPropsFromStores() {
    return UserStore.getState();
  }

  render() {
    return (<DocumentTitle title='Lantern'>
      <div>
        <User {...this.props} />
        <NavBar {...this.props} />
        {this.props.children}
      </div>
    </DocumentTitle>);
  }
}

export default connectToStores(AppController);
