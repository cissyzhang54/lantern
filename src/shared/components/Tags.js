import React from "react";
import Tag from './Tag';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';

import ComparatorQueryActions from '../actions/ComparatorQueryActions';

function decode(uri){
  return uri ? decodeURI(uri) : null
}

export default class Tags extends React.Component {

  handleChange (e) {
    let link = e.currentTarget.href.split('/')

    if(this.className.indexOf('comparator-tag__selected') >= 0) {
      ComparatorQueryActions.removeComparator();
    } else {
      ComparatorQueryActions.selectComparator({
        comparator:decode(link.pop()),
        comparatorType:decode(link.pop())
      });
    }
  }

  render() {
    let currentTag = (this.props.currentTag || '')
    let tags = this.props.tags.map((tag, i) => {
      let selected = currentTag === tag.label;
      let link = ['',this.props.category, this.props.uuid, tag.url];

      if(selected){
        link.pop();
      }

      return (
        <Tag className='comparator-tag'
          selected={selected}
          label={tag.label}
          url={link.join('/')}
          key={i}
          onClick={this.handleChange}
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
  onChange: _ => {console.log(_)}
}
