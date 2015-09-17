import React from 'react';
import BarChart from './BarChart'
import FeatureFlag from '../utils/featureFlag';

export default class ColumnChart extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    let renderFeature = FeatureFlag.check(this.props.identifier);
    this.render = renderFeature ? this.render : function() { return false; };
  }

  render() {
    return (
     <BarChart identifier={this.props.identifier} reverseAxis={false} />
    );
  }
}
