import React from "react";
import Input from 'react-bootstrap/lib/Input';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import Link from 'react-router/lib/components/Link';
import Loading from '../components/Loading';
import Logo from '../components/Logo';
import connectToStores from 'alt/utils/connectToStores';

import _ from 'underscore';

import SearchStore from '../stores/SearchStore';
import SearchActions from '../actions/SearchActions';

class Search extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      displayNotFound: false,
      query: ''
    };
  }

  static getStores() {
    return [SearchStore];
  }

  static getPropsFromStores() {
    return SearchStore.getState();
  }

  showSearchResults(){
    const val = (this.refs && this.refs.searchinput) ? this.refs.searchinput.getValue() : '';
    return val.length >= 3;
  }

  componentDidMount() {
    let el = this.refs.searchinput.getInputDOMNode();
    let query = SearchStore.getState().query;
    el.setAttribute('value', query);
    el.focus();
    if (el.setSelectionRange) {
      el.setSelectionRange(query.length, query.length);
    }
  }

  _handleSearchInput() {
    this.setState({
      query: this.refs.searchinput.getValue()
    });
    if (this.showSearchResults()) {
      SearchActions.search(this.state.query);
    } else {
      SearchActions.destroy();
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
    let additionalInfo = getAdditionalInfo()
    let isLoading = SearchStore.getState().loading;
    return (<div>
      <Loading message={isLoading?'Searching...':''} loading={isLoading}/>
      <Input
        ref="searchinput"
        labelClassName='large'
        bsSize='large'
        type='search'
        addonBefore='Search'
        onChange={_.debounce(this._handleSearchInput.bind(this), 300)}
        >
      </Input>
      { additionalInfo }
      <ListGroup>{results}</ListGroup>
    </div>);
  }

}


function formatAuthors(authors) {
  if (!authors.length) {
    return 'Anonymous';
  }

  var lastAuthor = authors.pop();
  if (!authors.length) {
    return lastAuthor;
  }
  return authors.join(", ") + ' and ' + lastAuthor;
}

function getAdditionalInfo(){
  let additionalClass, additionalMessage;
  let searchState = SearchStore.getState();
  if (searchState.errorMessage){
    additionalClass = 'warning'
    additionalMessage = searchState.errorMessage
  } else {
    return '';
  }
  return <ListGroupItem bsStyle={additionalClass} header={additionalMessage} />
}
export default connectToStores(Search);
