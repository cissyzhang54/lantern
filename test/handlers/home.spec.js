import { expect } from 'chai';
import React from 'react';
import Home from '../../src/shared/handlers/Home';
import createComponent from '../createComponent';

describe('Home component', function() {
  let home;

  beforeEach(function() {
    home = createComponent(Home, {});
  });

  it('should render the homepage', function() {
    expect(home.props.children[0].type).to.equal('h2');
    expect(home.props.children[1].type.name).to.equal('Search');
    expect(home.props.children[2].type).to.equal('ul');
  });

});
