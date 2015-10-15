import {expect} from 'chai';
import React from 'react';
import {createComponent} from '../createComponent';
import Comparator from '../../src/shared/components/Comparator';
import Tag from '../../src/shared/components/Tag';

const TestUtils = React.addons.TestUtils;

describe ('Comparator component', function() {
  let comparator;

  beforeEach(function() {
    comparator = createComponent(Comparator, {
      tags: [
        {label:'Private equity',url:'topic/Private equity'},
        {label:'Financial Services',url:'section/Financial Services'}
      ],
      identifier: 'testIdentifierOn'
    });
  });

  it ('Should render component', function() {
    const props = comparator.props;
    const tags = props.children;

    expect(tags.length).to.equal(2);
    expect(tags[0].props.label).to.equal('Private equity');
    expect(tags[1].props.label).to.equal('Financial Services');

    expect(TestUtils.isElementOfType(tags[1], Tag)).to.equal(true);
  });
});
