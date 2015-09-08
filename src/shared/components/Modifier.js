import React from "react";
import {Glyphicon, Row, Col} from "react-bootstrap";

import Comparator from "./Comparator";
import Filters from "./Filters";
import DateRange from "./DateRange";

export default class Modifier extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Comparator tags={this.props.tags} />
        <Filters />
        <DateRange />
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
