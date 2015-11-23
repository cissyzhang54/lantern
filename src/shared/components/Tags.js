import React from "react";
import Tag from './Tag';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import moment from 'moment'

import ComparatorQueryActions from '../actions/ComparatorQueryActions';

function decode(uri){
  return uri ? decodeURI(uri) : null
}

export default class Tags extends React.Component {

  handleChange (e) {
    let link = e.currentTarget.href.split('/')

    if(typeof link[6] == 'undefined') {
      ComparatorQueryActions.removeComparator();
    } else if (link[4] == link[6]) {

        ComparatorQueryActions.selectComparator({
          comparator:decode(link.pop()),
          comparatorType:decode(link.pop())
        });

        // Update the comparator query dates
        let fromDate = moment(this.props.query.dateFrom);
        let toDate = moment(this.props.query.dateTo);
        let span = toDate - fromDate;

        fromDate.subtract(span, 'milliseconds');
        toDate.subtract(span, 'milliseconds');
        let comparatorDateRange = {
          from: fromDate.format('YYYY-MM-DD'),
          to: toDate.format('YYYY-MM-DD')
        };

        ComparatorQueryActions.selectDateRange(comparatorDateRange);

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
          onClick={this.handleChange.bind(this)}
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
