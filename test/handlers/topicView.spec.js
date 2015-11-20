import {expect} from 'chai';
import React from 'react';
import sinon from 'sinon';
import {createAltWrappedComponent} from '../createComponent';
import TopicView from '../../src/shared/handlers/TopicView';
import SectionModifier from '../../src/shared/components/SectionModifier';
import Header from '../../src/shared/components/Header';
import TopicStore from '../../src/shared/stores/TopicStore';
import TopicQueryStore from '../../src/shared/stores/TopicQueryStore';

const TestUtils = React.addons.TestUtils;

describe ('TopicView Handler', function() {
  let TopicStoreStub;
  let TopicQueryStoreStub;

  beforeEach(function () {
    TopicStoreStub = sinon.stub(TopicStore, 'getState');
    TopicQueryStoreStub = sinon.stub(TopicQueryStore, 'getState');
  });

  afterEach(function () {
    TopicStoreStub.restore();
    TopicQueryStoreStub.restore();
  });

  it ('Should render topic view handler', function() {
    TopicStoreStub.returns({ data: { title:'test me', readTimes: [], topicCount: [], topicViews : [], referrerTypes: [], socialReferrers: [], internalReferrerTypes: [], publishTimes: [] } });
    TopicQueryStoreStub.returns({ query:{ topic: 'UK' } });
    let topicView = createAltWrappedComponent(TopicView, {
      params:{topic:'test-topic'}
    });


    const props = topicView.props;
    const divContainer = props.children;
    const sectionModifier = divContainer.props.children[0];
    const col2 = divContainer.props.children[1];
    const header = col2.props.children[1];

    expect(header.props.title).to.equal('Topic: test-topic');
    expect(TestUtils.isElementOfType(header, Header)).to.equal(true);
    expect(TestUtils.isElementOfType(sectionModifier, SectionModifier)).to.equal(true);
  });

});
