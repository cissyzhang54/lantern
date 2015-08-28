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

    var tags = [
      "FT.com",
      "UK",
      "Business & Economy",
      "Transport for London",
      "Tanys Powley"
    ];

    var style = {
      'margin': '10px 0',
      'paddingTop': '10px',
      'borderTop': '1px solid #ccc',
      'borderBottom': '1px solid #ccc'
    };

    return (
      <div style={style}>
        <Comparator tags={tags} />
        <Filters />
        <DateRange />
      </div>
    );
  }

}
