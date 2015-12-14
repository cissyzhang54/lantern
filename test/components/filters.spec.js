import {expect} from 'chai';
import TestUtils from 'react-addons-test-utils';
import sinon from 'sinon';
import {createAltWrappedComponent} from '../createComponent';
import Filters from '../../src/shared/components/Filters';
import Filter from '../../src/shared/components/Filter';
import FilterStore from '../../src/shared/stores/FilterStore';

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

    const regionFilter = filters.props.children.props.children[0].props.children;
    const deviceFilter = filters.props.children.props.children[1].props.children;

    expect(deviceFilter.props.name).to.equal('Device');
    expect(deviceFilter.props.options.length).to.equal(3);
    expect(deviceFilter.props.options[0]).to.equal('gameboy');
    expect(deviceFilter.props.options[2]).to.equal('gba');

    expect(TestUtils.isElementOfType(deviceFilter, Filter)).to.equal(true);

    expect(regionFilter.props.name).to.equal('Region');
    expect(regionFilter.props.options[0]).to.equal('uk');
    expect(TestUtils.isElementOfType(regionFilter, Filter)).to.equal(true);
  });
});
