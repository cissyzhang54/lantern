import {expect} from 'chai';
import TestUtils from 'react-addons-test-utils';
import {createComponent} from '../createComponent';
import NavBar from '../../src/shared/components/NavBar';

describe ('NavBar component', function() {
  let navBar;

  beforeEach(function() {
    navBar = createComponent(NavBar, {
      user:{name:{givenName:'forename'}}
    });
  });

  it ('Should render component', function() {
    const ul = navBar.props.children;
    const li = ul.props.children;

    expect(TestUtils.isElementOfType(ul, 'ul')).to.equal(true);
    expect(TestUtils.isElementOfType(li[0], 'li')).to.equal(true);
    expect(li.length).to.equal(2);
  });
});
