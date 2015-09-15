import {expect} from 'chai';
import React from 'react';
import createComponent from '../createComponent';
import Logo from '../../src/shared/components/Logo';

describe ('Loading component', function() {
  let logo;

  it ('Should render', function() {
    logo = createComponent(Logo, { });
    const logoContainer = logo.props.children[0]
    const lantern = logoContainer.props.children[0]
    const glass = logoContainer.props.children[1]
    const messages = logo.props.children[1]

    expect(lantern.props.className).to.include('lantern');
    expect(lantern.props.className).to.include('logo');
    expect(messages[0].props.children).to.equal(undefined);
    expect(glass).to.equal(undefined);
  });

  it ('Should render with a message ', function() {
    logo = createComponent(Logo, { message: 'i am a test' });
    const logoContainer = logo.props.children[0]
    const lantern = logoContainer.props.children[0]
    const glass = logoContainer.props.children[1]
    const messages = logo.props.children[1]

    expect(lantern.props.className).to.include('lantern');
    expect(lantern.props.className).to.include('logo');
    expect(messages.length).to.equal(1);
    expect(messages[0].props.children).to.equal('i am a test');
    expect(glass).to.equal(undefined);
  });

  it ('Should render loading messages', function() {
    logo = createComponent(Logo, { loading: true, message: ['i am a test','and i am loading'] });
    const logoContainer = logo.props.children[0]
    const lantern = logoContainer.props.children[0]
    const glass = logoContainer.props.children[1]
    const messages = logo.props.children[1]

    expect(lantern.props.className).to.include('lantern');
    expect(lantern.props.className).to.include('logo');
    expect(lantern.props.className).to.include('loading');
    expect(messages.length).to.equal(2);
    expect(messages[0].props.children).to.equal('i am a test');
    expect(messages[1].props.children).to.equal('and i am loading');
    expect(glass).to.equal(undefined);
  });

});
