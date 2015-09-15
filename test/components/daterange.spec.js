import {expect} from 'chai';
import React from 'react';
import createComponent from '../createComponent';
import DateRange from '../../src/shared/components/DateRange';

describe ('DateRange component', function() {
  let dateRange;

  beforeEach(function() {
    dateRange = createComponent(DateRange, {
      identifier: 'testIdentifierOn'
    });
  });

  it ('Should render component', function() {
    const props = dateRange.props;
    const rangeComponent = props.children[0].props.children;

    expect(rangeComponent[0].props.children.props.children).to.equal('Date Range:');
    expect(rangeComponent[0].props.children.type).to.equal('div');

    expect(rangeComponent[1].props.componentClass).to.equal('div');
    expect(rangeComponent[1].props.children.props.placeholder).to.equal('Start date');
    expect(rangeComponent[1].props.children.props.type).to.equal('text');

    expect(rangeComponent[2].props.componentClass).to.equal('div');
    expect(rangeComponent[2].props.children.props.placeholder).to.equal('End date');
    expect(rangeComponent[2].props.children.props.type).to.equal('text');
  });
});
