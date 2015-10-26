import {expect} from 'chai';
import React from 'react';
import {createComponent} from '../createComponent';
import Filter from '../../src/shared/components/Filter';

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
    const componentType = filter.type; // select

    expect(props.type).to.be.a.function;

    expect(props.name).to.equal('Countries');

    props.options.map((o, i) => {
      expect(o.label).to.equal(data.options[i])
      expect(o.value).to.equal(data.options[i])
    })

  });
});
