import React from "react";
import Input from 'react-bootstrap/lib/Input';
import Select from 'react-select';

export default class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: []
    }

  }
  _handleChange(val, values) {
    this.setState({value: val});
    const label = this.props.name;
    const filters = {
      key: label,
      value: values.map((v) => v.value)
    };
    this.props.onChange(filters);
  }

  render() {
    let options = this.props.options.map((opt, i) => {
      return {
        value: opt,
        label: (opt) ? opt : 'Unknown'
      };
    });

    return (
        <Select
          name={this.props.name}
          data-component='filter'
          placeholder={this.props.label}
          options={options}
          value={this.state.value}
          multi={true}
          onChange={this._handleChange.bind(this)}
        />
    );
  }
}

Filter.propTypes = {
  name: React.PropTypes.string.isRequired,
  options: React.PropTypes.array.isRequired,
  onChange: React.PropTypes.func
};

Filter.defaultProps = {
  options : ['Hello?', 'Its Me'],
  name : 'Place Holder'
}
