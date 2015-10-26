import {expect} from 'chai';
import React from 'react';
import {createComponent} from '../createComponent';
import ModifierDescription from '../../src/shared/components/ModifierDescription';

import moment from 'moment'

describe ('ModifierDescription component', function() {

  it ('Should render component', function() {
    let modifierDescription = createComponent(ModifierDescription, { });
    const props = modifierDescription.props;
    expect(props.children).to.equal('');
  });

  it ('builds a complete sentence', function() {
    let modifierDescription = createComponent(ModifierDescription, {
      comparator: 'financials',
      articleCount: 130
    });
    const props = modifierDescription.props;
    expect(props.children).to.equal(`The comparison includes 130 'financials' articles`);
  });

  it ('formats article count', function() {
    let modifierDescription = createComponent(ModifierDescription, {
      comparator: 'test',
      articleCount: 13004
    });
    const props = modifierDescription.props;
    expect(props.children).to.equal(`The comparison includes 13,004 'test' articles`);
  });
});
