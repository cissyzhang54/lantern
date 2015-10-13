import { expect } from 'chai';
import React from 'react';
import Search from '../../src/shared/components/Search';
import Logo from '../../src/shared/components/Logo';
import Input from 'react-bootstrap/lib/Input';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import {createComponent} from '../createComponent';

const TestUtils = React.addons.TestUtils;

describe('Search component', function() {
  let search;

  it('Should render the search field, with an empty results list', function() {
    search = createComponent(Search, {
      total: 0,
      results:[]
    });
    let searchResults = search.props.children[3];
    expect(TestUtils.isElementOfType(search.props.children[0], Logo)).to.equal(true);
    expect(TestUtils.isElementOfType(search.props.children[1], Input)).to.equal(true);
    expect(TestUtils.isElementOfType(searchResults, ListGroup)).to.equal(true);
    expect(searchResults.props.children.length).to.equal(0)
  });


  it('Should render results', function() {
    search = createComponent(Search, {
      results:[
        {title:'dude',article_uuid:'wheres',authors:['my car?']},
        {title:'bond',article_uuid:'james',authors:['bond']}
      ],
      query: 'film quotes'
    });
    let searchResults = search.props.children[3];
    expect(TestUtils.isElementOfType(searchResults, ListGroup)).to.equal(true);
    expect(searchResults.props.children.length).to.equal(2)
  });


  it('Should render warnings', function() {
    search = createComponent(Search, {
      errorMessage:'Couldn\'t find any',
      query: 'good nicholas cage movies'
    });
    let errors = search.props.children[2];
    expect(TestUtils.isElementOfType(errors, ListGroupItem)).to.equal(true);
    expect(errors._store.props.header).to.equal(`Couldn't find any`)
  });


  xit('handles typing', function() {
    //search = createComponent(Search, { });
    //var node = React.findDOMNode('searchinput');
    //node.value = 'giraffe';
    //React.addons.TestUtils.Simulate.change(node);
    //let props = search.props;
    //debugger
  });
});
