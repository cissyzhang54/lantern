import {expect} from 'chai';
import React from 'react';
import {createComponent} from '../createComponent';
import SectionModifier from '../../src/shared/components/SectionModifier';
import Comparator from '../../src/shared/components/Comparator';
import Filters from '../../src/shared/components/Filters';
import DateRange from '../../src/shared/components/DateRange';
import ModifierDescription from '../../src/shared/components/ModifierDescription';

const TestUtils = React.addons.TestUtils;

describe ('Modifier component', function() {
  let modifier;

  beforeEach(function() {
    modifier = createComponent(SectionModifier, {
      data:{ topics: [], sections:[], genre:[], author:[]},
      comparatorData:{},
      renderDateRange: true,
      renderComparator: true,
      renderFilters: true,
      query: { comparator : 'financial' }
    });
  });

  it ('Should render component', function() {
    const props = modifier.props;

    const row1 = props.children[0];
    const row2 = props.children[1];
    const row3 = props.children[2];
    const row4 = props.children[3];

    const comparator = row1.props.children[1].props.children;
    const filters = row2.props.children[1]
    const dateRange = row3.props.children[1].props.children;
    const modifierDescription = row4.props.children[1].props.children.props.children;

    expect(TestUtils.isElementOfType(comparator, Comparator)).to.equal(true);
    expect(TestUtils.isElementOfType(filters, Filters)).to.equal(true);
    expect(TestUtils.isElementOfType(dateRange, DateRange)).to.equal(true);
    expect(TestUtils.isElementOfType(modifierDescription, ModifierDescription)).to.equal(true);

  });

});
