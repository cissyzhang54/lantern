import {expect} from 'chai';
import React from 'react';
import createComponent from '../createComponent';
import Filters from '../../src/shared/components/Filters';
import Filter from '../../src/shared/components/Filter';

const TestUtils = React.addons.TestUtils;

describe ('Filters component', function() {
  let filters;

  // Uses the default data from the module
  beforeEach(function() {
    filters = createComponent(Filters, {
      renderDevice:true,
      renderRegion:true,
      renderReferrers:true,
      renderUserTypes:true
    });
  });

  it ('Should render component', function() {
    const props = filters.props;
    const deviceFilter = props.children[1].props.children;

    expect(props.children.length).to.equal(4);

    expect(deviceFilter.props.name).to.equal('Device');
    expect(deviceFilter.props.options.length).to.equal(9);
    expect(deviceFilter.props.options[0]).to.equal('Camera');
    expect(deviceFilter.props.options[2]).to.equal('Games Console');

    expect(TestUtils.isElementOfType(deviceFilter, Filter)).to.equal(true);
  });
});
