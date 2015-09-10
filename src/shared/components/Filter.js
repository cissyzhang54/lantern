import React from "react";
import Input from 'react-bootstrap/lib/Input';

export default class Filter extends React.Component {
  render() {
    let options = this.props.options.map((opt, i) => {
      return (
        <option value={opt} key={i}>{opt}</option>
      );
    });

    return (<Input
        labelClassName='small'
        bsSize='small'
        type='select'
        >
        <option value='' >{this.props.name}</option>
        <option value='' disabled>──────────</option>
        {options}
      </Input>);
  }
}

Filter.propTypes = {
  name: React.PropTypes.string.isRequired,
  options: React.PropTypes.array.isRequired
};
