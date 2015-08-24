import { expect } from 'chai';
import React from 'react';
import Home from '../../src/shared/components/Home';
import createComponent from '../createComponent';

describe('Home component', function() {
  let home;

  beforeEach(function() {
    home = createComponent(Home, {});
  });

  it('should render the homepage', function() {
    expect(home.props.children[0].type.name).to.equal('Link');
    expect(home.props.children[1].type).to.equal('h1');
    expect(home.props.children[2].type.name).to.equal('Search');
  });

});
