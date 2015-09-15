import React from "react";
import Tag from './Tag';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import FeatureFlag from '../utils/featureFlag';

const divStyle = {
  fontWeight: "600"
};

const wrapperStyle = {
  marginBottom: "10px"
};

export default class Comparator extends React.Component {

  _handleTagClick(tag) {
    console.log(tag);
  }

  componentWillMount () {
    let renderFeature = FeatureFlag.check(this.props.identifier);
    this.render = renderFeature ? this.render : function () { return false };
  }

  render() {

    let tags = this.props.tags.map((t, i) => {
      return (<Tag
        name={t}
        onClick={this._handleTagClick.bind(this, t)}
        key={i} />);
    });

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
