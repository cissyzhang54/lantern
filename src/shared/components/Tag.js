import React from "react";
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import { Link } from "react-router";

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
  componentWillMount () {
   if (typeof(location) !== 'undefined') { this.props.location = location.pathname; }
  }

  render() {
    let link = ['','articles', this.props.location.split('/')[2], this.props.name.replace(' ','%20')].join('/');
    return (
      <Link style={style} to={link} onClick={this.props.onClick}>
          <Glyphicon glyph="tag" style={tagStyle} />{this.props.name}
      </Link>
    );
  }
}

Tag.propTypes = {
  name: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func
};

Tag.defaultProps = {
  name: 'Financials',
  location: "/articles/0049a468-4be5-11e5-b558-8a9722977189"
};
