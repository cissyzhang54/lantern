import {expect} from 'chai';
import React from 'react';
import sinon from 'sinon';
import {createAltWrappedComponent} from '../createComponent';
import Filters from '../../src/shared/components/Filters';
import Filter from '../../src/shared/components/Filter';
import FilterStore from '../../src/shared/stores/FilterStore';

let TestUtils = React.addons.TestUtils;

describe ('Filters component', function() {
  let stub;
  // Uses the default data from the module
  beforeEach(function() {
    stub = sinon.stub(FilterStore, 'getState');
  });

  it ('Should render component', function() {
    stub.returns({
      devices: ['gameboy', 'psp', 'gba'],
      regions: ['uk', 'us'],
      cohort: ['putins', 'obamas', 'millenials', 'snake people'],
      referrers: ['social', 'antisocial', 'supersocial']
    });

    let filters = createAltWrappedComponent(Filters, {
      renderDevice:true,
      renderRegion:true,
      renderReferrers:true,
      renderUserTypes:true
    });

    const props = filters.props;
    const deviceFilter = props.children[1].props.children;

    expect(props.children.length).to.equal(4);

    expect(deviceFilter.props.name).to.equal('Device');
    expect(deviceFilter.props.options.length).to.equal(3);
    expect(deviceFilter.props.options[0]).to.equal('gameboy');
    expect(deviceFilter.props.options[2]).to.equal('gba');

    expect(TestUtils.isElementOfType(deviceFilter, Filter)).to.equal(true);

    const regionFilter = props.children[0].props.children;
    expect(regionFilter.props.name).to.equal('Region');
    expect(regionFilter.props.options[0]).to.equal('uk');
    expect(TestUtils.isElementOfType(regionFilter, Filter)).to.equal(true);
  });
});
