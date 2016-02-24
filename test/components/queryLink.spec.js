import {expect} from 'chai';
import React from 'react';
import {createComponent} from '../createComponent';
import QueryLink from '../../src/shared/components/QueryLink';
import assign from 'object-assign';
import TestUtils from 'react-addons-test-utils';
import Link from 'react-router/lib/Link';

describe ('QueryLink component', function() {
  let defaultQuery = {
    type: null,
    topic: null,
    section: null,
    uuid: null,
    dateFrom: '',
    dateTo: '',
    filters: {},
    publishDate: null,
    timespan: null
  };
  let mockQuery;

  beforeEach(function() {
    mockQuery = assign({}, defaultQuery);
  });

  it('Should render section links correctly', function() {
    assign(mockQuery, {
      section: 'nachos',
      type: 'section',
      timespan: '168'
    });

    let queryLink = createComponent(QueryLink, mockQuery);

    expect(TestUtils.isElementOfType(queryLink, Link)).to.equal(true);
    expect(queryLink.props.to).to.equal('/sections/nachos/168');
  });

  it('Should render topic links correctly', function() {
    assign(mockQuery, {
      topic: 'snickers',
      type: 'topic',
      timespan: '168'
    });

    let queryLink = createComponent(QueryLink, mockQuery);

    expect(TestUtils.isElementOfType(queryLink, Link)).to.equal(true);
    expect(queryLink.props.to).to.equal('/topics/snickers/168');
  });

  it('Should render article links correctly', function() {
    assign(mockQuery, {
      uuid: 'aaaaaa-bbbb-cccccc-blaaaaaaaa',
      type: 'article',
      comparator: 'fishnet-stockings',
      comparatorType: 'mr-flibble',
      timespan: 72
    });

    let queryLink = createComponent(QueryLink, mockQuery);

    expect(TestUtils.isElementOfType(queryLink, Link)).to.equal(true);
    expect(queryLink.props.to).to.equal('/articles/aaaaaa-bbbb-cccccc-blaaaaaaaa/72/mr-flibble/fishnet-stockings');

    mockQuery.timespan = 24;
    queryLink = createComponent(QueryLink, assign({}, mockQuery, {timespan: 72}));
    expect(queryLink.props.to).to.equal('/articles/aaaaaa-bbbb-cccccc-blaaaaaaaa/72/mr-flibble/fishnet-stockings');

  });

});
