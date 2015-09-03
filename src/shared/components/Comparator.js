import React from "react";
import Tag from './Tag';
import {Row, Col} from 'react-bootstrap';

export default class Comparator extends React.Component {

  _handleTagClick(tag) {
    console.log(tag);
  }

  render() {

    let tags = this.props.tags.map((t, i) => {
      return (<Tag
        name={t}
        onClick={this._handleTagClick.bind(this, t)}
        key={i} />);
    });

    const divStyle = {
      fontWeight: "600"
    };

    const wrapperStyle = {
      marginBottom: "10px"
    };

    return (<Row style={wrapperStyle}>
      <Col xs={12} sm={2}>
        <div style={divStyle}>Comparator:</div>
      </Col>
      <Col xs={12} sm={10}>
        {tags}
      </Col>
    </Row>);
  }
}


Comparator.propTypes = {
  tags: React.PropTypes.array.isRequired
};
