import React from "react";
import {Input} from "react-bootstrap";

export default class Filter extends React.Component {
  render() {

    var options = this.props.options.map((opt, i) => {
      return (
        <option value={opt} key={i}>{opt}</option>
      );
    });

    return (<Input
        type='select'
        label={this.props.name}
        placeholder={this.props.name}>
        {options}
      </Input>);
  }
}

Filter.propTypes = {
  name: React.PropTypes.string.isRequired,
  options: React.PropTypes.array.isRequired
};
