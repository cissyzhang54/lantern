import {expect} from 'chai';
import TestUtils from 'react-addons-test-utils';
import sinon from 'sinon';
import {createAltWrappedComponent} from '../createComponent';
import TopicView from '../../src/shared/handlers/TopicView';
import SectionModifier from '../../src/shared/components/SectionModifier';
import Header from '../../src/shared/components/Header';
import AnalyticsStore from '../../src/shared/stores/AnalyticsStore';

describe ('TopicView Handler', function() {
  let AnalyticsStoreStub;

  beforeEach(function () {
    AnalyticsStoreStub = sinon.stub(AnalyticsStore, 'getState');
  });

  afterEach(function () {
    AnalyticsStoreStub.restore();
  });

  xit ('Should render topic view handler', function() {
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
        topic: 'UK'
      }
    });

    let topicView = createAltWrappedComponent(TopicView, {
      params:{topic:'test-topic'}
    });


    const props = topicView.props;
    const divContainer = props.children;
    const sectionModifier = divContainer.props.children[0].props.children;
    const col2 = divContainer.props.children[1];
    const header = col2.props.children[1];

    expect(header.props.title).to.equal('Topic: test-topic');
    expect(TestUtils.isElementOfType(header, Header)).to.equal(true);
    expect(TestUtils.isElementOfType(sectionModifier, SectionModifier)).to.equal(true);
  });

});
