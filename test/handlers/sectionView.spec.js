import {expect} from 'chai';
import React from 'react';
import sinon from 'sinon';
import {createAltWrappedComponent} from '../createComponent';
import SectionView from '../../src/shared/handlers/SectionView';
import SectionModifier from '../../src/shared/components/SectionModifier';
import Header from '../../src/shared/components/Header';
import SectionStore from '../../src/shared/stores/SectionStore';
import SectionQueryStore from '../../src/shared/stores/SectionQueryStore';

const TestUtils = React.addons.TestUtils;

describe ('SectionView Handler', function() {
  let SectionStoreStub;
  let SectionQueryStoreStub;

  beforeEach(function () {
    SectionStoreStub = sinon.stub(SectionStore, 'getState');
    SectionQueryStoreStub = sinon.stub(SectionQueryStore, 'getState');
  });

  afterEach(function () {
    SectionStoreStub.restore();
    SectionQueryStoreStub.restore();
  });

  it ('Should render section view handler', function() {
    SectionStoreStub.returns({ data: { title:'test me', readTimes: [], topicCount: [], topicViews : [], referrerTypes: [], socialReferrers: [], internalReferrerTypes: [], publishTimes: [] } });
    SectionQueryStoreStub.returns({ query:{ section: 'Financials' } });

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
