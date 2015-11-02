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

const TestUtils = React.addons.TestUtils;

describe ('ArticleView Handler', function() {
  let stub;
  let formatStub;

  beforeEach(function () {
    stub = sinon.stub(ArticleStore, 'getState');
     formatStub = sinon.stub(formatAuthors, 'join');

  });
  afterEach(function () {
    stub.restore();
    formatStub.restore();
  });

  it ('Should render component', function() {
    formatStub.returns('');
    stub.returns({ data:{ title:'test me' } });
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
    let articleView = createAltWrappedComponent(ArticleView, {
      params:{}
    });
    const divContainer = articleView.props;
    const error404 = divContainer.children;

    expect(error404.props.title).to.equal('Lantern - Article Not Found');
    expect(TestUtils.isElementOfType(error404, Error404)).to.equal(true);

  });
});

