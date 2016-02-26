import {expect} from 'chai';
import TestUtils from 'react-addons-test-utils';
import {createComponent} from '../createComponent';
import SectionModifier from '../../src/shared/components/SectionModifier';
import Tags from '../../src/shared/components/Tags';
import Filters from '../../src/shared/components/Filters';
import DateRange from '../../src/shared/components/DateRange';
import ModifierDescription from '../../src/shared/components/ModifierDescription';
import TimespanSelector from '../../src/shared/components/TimespanSelector';

describe ('Modifier component', function() {
  let modifier;

  beforeEach(function() {
    modifier = createComponent(SectionModifier, {
      data:{ topics: [], sections:[], genre:[], author:[] },
      comparatorData:{},
      comparator: '',
      renderDateRange: true,
      renderComparator: true,
      renderFilters: true,
      query: { comparator : 'financial' }
    });
  });

  it ('Should render the timespan buttons in the second position of the first row', function() {
    const props = modifier.props;
    const row3 = props.children[0];
    const timespan = row3.props.children[1].props.children[0];

    expect(TestUtils.isElementOfType(timespan, TimespanSelector)).to.equal(true);
  });

  it ('Should render the date range picker in the third position of the first row', function() {
    const props = modifier.props;
    const row3 = props.children[0];
    const dateRange = row3.props.children[1].props.children[1];

    expect(TestUtils.isElementOfType(dateRange, DateRange)).to.equal(true);
  });

  it ('Should render the tags in the second row', function() {
    const props = modifier.props;
    const row1 = props.children[1];
    const tags = row1.props.children[1].props.children;

    expect(TestUtils.isElementOfType(tags, Tags)).to.equal(true);
  });

  // In case the article metadata does not record the primary section as one of the sections.
  it ('Should render an article\'s primary section as one of the section tags', function() {

    let modifier = createComponent(SectionModifier, {
      data:{ topics: [], sections:[], genre:[], author:[], primarySection: 'Financials' },
      comparatorData:{},
      renderDateRange: true,
      renderComparator: true,
      renderFilters: true,
      comparator: null
    });

    const props = modifier.props;
    const row1 = props.children[1];
    const tags = row1.props.children[1].props.children;

    expect(tags.props.tags[0].label).to.equal('FT');
    expect(tags.props.tags[1].label).to.equal('Financials');
  });

  it ('Should show the global comparator where no primary section is available', function() {

    let modifier = createComponent(SectionModifier, {
      data:{ topics: [], sections:[], genre:[], author:[], primarySection: null },
      comparatorData:{},
      renderDateRange: true,
      renderComparator: true,
      renderFilters: true,
      comparator: null,
      query: { comparator : null }
    });

    const props = modifier.props;
    const row1 = props.children[1];
    const tags = row1.props.children[1].props.children;

    expect(TestUtils.isElementOfType(tags, Tags)).to.equal(true);
    expect(tags.props.tags[0].label).to.equal('FT');
  });

  it ('Should render the filters in the third row', function() {
    const props = modifier.props;
    const row2 = props.children[2];
    const filters = row2.props.children[1]

    expect(TestUtils.isElementOfType(filters, Filters)).to.equal(true);
  });

  it ('Should render the modifier description in the fourth row', function() {
    const props = modifier.props;
    const row4 = props.children[3];
    const modifierDescription = row4.props.children[1].props.children.props.children;

    expect(TestUtils.isElementOfType(modifierDescription, ModifierDescription)).to.equal(true);
  });

});
