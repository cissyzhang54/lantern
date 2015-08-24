import React from "react";

export default class Article extends React.Component {
  render() {
    return (
      <div>
        <h2>Article View</h2>
        <h3>{this.props.params.id}</h3>
      </div>
    );
  }
}
