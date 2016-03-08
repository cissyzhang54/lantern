import { expect } from 'chai';
import TestUtils from 'react-addons-test-utils';
import Search from '../../src/shared/components/Search';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Link from 'react-router/lib/Link';
import {createAltWrappedComponent} from '../createComponent';
import Logo from '../../src/shared/components/Logo';
import Input from 'react-bootstrap/lib/Input';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import {createComponent} from '../createComponent';
import sinon from 'sinon';
import TopArticleStore from '../../src/shared/stores/TopArticlesStore';

describe('Search component', function() {
  let search;
  let stub;

  beforeEach(function () {
    stub = sinon.stub(TopArticleStore, 'getState');
  });
  afterEach(function () {
    stub.restore();
  });

  it('Should render the search field, with no results', function() {
    stub.returns({
      data: {
        topArticleViews: []
      }
    });

    search = createAltWrappedComponent(Search, {
      total: 0,
      results:[]
    });

    let searchResults = search.props.children[3];
    expect(TestUtils.isElementOfType(search.props.children[0], Input)).to.equal(true);
    expect(TestUtils.isElementOfType(searchResults, ListGroup)).to.equal(false);
  });

  it('Should render results', function() {
    stub.returns({
      data: {
        topArticleViews: []
      }
    });

    search = createAltWrappedComponent(Search, {
      results:[
        {title:'dude',article_uuid:'wheres',authors:['my car?'],sections:['film'], topics:['hangover']},
        {title:'bond',article_uuid:'james',authors:['bond'],sections:['film'], topics:['nationalism']}
      ],
      query: 'film quotes'
    });

    let searchResults = search.props.children[4].props.children[1];
    expect(TestUtils.isElementOfType(searchResults, ListGroup)).to.equal(true);
    expect(searchResults.props.children.length).to.equal(2)
  });

  it('Should render warnings', function() {
    stub.returns({
      data: {
        topArticleViews: []
      }
    });

    search = createAltWrappedComponent(Search, {
      errorMessage:'Couldn\'t find any',
      error: new Error('Couldn\'t find any good nicholas cage movies'),
      query: 'good nicholas cage movies'
    });

    let errors = search.props;
    expect(errors.message).to.equal(`Couldn\'t find any`)
  });
});
