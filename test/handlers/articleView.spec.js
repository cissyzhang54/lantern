
import {expect} from 'chai';
import TestUtils from 'react-addons-test-utils';

import sinon from 'sinon';
import {createAltWrappedComponent, createComponent} from '../createComponent';
import ArticleView from '../../src/shared/handlers/ArticleView';
import Error404 from '../../src/shared/handlers/404';
import SectionModifier from '../../src/shared/components/SectionModifier';
import Messaging from '../../src/shared/components/Messaging';
import Logo from '../../src/shared/components/Logo';
import * as formatAuthors from '../../src/shared/utils/formatAuthors';

import AnalyticsActions from '../../src/shared/actions/AnalyticsActions';
import AnalyticsStore from '../../src/shared/stores/AnalyticsStore';

import FeatureFlag from '../../src/shared/utils/featureFlag.js';

describe ('ArticleView Handler', function() {
  let stub;
  let formatStub;
  let actionStub;
  let featureStub;

  beforeEach(function () {
    stub = sinon.stub(AnalyticsStore, 'getState');
    formatStub = sinon.stub(formatAuthors, 'join');
    actionStub = sinon.spy(AnalyticsActions, 'updateQuery');
    featureStub = sinon.stub(FeatureFlag, 'check');
  });

  afterEach(function () {
    stub.restore();
    formatStub.restore();
    actionStub.restore();
    featureStub.restore();
  });

  xit ('Should render component', function() {
    formatStub.returns('');
    stub.returns({ data:{ title:'test me' } });
    let articleView = createAltWrappedComponent(ArticleView, {
      params:{
        uuid : 'blah',
        comparator: 'bluh',
        comparatorType: 'bleah'
      }
    });
    const props = articleView.props;
    const sectionModifier = props.children.props.children[0].props.children[0];

    expect(props.title).to.equal('Lantern - test me');
    expect(TestUtils.isElementOfType(sectionModifier, SectionModifier)).to.equal(true);

  });

  xit ('Should render a loading message', function() {
    formatStub.returns('');
    stub.returns({
      loading: true
    });
    let articleView = createAltWrappedComponent(ArticleView, {
      params:{
        uuid : 'blah',
        comparator: 'bluh',
        comparatorType: 'bleah'
      }
    });
    const messaging = articleView
    expect(messaging.props.type).to.equal('LOADING');
    expect(TestUtils.isElementOfType(messaging, Messaging)).to.equal(true);
  });

  xit ('Should render a error message', function() {
    formatStub.returns('');
    stub.returns({ data:{ }, errorMessage:'fooBar' });
    queryStub.returns({ query:{ uuid: null } });
    compQueryStub.returns({ query:{ comparator: 'test-comp' } });
    let articleView = createAltWrappedComponent(ArticleView, {
      params:{
        uuid : 'blah',
        comparator: 'bluh',
        comparatorType: 'bleah'
      }
    });
    const messaging = articleView

    expect(messaging.props.type).to.equal('ERROR');
    expect(TestUtils.isElementOfType(messaging, Messaging)).to.equal(true);

  });



});
