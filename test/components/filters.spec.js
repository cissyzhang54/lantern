import {expect} from 'chai';
import TestUtils from 'react-addons-test-utils';
import {createAltWrappedComponent} from '../createComponent';
import Filters from '../../src/shared/components/Filters';
import Filter from '../../src/shared/components/Filter';

describe ('Filters component', function() {

  it ('Should render component', function() {
    let filters = createAltWrappedComponent(Filters, {
      renderDevice:true,
      renderRegion:true,
      renderReferrers:true,
      renderUserTypes:true,
      availableFilters:   {
        devices: ['gameboy', 'psp', 'gba'],
        regions: ['uk', 'us'],
        cohort: ['putins', 'obamas', 'millenials', 'snake people'],
        referrers: ['social', 'antisocial', 'supersocial']
      }
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
