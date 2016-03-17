import React from "react";
import Tag from './Tag';

export default class Tags extends React.Component {

  render() {
    console.log(this.props.query);
    let currentTag = (this.props.currentTag || '')
    let tags = this.props.tags.map((tag, i) => {
      let selected = currentTag === tag.label;
      let link = ['',this.props.category, this.props.uuid, this.props.query.timespan, tag.url];
      let queryString = '';

      if (!this.props.query.timespan || this.props.query.timespan === 'custom') {
        queryString = `?dateFrom=${this.props.query.dateFrom}&dateTo=${this.props.query.dateTo}`
      }

      return (
        <Tag className='comparator-tag'
          selected={selected}
          label={tag.label}
          url={link.join('/') + queryString}
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
  onChange: React.PropTypes.func
};

Tags.defaultProps = {
  category: 'articles',
  tags : [{label: 'Default 1', url : '#'}, {label: 'Default 2', url : '#'}, {label: 'Default 3', url : '#'}],
  onChange: () => {}
}
