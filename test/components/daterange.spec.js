import {expect} from 'chai';
import React from 'react';
import {createComponent} from '../createComponent';
import DateRange from '../../src/shared/components/DateRange';
import DateRangePicker from '../../src/shared/lib/react-daterangepicker';

const TestUtils = React.addons.TestUtils;

describe ('DateRange component', function() {
  let dateRange;

  beforeEach(function() {
    dateRange = createComponent(DateRange, {
    });
  });

  it ('Should render component', function() {
    const rangeComponent = dateRange.props.children;
    expect(TestUtils.isElementOfType(rangeComponent, DateRangePicker)).to.equal(true);
  });
});
