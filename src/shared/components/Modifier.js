import React from "react";
import {Glyphicon, Row, Col} from "react-bootstrap";

import Comparator from "./Comparator";
import Filters from "./Filters";
import DateRange from "./DateRange";

const tags = [
  "FT.com",
  "UK",
  "Business & Economy",
  "Transport for London",
  "Tanys Powley"
];

export default class Modifier extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div>
        <Comparator tags={tags} />
        <Filters />
        <DateRange />
      </div>
    );
  }

}
