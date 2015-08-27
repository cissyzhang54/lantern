import React from "react";
import Header from "./Header";

export default class Article extends React.Component {
  render() {
    return (
      <div>
        <Header
            title='My component state test title'
            author='By: Chris Evans'
            published='Date: 25-Aug-2015'
            logoSrc='http://pinsoftstudios.com/wp-content/uploads/2012/10/pie-chart-fi.jpg'
        />
        <h2>Article View</h2>
        <h3>{this.props.params.id}</h3>
      </div>
    );
  }
}
