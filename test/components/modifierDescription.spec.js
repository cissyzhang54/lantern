import {expect} from 'chai';
import TestUtils from 'react-addons-test-utils';
import {createComponent} from '../createComponent';
import ModifierDescription from '../../src/shared/components/ModifierDescription';
import Text from '../../src/shared/components/Text';

import moment from 'moment'

describe ('ModifierDescription component', function() {

  it ('Should render component', function() {
    let modifierDescription = createComponent(ModifierDescription, { });
    const props = modifierDescription.props;
    expect(props.children).to.equal('');
  });

  xit ('builds a complete sentence', function() {
    let modifierDescription = createComponent(ModifierDescription, {
      comparator: 'financials',
      articleCount: 130
    });
    const props = modifierDescription.props;

    expect(TestUtils.isElementOfType(modifierDescription.props.children, Text)).to.equal(true);
    expect(props.children.props.message).to.equal(`components.modifierDescription.text`);
    expect(props.children.props.formattedArticleCount).to.equal(`130`);
    expect(props.children.props.comparator).to.equal(`financials`);

  });

  it ('formats article count', function() {
    let modifierDescription = createComponent(ModifierDescription, {
      comparator: 'test',
      articleCount: 13004
    });
    const props = modifierDescription.props;

    expect(TestUtils.isElementOfType(modifierDescription.props.children, Text)).to.equal(true);
    expect(props.children.props.message).to.equal(`components.modifierDescription.text`);
    expect(props.children.props.formattedArticleCount).to.equal(`13,004`);
    expect(props.children.props.comparator).to.equal(`test`);
  });
});
