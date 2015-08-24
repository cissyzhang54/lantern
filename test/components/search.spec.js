import { expect } from 'chai';
import React from 'react';
import Search from '../../src/shared/components/Search';
import createComponent from '../createComponent';

describe('Home component', function() {
  let search;

  beforeEach(function() {
    search = createComponent(Search, {});
  });

  it('should render the search field', function() {
    expect(search.props.children.type).to.equal('input');
  });

});
