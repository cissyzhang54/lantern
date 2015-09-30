import React from 'react';
import BarChart from './BarChart'

export default class ColumnChart extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
     <BarChart identifier={this.props.identifier} reverseAxis={false} />
    );
  }
}
