import {expect} from 'chai';
import TestUtils from 'react-addons-test-utils';
import {createComponent} from '../createComponent';
import SectionModifier from '../../src/shared/components/SectionModifier';
import Tags from '../../src/shared/components/Tags';
import Filters from '../../src/shared/components/Filters';
import DateRange from '../../src/shared/components/DateRange';
import ModifierDescription from '../../src/shared/components/ModifierDescription';

describe ('Modifier component', function() {
  let modifier;

  beforeEach(function() {
    modifier = createComponent(SectionModifier, {
      data:{ topics: [], sections:[], genre:[], author:[]},
      comparatorData:{},
      renderDateRange: true,
      renderComparator: true,
      renderFilters: true,
      query: { comparator : 'financial' },
      comparatorQuery: { comparator : 'financial' }
    });
  });

  it ('Should render component', function() {
    const props = modifier.props;

    const row1 = props.children[0];
    const row2 = props.children[1];
    const row3 = props.children[2];
    const row4 = props.children[3];

    const tags = row1.props.children[1].props.children;
    const filters = row2.props.children[1]
    const dateRange = row3.props.children[1].props.children;
    const modifierDescription = row4.props.children[1].props.children.props.children;

    expect(TestUtils.isElementOfType(tags, Tags)).to.equal(true);
    expect(TestUtils.isElementOfType(filters, Filters)).to.equal(true);
    expect(TestUtils.isElementOfType(dateRange, DateRange)).to.equal(true);
    expect(TestUtils.isElementOfType(modifierDescription, ModifierDescription)).to.equal(true);

  });

});
