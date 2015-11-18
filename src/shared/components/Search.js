import React from "react";
import Input from 'react-bootstrap/lib/Input';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import Button from 'react-bootstrap/lib/Button';
import Link from 'react-router/lib/Link';
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

  shouldPerformSearch(){
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
    if (this.shouldPerformSearch()) {
      this.props.search(this.state.query);
    } else {
      this.props.destroy();
    }
  }

  _handleClick(){
    ArticleQueryActions.setUUID(this.uuid)
    ComparatorQueryActions.setUUID(this.uuid)
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

    const blockLinkStyle = {
      marginRight: '5px',
      marginBottom: '5px',
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      display: 'inline-block',
      flexGrow: 1,
      minWidth: '15%',
      textAlign: 'center'
    };

    let sections = (this.props.sections || [])
    .map((section, i) => {
      return (
        <Link
          data-component='sectionResult'
          to={'/sections/' + section}
          key={i}
          style={blockLinkStyle}
          >
          {section}
        </Link>
      );
    })

    let topics = (this.props.topics || [])
    .map((topic, i) => {
      return (
        <Link
          data-component='topicResult'
          to={'/topics/' + topic}
          key={i}
          style={blockLinkStyle}
          >
          {topic}
        </Link>
      )
    });

    let sectionResults = (
      <div>
        <h2><small>Sections</small></h2>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap'
          }}>
          {sections}
        </div>
      </div>
    );

    let topicResults = (
      <div>
        <h2><small>Topics</small></h2>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap'
          }}>
          {topics}
        </div>
      </div>
    );

    let articleResults = (
      <div>
        <h2><small>Articles</small></h2>
        <ListGroup>{results}</ListGroup>
        { (showShowMore) ? showMore : null }
      </div>
    );


    return (<div data-component='search'>
      <Logo
        message={isLoading ? 'Searching...' : ''}
        loading={isLoading}
        displayLogo={(!(results.length) && !(isLoading))}
        search/>
      <Input
        ref="searchinput"
        labelClassName='large'
        bsSize='large'
        type='search'
        addonBefore='Search'
        onChange={_.debounce(this._handleSearchInput.bind(this), 400)}
        >
      </Input>
      { additionalInfo }
      { sections.length ? sectionResults : null}
      { topics.length ? topicResults : null}
      { results.length ? articleResults : null }
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


