import React from "react";
import Input from 'react-bootstrap/lib/Input';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import Link from 'react-router/lib/components/Link';
import Logo from '../components/Logo';
import connectToStores from 'alt/utils/connectToStores';

import _ from 'underscore';

import SearchStore from '../stores/SearchStore';
import SearchActions from '../actions/SearchActions';

class Search extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      displayLogo: (!props.results.length) || false
    };
  }

  static getStores() {
    return [SearchStore];
  }

  static getPropsFromStores() {
    return SearchStore.getState();
  }

  componentDidMount() {
    this.refs.searchinput.getInputDOMNode().focus();
  }

  _handleSearchInput() {
    this.setState({displayLogo: false});
    const val = this.refs.searchinput.getValue();
    if (val.length >= 3) {
      SearchActions.search(val);
    }
  }

  render() {
    let results = this.props.results.map((r, i) => {
      return (
        <Link to={'/articles/' + r.article_uuid} key={r._id}>
          <ListGroupItem header={r.title}>
          {formatAuthors(r.authors)}
          </ListGroupItem>
        </Link>
      );
    });

    return (<div>
      {this.state.displayLogo ? <Logo iconOnly large/> : {}}
      <Input
        ref="searchinput"
        labelClassName='large'
        bsSize='large'
        type='search'
        addonBefore='Search'
        onChange={_.debounce(this._handleSearchInput.bind(this), 300)}
        >
      </Input>
      <ListGroup>{results}</ListGroup>
    </div>);
  }

}


function formatAuthors(authors) {
  if (authors.length) {
    return 'Anonymous';
  }

  var lastAuthor = authors.pop();
  if (!authors.length) {
    return lastAuthor;
  }
  return authors.join(", ") + ' and ' + lastAuthor;
}

export default connectToStores(Search);
