import React from "react";
import QueryLink from './QueryLink';

export default class TimespanSelector extends React.Component {

  render() {
    let links = this.props.options.map((option) => {
      return (<li key={option.value}><QueryLink
        {...this.props.query}
        timespan={option.value}
        >
        {option.label}
      </QueryLink></li>)
    });

    return (
      <ol className='timespanSelector' data-component='timespanSelector'>{ links }</ol>
    )
  }
}

TimespanSelector.propTypes = {

};
