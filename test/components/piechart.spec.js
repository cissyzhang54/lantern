import {expect} from 'chai';
import React from 'react';
import {createComponent} from '../createComponent';
import PieChart from '../../src/shared/components/PieChart';

describe ('PieChart component', function() {
  let pieChart;

  beforeEach(function() {
    pieChart = createComponent(PieChart, {
      identifier : 'testIdentifierOn',
      title : 'My title'
    });
  });

  it ('Should render component', function() {
    const props = pieChart.props;
    const chartContainer = props.children;

    expect(chartContainer.ref).to.equal('chartContainer');
    expect(chartContainer.type).to.equal('div');
  });
});
