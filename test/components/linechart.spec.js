import {expect} from 'chai';
import React from 'react';
import createComponent from '../createComponent';
import LineChart from '../../src/shared/components/LineChart';

describe ('LineChart component', function() {
  let lineChart;

  beforeEach(function() {
    lineChart = createComponent(LineChart, {
      identifier : 'testIdentifierOn'
    });
  });

  it ('Should render component', function() {
    const props = lineChart.props;
    const title = props.children.props.children[0];
    const chartContainer = props.children.props.children[1];

    expect(props.componentClass).to.equal('div');
    expect(title.type).to.equal('h4');
    expect(title.props.children).to.equal('The title of the chart');

    expect(chartContainer.type).to.equal('div');
    expect(chartContainer.props.id).to.equal('chartContainer');
  });
});
