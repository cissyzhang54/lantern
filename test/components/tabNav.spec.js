import {expect} from 'chai';
import React from 'react';
import {createComponent} from '../createComponent';
import TabNav from '../../src/shared/components/TabNav';
import TestUtils from 'react-addons-test-utils';
import moment from 'moment';

describe('The TabNav component', function() {

  it('Renders the tab component', function() {
    let component = createComponent(TabNav, {});
    expect(component.props['data-component']).to.equal("navigationTabs");
    expect(component.props.children.props.children.length).to.equal(2);
    expect(component.props.children.props.className).to.equal("tabNav");
  });

  it('Renders the tab component with 2 child tabs', function() {
    let component = createComponent(TabNav, {});
    expect(component.props.children.props.children[0].props.children).to.equal("Live");
    expect(component.props.children.props.children[1].props.children ).to.equal("Archive");
  });

  it('Renders the tab with a disabled archive tab', function() {
    let component = createComponent(TabNav, {
      analyticsView: "article",
      publishDate: moment().subtract(3, 'h').toISOString(),
      uuid: "wewwe-23dsd3"
    });

    expect(component.props.children.props.children[1].props.className).to.contain('tabNav__tab--disabled');
  });

  it('Renders the tab with an enabled archive tab', function() {
    let component = createComponent(TabNav, {
      analyticsView: "article",
      publishDate: moment().subtract(32, 'h').toISOString(),
      uuid: "wewwe-23dsd3"
    });

    expect(component.props.children.props.children[1].props.className).to.contain('tabNav__tab--enabled');
  });

});
