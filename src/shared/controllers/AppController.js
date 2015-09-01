import React from "react";
import { Router, RouteHandler, Route, Link } from 'react-router';
import { Col, Row } from 'react-bootstrap';

import Logo from '../components/Logo';


export default class AppController extends React.Component {
  render() {
    return (
        <div>
            <Row>
                <header>
                    <Col xs={3} >
                        <Logo  />
                    </Col>
                    <nav xs={9}>
                        I am Nav!
                    </nav>
                </header>
            </Row>
            <RouteHandler/>
        </div>
    );
  }
}
