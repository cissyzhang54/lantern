import {expect} from 'chai';
import React from 'react';
import createComponent from '../createComponent';
import NavBar from '../../src/shared/components/NavBar';

describe ('NavBar component', function() {
  let navBar;

  beforeEach(function() {
    navBar = createComponent(NavBar, {

    });
  });

  it ('Should render component', function() {
    const props = navBar.props;

    expect(navBar.type).to.equal('nav');
  });
});
