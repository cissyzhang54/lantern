import {expect} from 'chai';
import React from 'react';
import {createComponent} from '../createComponent';
import Filter from '../../src/shared/components/Filter';
import Select from 'react-select';

const TestUtils = React.addons.TestUtils;

describe ('Filter component', function() {
  let filter;

  let data = {
    name: 'Countries',
    options: ['UK', 'US', 'JP', 'ES', 'DE']
  };

  beforeEach(function() {
    filter = createComponent(Filter, data);
  });

  it ('Should render component', function() {
    const props = filter.props;
    expect(TestUtils.isElementOfType(filter, Select)).to.equal(true);
    expect(props.name).to.equal('Countries');

    props.options.map((o, i) => {
      expect(o.label).to.equal(data.options[i])
      expect(o.value).to.equal(data.options[i])
    })

  });
});
