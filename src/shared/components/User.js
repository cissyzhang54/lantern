import React from "react";
import Raven from 'raven-js';

const SENTRY_DSN_CLIENT = 'https://' + process.env.RAVEN_KEY + '@app.getsentry.com/' + process.env.RAVEN_APP_ID;

export default class UserController extends React.Component {

  constructor(props) {
    super(props);
    Raven.config(SENTRY_DSN_CLIENT).install();
    Raven.setUserContext({
      email: props.user.email
    })
  }

  render() { return <span />;  }
}
