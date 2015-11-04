import {expect} from 'chai';
import React from 'react';
import sinon from 'sinon';
import {createComponent} from '../createComponent';
import SearchResult from '../../src/shared/components/SearchResult';
import Link from 'react-router/lib/Link';
import moment from 'moment';
import * as formatAuthors from '../../src/shared/utils/formatAuthors';

const TestUtils = React.addons.TestUtils;

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
      result:{article_uuid: '1234', _id: '5678', authors: ['abc'], initial_publish_date: moment('2015-09-16T19:58:26.000Z')}
    });

    const link = searchResult.props.children;
    const listGroupItem = link.props.children;
    const row = listGroupItem.props.children;
    const col = row.props.children[0];
    const col2 = row.props.children[1];
    const authors = col.props.children;
    const publishDate = col2.props.children;

    expect(TestUtils.isElementOfType(link, Link)).to.equal(true);
    expect(publishDate.substr(0,10)).to.equal('Sections: ');
    expect(authors).to.equal('Authors: abc');

  });
});
