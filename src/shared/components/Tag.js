import React from "react";
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import { Link } from "react-router";
import ObjectAssignDeep from '../utils/ObjectAssignDeep';

const tagStyle = {
  marginRight: "2px",
  fontSize: '10px'
};

export default class Tag extends React.Component {
  render() {
    let className = this.props.selected ? 'comparator-tag__selected' : '';
    return (
      <Link className={`${className} ${this.props.className}`}
          data-component="tag"
          onClick={this.props.onClick}
          to={this.props.url}
          >
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

Tag.defaultProps = {
  label : 'Default',
  url : '#'
}
