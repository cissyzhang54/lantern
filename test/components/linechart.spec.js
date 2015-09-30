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
    const chartContainer = props.children;

    expect(chartContainer.type).to.equal('div');
    expect(chartContainer.props.id).to.equal('chartContainer');
  });
});
