import React from "react";
import Input from 'react-bootstrap/lib/Input';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import Button from 'react-bootstrap/lib/Button';
import Link from 'react-router/lib/Link';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import SearchResult from './SearchResult.js';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import ErrorHandler from '../components/ErrorHandler';

import AnalyticsActions from '../actions/AnalyticsActions';

import _ from 'underscore';
import moment from 'moment';

const MIN_SEARCH_LENGTH = 2;

const homeSections = [
  'UK',
  'World',
  'Companies',
  'Markets',
  'Lex',
  'Comment',
  'Life & Arts'
];

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
    setImmediate(()=>{
      el.select();
    });
    if (el.setSelectionRange) {
      el.setSelectionRange(query.length, query.length);
    }
  }

  _handleSearchInput() {
    this.setState({
      query: this.refs.searchinput.getValue()
    });
    if (this.shouldPerformSearch()) {
      let analytics = require('../utils/analytics');
      analytics.sendGACustomEvent({
        'category': 'Search',
        'action': 'Article Search',
        'label': 'Searched: ' + this.state.query
      });
      this.props.search(this.state.query);
    } else {
      this.props.destroy();
    }
  }

  _handleClick(){
  }

  render() {

    if (this.props.error) {
      return (
        <ErrorHandler
          category="Search"
          type="ERROR"
          message={this.props.errorMessage}
          error={this.props.error}
        />
      );
    }

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

    let sections = (this.props.sections || [])
    .map((section, i) => {
      return (
        <Link
          data-component='sectionResult'
          to={'/sections/' + section + '/168'}
          key={i}
          className='blockLinkStyle'
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
          to={'/topics/' + topic + '/168'}
          key={i}
          className='blockLinkStyle'
          >
          {topic}
        </Link>
      )
    });

    let sectionResults = (
      <div>
        <h2><small>Sections</small></h2>
        <div
          className='resultsStyle'>
          {sections}
        </div>
      </div>
    );

    let topicResults = (
      <div>
        <h2><small>Topics</small></h2>
        <div
          className='resultsStyle'>
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

    let homeSectionsLinks = homeSections.map((section, i) => {
      return (
        <Link
          data-component='homeSectionsLinks'
          to={'/sections/' + section + '/168'}
          key={i}
          className='homeLinkStyle'
          >
          {section}
        </Link>
      );
    });

    let homeSectionsMarkup = (
      <div className='homeSectionsMarkup'>
        {homeSectionsLinks}
      </div>
    );

    let video = (
      <iframe
        className="video"
        width="560"
        height="315"
        src="https://www.youtube.com/embed/RFcGvmFtR-s"
        frameBorder="0"
        allowFullScreen={true}>
      </iframe>
    )

    return (<div className='search-component' data-component='search'>
      <Input
        ref="searchinput"
        labelClassName='large'
        bsSize='large'
        type='search'
        placeholder="Search"
        onChange={_.debounce(this._handleSearchInput.bind(this), 400)}
        >
      </Input>
      { additionalInfo }
      { sections.length ? sectionResults : homeSectionsMarkup}
      { topics.length ? topicResults : null}
      { results.length ? articleResults : null }
      { sections.length ? null : video}
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
