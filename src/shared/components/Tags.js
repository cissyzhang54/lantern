import React from "react";
import Tag from './Tag';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import moment from 'moment'

import AnalyticsActions from '../actions/AnalyticsActions';

function decode(uri){
  return uri ? decodeURI(uri) : null
}

export default class Tags extends React.Component {

  render() {
    let currentTag = (this.props.currentTag || '')
    let tags = this.props.tags.map((tag, i) => {
      let selected = currentTag === tag.label;
      let link = ['',this.props.category, this.props.uuid, tag.url];

      return (
        <Tag className='comparator-tag'
          selected={selected}
          label={tag.label}
          url={link.join('/')}
          key={i}
        />);
    });

    return (
      <div data-component='tags'>
        {tags}
      </div>
    );
  }
}

Tags.propTypes = {
  tags: React.PropTypes.array.isRequired,
  onChange: React.PropTypes.func
};

Tags.defaultProps = {
  category: 'articles',
  tags : [{label: 'Default 1', url : '#'}, {label: 'Default 2', url : '#'}, {label: 'Default 3', url : '#'}],
  onChange: _ => {console.log(_)}
}
