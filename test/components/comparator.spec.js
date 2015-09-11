import {expect} from 'chai';
import React from 'react';
import createComponent from '../createComponent';
import Comparator from '../../src/shared/components/Comparator';
import Tag from '../../src/shared/components/Tag';

const TestUtils = React.addons.TestUtils;

describe ('Comparator component', function() {
  let comparator;

  beforeEach(function() {
    comparator = createComponent(Comparator, {
      tags: ['Private equity', 'Financial Services'],
      identifier: 'testIdentifierOn'
    });
  });

  it ('Should render component', function() {
    const props = comparator.props;
    const componentType = props.componentClass;
    const tags = props.children[1].props.children;

    expect(componentType).to.equal('div');
    expect(tags.length).to.equal(2);
    expect(tags[0].props.name).to.equal('Private equity');
    expect(tags[1].props.name).to.equal('Financial Services');

    expect(TestUtils.isElementOfType(tags[1], Tag)).to.equal(true);
  });
});
