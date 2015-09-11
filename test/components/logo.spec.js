import {expect} from 'chai';
import React from 'react';
import createComponent from '../createComponent';
import Logo from '../../src/shared/components/Logo';

describe ('Logo component', function() {
  let logo;

  beforeEach(function() {
    logo = createComponent(Logo, {

    });
  });

  it ('Should render component', function() {
    const props = logo.props;

    expect(props.children.type).to.equal('svg');
  });
});
