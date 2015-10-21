import React from "react";
import Input from 'react-bootstrap/lib/Input';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import Button from 'react-bootstrap/lib/Button';
import Link from 'react-router/lib/components/Link';
import Logo from '../components/Logo';
import SearchResult from './SearchResult.js';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import ArticleActions from '../actions/ArticleActions';
import ArticleQueryActions from '../actions/ArticleQueryActions';
import ComparatorQueryActions from '../actions/ComparatorQueryActions';

import _ from 'underscore';
import moment from 'moment';

const MIN_SEARCH_LENGTH = 2;

export default class Search extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      displayNotFound: false,
      query: ''
    };
  }

  showSearchResults(){
    const val = (this.refs && this.refs.searchinput) ? this.refs.searchinput.getValue() : '';
    return val.length >= MIN_SEARCH_LENGTH;
  }

  componentDidMount() {
    let el = this.refs.searchinput.getInputDOMNode();
    let query = this.props.query || '';
    el.setAttribute('value', query);
    el.focus();
    if (el.setSelectionRange) {
      el.setSelectionRange(query.length, query.length);
    }
    ArticleActions.listenToQuery();
  }

  _handleSearchInput() {
    this.setState({
      query: this.refs.searchinput.getValue()
    });
    if (this.showSearchResults()) {
      this.props.search(this.state.query);
    } else {
      this.props.destroy();
    }
  }

  _handleClick(){
    ArticleQueryActions.selectUUID(this.uuid)
    ArticleQueryActions.selectDateRange({from:this.publishDate,to:moment()})
    ComparatorQueryActions.setPublishDate(this.publishDate)
  }

  render() {

    let results = (this.props.results || []).map((r, i) => {
      return (
        <SearchResult
          handleClick={this._handleClick}
          result={r}
          key={i}
        />
      )
    });
    let additionalInfo = getAdditionalInfo(this.props)
    let isLoading = this.props.loading;
    let showShowMore = results.length < this.props.total;

    let showMore = (
      <div style={{textAlign: 'center', width: '100%'}}>
      <Button onClick={this.props.getMoreResults}>
        Show more results
      </Button>
    </div>
    );

    return (<div>
      <Logo message={isLoading?'Searching...':''} loading={isLoading} search/>
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
      { (showShowMore) ? showMore : null }
     </div>);
  }

}


function getAdditionalInfo(props){
  let additionalClass, additionalMessage;
  let errorMessage = props.errorMessage;
  if (errorMessage){
    additionalClass = 'warning'
    additionalMessage = errorMessage
  } else {
    return '';
  }
  return <ListGroupItem bsStyle={additionalClass} header={additionalMessage} />
}
