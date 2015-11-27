import {expect} from 'chai';
import React from 'react';
import {createComponent} from '../createComponent';
import Text from '../../src/shared/components/Text';
import {FormattedMessage} from 'react-intl'

const TestUtils = React.addons.TestUtils;

describe ('Text component', function() {
  let text;

  beforeEach(function() {
    text = createComponent(Text, {
      message: 'components.modifierDescription.text', comparator:'Financials', articleCount: 3
    });
  });

  it ('Should render component', function() {
    const props = text.props;
    
    expect(TestUtils.isElementOfType(text.props.children, FormattedMessage)).to.equal(true);
    expect(text.props.children.props.message).to.equal('The comparison includes {formattedArticleCount} "{comparator}" articles');
    expect(text.props.children.props.comparator).to.equal('Financials');
    expect(text.props.children.props.articleCount).to.equal(3);
  });
});
