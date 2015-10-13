import {expect} from 'chai';
import React from 'react';
import {createComponent} from '../createComponent';
import ColumnChart from '../../src/shared/components/ColumnChart';
import BarChart from '../../src/shared/components/BarChart'

const TestUtils = React.addons.TestUtils;

describe ('ColumnChart component', function() {
  let columnChart;

  beforeEach(function() {
    columnChart = createComponent(ColumnChart, {
      identifier : 'testIdentifierOn'
    });
  });

  it ('Should render component', function() {
    const props = columnChart.props;

    expect(columnChart.type.name).to.equal('BarChart');
    expect(props.category).to.equal('thing');
    expect(props.reverseAxis).to.equal(false);
    expect(props.xLabel).to.equal('Thing');
    expect(props.yLabel).to.equal('Value of the Thing');
  });
});

