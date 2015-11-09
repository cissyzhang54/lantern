
import {expect} from 'chai';
import React from 'react';

import sinon from 'sinon';
import {createAltWrappedComponent, createComponent} from '../createComponent';
import ArticleView from '../../src/shared/handlers/ArticleView';
import Error404 from '../../src/shared/handlers/404';
import SectionModifier from '../../src/shared/components/SectionModifier';
import Messaging from '../../src/shared/components/Messaging';
import Logo from '../../src/shared/components/Logo';
import * as formatAuthors from '../../src/shared/utils/formatAuthors';
import ArticleStore from '../../src/shared/stores/ArticleStore';
import ComparatorQueryStore from '../../src/shared/stores/ComparatorQueryStore';
import ArticleQueryStore from '../../src/shared/stores/ArticleQueryStore';
import ArticleQueryActions from '../../src/shared/actions/ArticleQueryActions';
import ComparatorQueryActions from '../../src/shared/actions/ComparatorQueryActions';
import ArticleActions from '../../src/shared/actions/ArticleActions.js';
const TestUtils = React.addons.TestUtils;
import FeatureFlag from '../../src/shared/utils/featureFlag.js';

describe ('ArticleView Handler', function() {
  let stub;
  let queryStub;
  let formatStub;
  let actionStub;
  let compActionStub;
  let compQueryStub;
  let compActionSelectStub;
  let listenSpy;
  let unlistenSpy;
  let featureStub;

  beforeEach(function () {
    stub = sinon.stub(ArticleStore, 'getState');
    queryStub = sinon.stub(ArticleQueryStore, 'getState');
    formatStub = sinon.stub(formatAuthors, 'join');
    actionStub = sinon.spy(ArticleQueryActions, 'setUUID');
    compActionStub = sinon.spy(ComparatorQueryActions, 'setUUID');
    compActionSelectStub = sinon.spy(ComparatorQueryActions, 'selectComparator');
    compQueryStub = sinon.stub(ComparatorQueryStore, 'getState');
    listenSpy = sinon.spy(ArticleActions, 'listenToQuery');
    unlistenSpy = sinon.spy(ArticleActions, 'unlistenToQuery');
    featureStub = sinon.stub(FeatureFlag, 'check');
  });

  afterEach(function () {
    stub.restore();
    formatStub.restore();
    queryStub.restore();
    actionStub.restore();
    compActionStub.restore();
    compQueryStub.restore();
    compActionSelectStub.restore();
    listenSpy.restore();
    unlistenSpy.restore();
    featureStub.restore();
  });

  it ('Should render component', function() {
    formatStub.returns('');
    stub.returns({ data:{ title:'test me' } });
    queryStub.returns({ query:{ uuid: null } });
    compQueryStub.returns({ query:{ comparator: 'test-comp' } });
    let articleView = createAltWrappedComponent(ArticleView, {
      params:{}
    });
    const props = articleView.props;
    const divContainer = props.children;
    const col = divContainer.props.children;
    const sectionModifier = col.props.children[0];

    expect(props.title).to.equal('Lantern - test me');
    expect(TestUtils.isElementOfType(sectionModifier, SectionModifier)).to.equal(true);

  });

  it ('Should render a loading message', function() {
    formatStub.returns('');
    stub.returns({ });
    queryStub.returns({ query:{ uuid: null } });
    compQueryStub.returns({ query:{ comparator: 'test-comp' } });
    let articleView = createAltWrappedComponent(ArticleView, {
      params:{}
    });
    const messaging = articleView
    expect(messaging.props.type).to.equal('LOADING');
    expect(TestUtils.isElementOfType(messaging, Messaging)).to.equal(true);

  });

  it ('Should render a error message', function() {
    formatStub.returns('');
    stub.returns({ data:{ }, errorMessage:'fooBar' });
    queryStub.returns({ query:{ uuid: null } });
    compQueryStub.returns({ query:{ comparator: 'test-comp' } });
    let articleView = createAltWrappedComponent(ArticleView, {
      params:{}
    });
    const messaging = articleView

    expect(messaging.props.type).to.equal('ERROR');
    expect(TestUtils.isElementOfType(messaging, Messaging)).to.equal(true);

  });

  it ('Should not set uuid\'s if they are the same', function() {
    formatStub.returns('');
    stub.returns({ data:{ } });
    queryStub.returns({ query:{ uuid:'ive-not-changed'} });
    compQueryStub.returns({ query:{ comparator: 'test-comp' } });
    createAltWrappedComponent(ArticleView, {
      params:{uuid:'ive-not-changed'}
    });

    expect(actionStub.calledOnce).to.equal(false);
    expect(compActionStub.calledOnce).to.equal(false);

  });

  it ('Should set uuid\'s if they have changed', function() {
    formatStub.returns('');
    stub.returns({ data:{ } });
    queryStub.returns({ query:{ uuid:'ive-changed'} });
    compQueryStub.returns({ query:{ comparator: 'test-comp' } });
    createAltWrappedComponent(ArticleView, {
      params:{uuid:'uuid-me-up'}
    });

    expect(actionStub.calledOnce).to.equal(true);
    expect(compActionStub.calledOnce).to.equal(true);

  });

  it ('Should not set comparator if it is the same', function() {
    formatStub.returns('');
    stub.returns({ data:{ } });
    queryStub.returns({ query:{  }});
    compQueryStub.returns({ query:{ comparator: 'ive-not-changed' } });
    createAltWrappedComponent(ArticleView, {
      params:{comparator:'ive-not-changed'}
    });

    expect(compActionSelectStub.calledOnce).to.equal(false);

  });

  it ('Should set comparator if it has changed', function() {
    formatStub.returns('');
    stub.returns({ data:{ } });
    queryStub.returns({ query:{ } });
    compQueryStub.returns({ query:{ comparator: 'test-comp' } });
    createAltWrappedComponent(ArticleView, {
      params:{comparator:'ive-not-changed'}
    });

    expect(compActionSelectStub.calledOnce).to.equal(true);

  });

  it ('Should set up listeners', () => {
    formatStub.returns('');
    featureStub.returns(false);
    stub.returns({ data:{ } });
    compQueryStub.returns({ query:{ comparator: 'test-comp' } });
    queryStub.returns({ query:{ } });
    let props = {
      params:{
        uuid: "0049a468-4be5-11e5-b558-8a9722977189",
        comparator:'ive-not-changed'}
    };
    TestUtils.renderIntoDocument(React.createElement(ArticleView, props))
    expect(listenSpy.calledOnce).to.equal(true);

  });

  it ('should remove listeners', () => {
    formatStub.returns('');
    featureStub.returns(false);
    stub.returns({ data:{ } });
    compQueryStub.returns({ query:{ comparator: 'test-comp' } });
    queryStub.returns({ query:{ } });
    let props = {
      params:{
        uuid: "0049a468-4be5-11e5-b558-8a9722977189",
        comparator:'ive-not-changed'}
    };
    let container = document.createElement('div');
    React.render(React.createElement(ArticleView, props), container);
    React.unmountComponentAtNode(container);
    expect(unlistenSpy.calledOnce).to.equal(true);

  });
});

