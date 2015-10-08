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
        onChange={this.props.onChange}
        name={this.props.name}
        >
        <option value='' >{this.props.label}</option>
        <option value='' disabled>──────────</option>
        {options}
      </Input>);
  }
}

Filter.propTypes = {
  name: React.PropTypes.string.isRequired,
  options: React.PropTypes.array.isRequired,
  onChange: React.PropTypes.func
};
