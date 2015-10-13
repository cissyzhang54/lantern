import {expect} from 'chai';
import React from 'react';
import {createComponent} from '../createComponent';
import LogoSVG from '../../src/shared/components/LogoSVG';

describe ('Logo component', function() {
  let logo;

  beforeEach(function() {
    logo = createComponent(LogoSVG, {

    });
  });

  it ('Should render component', function() {
    const props = logo.props;

    expect(props.children.type).to.equal('svg');
  });
});
