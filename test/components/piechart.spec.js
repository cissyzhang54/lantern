import {expect} from 'chai';
import React from 'react';
import createComponent from '../createComponent';
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
    const chartContainer = props.children[1];
    const title = props.children[0];

    expect(chartContainer.ref).to.equal('chartContainer');
    expect(chartContainer.type).to.equal('div');

    expect(title.type).to.equal('h5');
    expect(title.props.children).to.equal('My title:');
  });
});
