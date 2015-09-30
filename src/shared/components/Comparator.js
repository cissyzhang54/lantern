import React from "react";
import Tag from './Tag';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';

export default class Comparator extends React.Component {
  render() {
    let tags = this.props.tags.map((tag, i) => {
      var selected = this.props.currentComparator === tag;
      return (<Tag uuid={this.props.uuid} selected={selected} name={tag} key={i} onClick={this.props.onChange}/>);
    });

    return (
      <div>
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
