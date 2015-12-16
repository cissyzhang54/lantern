import {expect} from 'chai';
import TestUtils from 'react-addons-test-utils';
import sinon from 'sinon';
import {createComponent} from '../createComponent';
import SearchResult from '../../src/shared/components/SearchResult';
import Link from 'react-router/lib/Link';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import moment from 'moment';
import * as formatAuthors from '../../src/shared/utils/formatAuthors';

describe ('SearchResult', function() {
  let stub;

  beforeEach(function () {
    stub = sinon.stub(formatAuthors, 'join');

  });
  afterEach(function () {
    stub.restore();
  });

  it ('Should render search results with author, sections publish date', function() {

    stub.returns('abc');

    let searchResult = createComponent(SearchResult, {
      result: {
        article_uuid: '1234',
        _id: '5678',
        authors: ['abc'],
        initial_publish_date: moment('2015-09-16T19:58:26.000Z'),
        sections: ['house', 'home']
      }
    });


    expect(TestUtils.isElementOfType(searchResult, ListGroupItem)).to.equal(true);

    let link = searchResult.props.header;
    expect(TestUtils.isElementOfType(link, Link)).to.equal(true);

  });
});
