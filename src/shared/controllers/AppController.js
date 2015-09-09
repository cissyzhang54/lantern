import React from "react";
import DocumentTitle from 'react-document-title';
import RouteHandler from 'react-router/lib/components/RouteHandler';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import NavBar from '../components/NavBar';
import Raven from 'raven-js';

const SENTRY_DSN_CLIENT = 'https://' + process.env.RAVEN_KEY + '@app.getsentry.com/' + process.env.RAVEN_APP_ID;

export default class AppController extends React.Component {

    constructor(props) {
        super(props);

        Raven.config(SENTRY_DSN_CLIENT).install();
        //todo: pass email from server.js req.user.email
        //Raven.setUserContext({
        //    email: props.userEmail
        //})
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
