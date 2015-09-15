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
      identifier: 'testIdentifierOn'
    });
  });

  it ('Should render component', function() {
    const props = filters.props;
    const filterObjects = props.children[1];
    const deviceFilter = filterObjects[1].props.children.props;

    expect(props.componentClass).to.equal('div');

    expect(deviceFilter.name).to.equal('Device');
    expect(deviceFilter.options.length).to.equal(3);
    expect(deviceFilter.options[0]).to.equal('mobile');
    expect(deviceFilter.options[2]).to.equal('desktop');

    expect(TestUtils.isElementOfType(filterObjects[0].props.children, Filter)).to.equal(true);
  });
});
