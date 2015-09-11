import {expect} from 'chai';
import React from 'react';
import createComponent from '../createComponent';
import Filter from '../../src/shared/components/Filter';

describe ('Filter component', function() {
  let filter;

  beforeEach(function() {
    filter = createComponent(Filter, {
      name: 'Countries',
      options: ['UK', 'US', 'JP', 'ES', 'DE']
    });
  });

  it ('Should render component', function() {
    const props = filter.props;
    const options = props.children[2]; // options
    const componentType = props.type; // select

    expect(componentType).to.equal('select');

    expect(options.length).to.equal(5);
    expect(options[0].type).to.equal('option');
    expect(options[0].props.value).to.equal('UK');
  });
});
