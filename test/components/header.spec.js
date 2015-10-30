import {expect} from 'chai';
import React from 'react';
import Header from '../../src/shared/components/Header';
import {createComponent} from '../createComponent';

const TestUtils = React.addons.TestUtils;

describe ('Header component', function() {

  it ('Should render with a link, title, author and published date', function() {
    let header = createComponent(Header, {
      title: 'My component state test title',
      linkURL: 'http://www.ft.com/',
      author: 'By: Chris Evans',
      published: 'Date: 25-Aug-2015',
      logoSrc:'http://pinsoftstudios.com/wp-content/uploads/2012/10/pie-chart-fi.jpg'
    });
    const props = header.props;
    const text = props.children.props.children;

    expect(text[0].type).to.equal('h1');
    expect(text[0].props.children.type).to.equal('a');
    expect(text[0].props.children.props.children[0]).to.equal('My component state test title');

    expect(text[1].type).to.equal('p');
    expect(text[1].props.children).to.equal('By: Chris Evans');

    expect(text[2].type).to.equal('p');
    expect(text[2].props.children).to.equal('Date: 25-Aug-2015');
  });

  it ('Should render with only a title (without a link)', function() {
    let header = createComponent(Header, {
      title: 'My component state test title'
    });
    const props = header.props;
    const text = props.children.props.children;

    expect(text[0].type).to.equal('h1');
    expect(text[0].props.children.type).to.equal(undefined);
    expect(text[0].props.children).to.equal('My component state test title');

    expect(text[1].type).to.equal('p');
    expect(text[1].props.children).to.equal('');

    expect(text[2].type).to.equal('p');
    expect(text[2].props.children).to.equal('');
  });
});
