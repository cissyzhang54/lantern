import {expect} from 'chai';
import React from 'react';
import {createComponent} from '../createComponent';
import DualScaleLineChart from '../../src/shared/components/DualScaleLineChart';

describe ('DualScaleLineChart component', function() {
  let dualScaleLineChart;

  beforeEach(function() {
    dualScaleLineChart = createComponent(DualScaleLineChart, {
    });
  });

  it ('Should render component', function() {
    const props = dualScaleLineChart.props;
    const chartContainer = props.children[0];

    expect(chartContainer.type).to.equal('div');
    expect(chartContainer.props.id).to.equal('chartContainer');
  });
});
