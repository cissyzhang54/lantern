import {expect} from 'chai';
import React from 'react';
import Header from '../../src/shared/components/Header';
import createComponent from '../createComponent';

const TestUtils = React.addons.TestUtils;

describe ('Header component', function() {
  let header;

  beforeEach(function() {
    header = createComponent(Header, {
      identifier: 'testIdentifierOn',
      title: 'My component state test title',
      author: 'By: Chris Evans',
      published: 'Date: 25-Aug-2015',
      logoSrc:'http://pinsoftstudios.com/wp-content/uploads/2012/10/pie-chart-fi.jpg'
    });
  });

  it ('Should render component', function() {
    const props = header.props;
    const text = props.children.props.children.props.children.props.children;

    expect(props.children.type).to.equal('header');

    expect(text[0].type).to.equal('h1');
    expect(text[0].props.children).to.equal('My component state test title');

    expect(text[1].type).to.equal('p');
    expect(text[1].props.children).to.equal('By: Chris Evans');

    expect(text[2].type).to.equal('p');
    expect(text[2].props.children).to.equal('Date: 25-Aug-2015');
  });
});
