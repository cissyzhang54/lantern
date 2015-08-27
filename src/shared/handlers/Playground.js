import React from "react";
import { RouteHandler, Link } from 'react-router';
import View from 'react-flexbox';


export default class Playground extends React.Component {
  render() {

    const sidebarStyles = {
      backgroundColor: '#ffa010'
    };

    return (
      <div>
        <h2>Playground</h2>
        <View row auto className="wrapper">
          <View column width={1} className="sidebar" style={sidebarStyles}>
            <ul>
              <li>
                <Link to="/playground/header">Header</Link>
              </li>
              <li>
                <Link to="/playground/infoLabel">Info Label</Link>
              </li>
              <li>
                <Link to="/playground/logo">Logo</Link>
              </li>
              <li>
                <Link to="/playground/search">Search</Link>
              </li>
              <li>
                <Link to="/playground/title">Title</Link>
              </li>
            </ul>
          </View>
          <View column width={4} className="stage">
            <RouteHandler/>
          </View>
        </View>
      </div>
    );
  }
}
