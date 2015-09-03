import React from "react";
import {Glyphicon, Col} from "react-bootstrap";

const style = {
  padding: "5px 10px",
  display: "inline-block",
  cursor: "hand",
  fontSize: '14px'
};
const tagStyle = {
  marginRight: "2px",
  fontSize: '10px'
};

export default class Tag extends React.Component {

  render() {

    return (
      <a style={style} onClick={this.props.onClick}>
          <Glyphicon glyph="tag" style={tagStyle} />{this.props.name}
      </a>
    );
  }

}

Tag.propTypes = {
  name: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func
};
