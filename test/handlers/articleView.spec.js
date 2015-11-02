import {expect} from 'chai';
import React from 'react';
import sinon from 'sinon';
import {createAltWrappedComponent} from '../createComponent';
import ArticleView from '../../src/shared/handlers/ArticleView';
import Error404 from '../../src/shared/handlers/404';
import SectionModifier from '../../src/shared/components/SectionModifier';
import Logo from '../../src/shared/components/Logo';
import * as formatAuthors from '../../src/shared/utils/formatAuthors';
import ArticleStore from '../../src/shared/stores/ArticleStore';
import ComparatorQueryStore from '../../src/shared/stores/ComparatorQueryStore';
import ArticleQueryStore from '../../src/shared/stores/ArticleQueryStore';
import ArticleQueryActions from '../../src/shared/actions/ArticleQueryActions';
import ComparatorQueryActions from '../../src/shared/actions/ComparatorQueryActions';

const TestUtils = React.addons.TestUtils;

describe ('ArticleView Handler', function() {
  let stub;
  let queryStub;
  let formatStub;
  let actionStub;
  let compActionStub;
  let compQueryStub;
  let compActionSelectStub;

  beforeEach(function () {
    stub = sinon.stub(ArticleStore, 'getState');
    queryStub = sinon.stub(ArticleQueryStore, 'getState');
    formatStub = sinon.stub(formatAuthors, 'join');
    actionStub = sinon.spy(ArticleQueryActions, 'setUUID');
    compActionStub = sinon.spy(ComparatorQueryActions, 'setUUID');
    compActionSelectStub = sinon.spy(ComparatorQueryActions, 'selectComparator');
    compQueryStub = sinon.stub(ComparatorQueryStore, 'getState');
  });

  afterEach(function () {
    stub.restore();
    formatStub.restore();
    queryStub.restore();
    actionStub.restore();
    compActionStub.restore();
    compQueryStub.restore();
    compActionSelectStub.restore();
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
    const divContainer = articleView.props;
    const logo = divContainer.children;

    expect(logo.props.message).to.equal('Loading Article...');
    expect(TestUtils.isElementOfType(logo, Logo)).to.equal(true);

  });

  it ('Should render a error message', function() {
    formatStub.returns('');
    stub.returns({ data:{ }, errorMessage:'fooBar' });
    queryStub.returns({ query:{ uuid: null } });
    compQueryStub.returns({ query:{ comparator: 'test-comp' } });
    let articleView = createAltWrappedComponent(ArticleView, {
      params:{}
    });
    const divContainer = articleView.props;
    const error404 = divContainer.children;

    expect(error404.props.title).to.equal('Lantern - Article Not Found');
    expect(TestUtils.isElementOfType(error404, Error404)).to.equal(true);

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
});
