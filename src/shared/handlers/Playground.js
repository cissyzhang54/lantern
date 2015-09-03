import React from "react";
import DocumentTitle from 'react-document-title';
import { RouteHandler, Link } from 'react-router';
import { Col, Row } from 'react-bootstrap';


export default class Playground extends React.Component {
  render() {

    const sidebarStyles = {
      backgroundColor: '#ffa010'
    };

    let title = 'Lantern -  Playground';

    return (<DocumentTitle title={title}>
      <div>
        <h2>Playground</h2>
        <Col className="sidebar" style={sidebarStyles}>
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
            <li>
              <Link to="/playground/modifier">Modifier</Link>
            </li>
            <li>
              <Link to="/playground/lineChart">Line Chart</Link>
            </li>
          </ul>
        </Col>
        <Col className="stage">
          <RouteHandler/>
        </Col>
      </div>
    </DocumentTitle>);
  }
}