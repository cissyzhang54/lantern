import {expect} from 'chai';
import React from 'react';
import {createComponent} from '../createComponent';
import BarChart from '../../src/shared/components/BarChart';

describe ('BarChart component', function() {
  let barChart;

  beforeEach(function() {
    barChart = createComponent(BarChart, {
      identifier : 'testIdentifierOn'
    });
  });

  it ('Should render component', function() {
    const props = barChart.props;
    const chartContainer = props.children;

    expect(chartContainer.ref).to.equal('chartContainer');
    expect(chartContainer.type).to.equal('div');
    expect(chartContainer.props.id).to.equal('chartContainer');
  });
});

