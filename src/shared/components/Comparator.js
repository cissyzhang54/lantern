import React from "react";
import Tag from './Tag';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';

const tagStyle = {
  padding: "0px 15px 0 0",
};

export default class Comparator extends React.Component {
  render() {
    let currentComparator = (this.props.currentComparator || '').replace(' ','%20')
    let tags = this.props.tags.map((tag, i) => {

      let selected = currentComparator === tag.label.replace(' ','%20');
      let link = ['','articles', this.props.uuid, tag.url];
      if(selected){
        link.pop();
      }

      var styles = i === (this.props.tags.length - 1) ? 'lastComparatorTag' : 'comparatorTag';
      return (
        <Tag className={styles}
          uuid={this.props.uuid}
          selected={selected}
          label={tag.label}
          url={link.join('/')}
          key={i}
          onClick={this.props.onChange}
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
