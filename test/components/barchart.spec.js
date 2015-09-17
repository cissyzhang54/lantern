import {expect} from 'chai';
import React from 'react';
import createComponent from '../createComponent';
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
    const title = props.children.props.children[0];
    const chartContainer = props.children.props.children[1];

    expect(props.componentClass).to.equal('div');
    expect(props.children.props.componentClass).to.equal('div');

    expect(title.type).to.equal('h4');
    expect(title.props.children).to.equal('The title of the chart');

    expect(chartContainer.type).to.equal('div');
    expect(chartContainer.props.id).to.equal('chartContainer');
  });
});

