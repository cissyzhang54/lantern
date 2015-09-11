import { expect } from 'chai';
import React from 'react';
import Search from '../../src/shared/components/Search';
import createComponent from '../createComponent';

describe('Search component', function() {
  let search;

  beforeEach(function() {
    search = createComponent(Search, {

    });
  });

  it('Should render the search field', function() {
    const props = search.props;

    //expect(search.props.children[0].type).to.equal('label');
    //expect(search.props.children[1].type).to.equal('br');
    //expect(search.props.children[2].type).to.equal('input');
  });

});
