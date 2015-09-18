import React from "react";
import DocumentTitle from 'react-document-title';
import RouteHandler from 'react-router/lib/components/RouteHandler';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import connectToStores from 'alt/utils/connectToStores';
import NavBar from '../components/NavBar';
import Raven from 'raven-js';

const SENTRY_DSN_CLIENT = 'https://' + process.env.RAVEN_KEY + '@app.getsentry.com/' + process.env.RAVEN_APP_ID;

import UserStore from '../stores/UserStore'

class AppController extends React.Component {

  constructor(props) {
    super(props);
    Raven.config(SENTRY_DSN_CLIENT).install();
    Raven.setUserContext({
        email: props.user.email
    })
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
        <NavBar/>
        <RouteHandler/>
      </div>
    </DocumentTitle>);
  }
}

export default connectToStores(AppController);
