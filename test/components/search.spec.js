import { expect } from 'chai';
import TestUtils from 'react-addons-test-utils';
import Search from '../../src/shared/components/Search';
import Logo from '../../src/shared/components/Logo';
import Input from 'react-bootstrap/lib/Input';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import {createComponent} from '../createComponent';

describe('Search component', function() {
  let search;

  it('Should render the search field, with no results', function() {
    search = createComponent(Search, {
      total: 0,
      results:[]
    });
    let searchResults = search.props.children[3];
    expect(TestUtils.isElementOfType(search.props.children[0], Logo)).to.equal(true);
    expect(TestUtils.isElementOfType(search.props.children[1], Input)).to.equal(true);
    expect(TestUtils.isElementOfType(searchResults, ListGroup)).to.equal(false);
  });


  it('Should render results', function() {
    search = createComponent(Search, {
      results:[
        {title:'dude',article_uuid:'wheres',authors:['my car?'],sections:['film'], topics:['hangover']},
        {title:'bond',article_uuid:'james',authors:['bond'],sections:['film'], topics:['nationalism']}
      ],
      query: 'film quotes'
    });

    let searchResults = search.props.children[5].props.children[1];
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
    expect(errors.props.header).to.equal(`Couldn't find any`)
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
