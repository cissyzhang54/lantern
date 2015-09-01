import React from "react";
import { Router, RouteHandler, Route, Link } from 'react-router';
import { Col, Row  } from 'react-bootstrap';

import NavBar from '../components/NavBar';

export default class AppController extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <NavBar/>
                <RouteHandler/>
            </div>
        );
    }
}
