import React from "react";
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import { Link } from "react-router";
import ObjectAssignDeep from '../utils/ObjectAssignDeep';

const style = {
  display: "inline-block",
  cursor: "hand",
  fontSize: '14px',
  lineHeight: '2em'
};
let selected = {
  color: '#666'
};
const tagStyle = {
  marginRight: "2px",
  fontSize: '10px'
};

export default class Tag extends React.Component {
  render() {
    let className = this.props.selected ? 'selected' : '';
    return (
      <Link style={this.props.selected ? ObjectAssignDeep(selected, style) : style}
            className={`${className} ${this.props.className}`}
            to={this.props.url}
            onClick={this.props.onClick}>
          <Glyphicon glyph="tag" style={tagStyle} />{this.props.label}
      </Link>
    );
  }
}

Tag.propTypes = {
  label: React.PropTypes.string.isRequired,
  url: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func
};
