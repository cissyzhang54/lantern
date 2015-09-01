import React from "react";
import { RouteHandler, Link } from 'react-router';
import { Col, Row } from 'react-bootstrap';


export default class Playground extends React.Component {
  render() {

    const sidebarStyles = {
      backgroundColor: '#ffa010'
    };

    return (
      <div>
        <h2>Playground</h2>
        <Row>
          <Col width={3} className="sidebar" style={sidebarStyles}>
            <ul>
              <li>
                <Link to="/playground/header">Header</Link>
              </li>
              <li>
                <Link to="/playground/logo">Logo</Link>
              </li>
              <li>
                <Link to="/playground/search">Search</Link>
              </li>
              <li>
                <Link to="/playground/singleMetric">Single Metric</Link>
              </li>
            </ul>
          </Col>
          <Col width={9} className="stage">
            <RouteHandler/>
          </Col>
        </Row>
      </div>
    );
  }
}
