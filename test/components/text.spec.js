import {expect} from 'chai';
import TestUtils from 'react-addons-test-utils';
import {createComponent} from '../createComponent';
import Text from '../../src/shared/components/Text';
import {FormattedMessage} from 'react-intl';

describe('Text component', function() {
  let text;

  beforeEach(function() {
    text = createComponent(Text, {
      message: 'explanations.articleHandler.scrollDepth', comparator:'Financials', articleCount: 3
    });
  });

  it ('Should render component', function() {
    expect(TestUtils.isElementOfType(text.props.children, FormattedMessage)).to.equal(true);
    expect(text.props.children.props.values.comparator).to.equal('Financials');
    expect(text.props.children.props.values.articleCount).to.equal(3);
  });
});
