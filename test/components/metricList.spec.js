import {expect} from 'chai';
import React from 'react';
import {createComponent} from '../createComponent';
import MetricList from '../../src/shared/components/MetricList';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import TestUtils from 'react-addons-test-utils';

describe('The MetricList component', function() {

  it('renders an empty div when there are no items', function() {
    let component = createComponent(MetricList, {});
    expect(component.type).to.equal('div');
  });

  it('renders a definition list', function() {
    let component = createComponent(MetricList, {
      items: [{term: 'Momobot', value: 8}]
    });

    let elementDT = component.props.children[0][0];
    let elementDD = component.props.children[0][1];

    expect(component.type).to.equal('dl');
    expect(elementDT.type).to.equal('dt');
    expect(elementDD.type).to.equal('dd');

    expect(elementDT.props.children[0]).to.equal('Momobot');
    expect(elementDD.props.children).to.equal(8);
  });

  it('renders a tooltip if there is one', function() {
    let component = createComponent(MetricList, {
      items: [{term: 'Momobot', toolTip: 'Explanation yo', value: 8}]
    });
    let elementDT = component.props.children[0][0];

    expect(TestUtils.isElementOfType(elementDT.props.children[1], OverlayTrigger)).to.equal(true);
  });

  it('renders the correct number of items', function() {
    let component = createComponent(MetricList, {
      items: [{term: 'Momobot', value: 8},
              {term: 'Mondaybot', value: 0},
              {term: 'Timesheetbot', value: 'Yuck'}]
    });
    expect(component.props.children.length).to.equal(3);
  });

  it('renders a header className', function() {
    let component = createComponent(MetricList, {
      items: [{term: 'Momobot', value: 8, header: true}]
    });

    expect(component.props.children[0][0].props.className).to.contain('metric-list__term--header');
    expect(component.props.children[0][1].props.className).to.contain('metric-list__value--header');

  });

});
