import React from "react";
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import { Link } from "react-router";
import ObjectAssignDeep from '../utils/ObjectAssignDeep';

const style = {
  padding: "5px 10px",
  display: "inline-block",
  cursor: "hand",
  fontSize: '14px'
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
    let link = ['','articles', this.props.uuid, this.props.name.replace(' ','%20')].join('/');
    let className = this.props.selected ? 'selected' : '';
    return (
      <Link style={this.props.selected ? ObjectAssignDeep(selected, style) : style} className={className} to={link} onClick={this.props.onClick}>
          <Glyphicon glyph="tag" style={tagStyle} />{this.props.name}
      </Link>
    );
  }
}

Tag.propTypes = {
  name: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func
};
