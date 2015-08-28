import React from "react";
import {Glyphicon, Col} from "react-bootstrap";

export default class Tag extends React.Component {

  render() {

    const style = {
      padding: "5px 10px",
      display: "inline-block",
      borderRadius: "5px",
      margin: "0 5px",
      cursor: "hand",
      border: "1px solid #ccc"
    };

    return (
      <a style={style} onClick={this.props.onClick}>
          <Glyphicon glyph="tag"/>{this.props.name}
      </a>
    );
  }

}

Tag.propTypes = {
  name: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func
};
