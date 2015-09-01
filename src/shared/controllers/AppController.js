import React from "react";
import DocumentTitle from 'react-document-title';
import { Router, RouteHandler, Route, Link } from 'react-router';
import { Col, Row  } from 'react-bootstrap';

import NavBar from '../components/NavBar';

export default class AppController extends React.Component {
    constructor(props) {
        super(props);
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
