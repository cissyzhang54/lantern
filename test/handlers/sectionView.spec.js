import {expect} from 'chai';
import React from 'react';
import sinon from 'sinon';
import {createAltWrappedComponent} from '../createComponent';
import SectionView from '../../src/shared/handlers/SectionView';
import SectionModifier from '../../src/shared/components/SectionModifier';
import Header from '../../src/shared/components/Header';

import AnalyticsStore from '../../src/shared/stores/AnalyticsStore';

const TestUtils = React.addons.TestUtils;

describe ('SectionView Handler', function() {
  let AnalyticsStoreStub;

  beforeEach(function () {
    AnalyticsStoreStub = sinon.stub(AnalyticsStore, 'getState');
  });

  afterEach(function () {
    AnalyticsStoreStub.restore();
  });

  xit ('Should render section view handler', function() {
    AnalyticsStoreStub.returns({
      data: {
        title:'test me',
        readTimes: [],
        topicCount: [],
        topicViews : [],
        referrerTypes: [],
        socialReferrers: [],
        internalReferrerTypes: [],
        publishTimes: []
      },
      query: {
        section: 'Financials'
      }
    });

    let sectionView = createAltWrappedComponent(SectionView, {
      params:{section:'test-section'}
    });

    const props = sectionView.props;
    const divContainer = props.children;
    const sectionModifier = divContainer.props.children[0].props.children;
    const col2 = divContainer.props.children[1];
    const header = col2.props.children[1];

    expect(header.props.title).to.equal('Section: test-section');
    expect(TestUtils.isElementOfType(header, Header)).to.equal(true);
    expect(TestUtils.isElementOfType(sectionModifier, SectionModifier)).to.equal(true);

  });

});
