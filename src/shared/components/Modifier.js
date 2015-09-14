import React from "react";
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';

import Comparator from "./Comparator";
import Filters from "./Filters";
import DateRange from "./DateRange";

import FeatureFlag from '../utils/featureFlag';

export default class Modifier extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount () {
    let renderFeature = FeatureFlag.check(this.props.identifier);
    this.render = renderFeature ? this.render : function () { return false };
  }

  render() {
    return (
      <div>
        <Comparator identifier={this.props.identifier + ':comparator'} tags={this.props.tags} />
        <Filters identifier={this.props.identifier + ':filters'} />
        <DateRange identifier={this.props.identifier + ':DateRange'} />
      </div>
    );
  }

}

Modifier.propTypes = {
  tags: React.PropTypes.array.isRequired
};

Modifier.defaultProps = {
  tags: ['one', 'two', 'three']
};
