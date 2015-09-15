import {expect} from 'chai';
import React from 'react';
import createComponent from '../createComponent';
import Tag from '../../src/shared/components/Tag';

describe ('Tag component', function() {
  let tag;

  beforeEach(function() {
    tag = createComponent(Tag, {

    });
  });

  it ('Should render component', function() {
    const props = tag.props;

    expect(tag.type).to.equal('a');
    expect(props.children[0].props.glyph).to.equal('tag');
    expect(props.children[1]).to.equal('Financials');
  });
});
