import React from "react";
import Tag from './Tag';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';

import ComparatorQueryActions from '../actions/ComparatorQueryActions';

const tagStyle = {
  padding: "0px 15px 0 0",
};

function decode(uri){
  return uri ? decodeURI(uri) : null
}

export default class Comparator extends React.Component {

  handleChange (e) {
    let link = e.currentTarget.href.split('/')
    if(this.selected) {
      ComparatorQueryActions.removeComparator();
    } else {
      ComparatorQueryActions.selectComparator({
        comparator:decode(link.pop()),
        comparatorType:decode(link.pop())
      });
    }
  }

  render() {
    let currentComparator = (this.props.currentComparator || '')
    let tags = this.props.tags.map((tag, i) => {

      let selected = currentComparator === tag.label;
      let link = ['','articles', this.props.uuid, tag.url];
      if(selected){
        link.pop();
      }

      return (
        <Tag className='comparator-tag'
          uuid={this.props.uuid}
          selected={selected}
          label={tag.label}
          url={link.join('/')}
          key={i}
          onClick={this.handleChange}
        />);
    });

    return (
      <div className='comparator'>
        {tags}
      </div>
    );
  }
}

Comparator.propTypes = {
  tags: React.PropTypes.array.isRequired,
  onChange: React.PropTypes.func
};

Comparator.defaultProps = {
  onChange: _ => {console.log(_)}
}
