import {expect} from 'chai';
import TestUtils from 'react-addons-test-utils';
import {createComponent} from '../createComponent';
import Tags from '../../src/shared/components/Tags';
import Tag from '../../src/shared/components/Tag';

describe ('Comparator component', function() {
  let comparator;

  beforeEach(function() {
    comparator = createComponent(Tags, {
      tags: [
        {label:'Private equity',url:'topic/Private equity'},
        {label:'Financial Services',url:'section/Financial Services'}
      ]
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
