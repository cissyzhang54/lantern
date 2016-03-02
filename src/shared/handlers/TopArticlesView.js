import React from 'react';
import DocumentTitle from 'react-document-title';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import connectToStores from 'alt-utils/lib/connectToStores';
import Header from '../components/Header';
import Messaging from '../components/Messaging';
import ErrorHandler from '../components/ErrorHandler';
import ChunkWrapper from "../components/ChunkWrapper";
import Table from '../components/Table.js';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import TopArticlesActions from '../actions/TopArticlesActions';
import TopArticlesStore from '../stores/TopArticlesStore';
import _ from 'underscore';
import moment from 'moment';


const tagStyle = {
  fontSize: '15px',
  marginLeft: '8px'
}

function decode(uri){
  return uri ? decodeURI(uri) : null
}

function convertTime (avg) {
  let seconds = Math.abs(avg)
  let metricMinutes = Math.floor(seconds / 60);
  let metricSeconds = Math.floor(seconds - metricMinutes * 60);
  return `${metricMinutes}m ${metricSeconds}s`
}

function getAuthors (authors) {
  return authors.author.buckets.map((d,i) => {
      return d.key;
    }).join(", ") || 'Unknown author';
}

function getColumns (data, metric) {
  return data.map((d, i) => {
    let uuid = d.key;
    let metricVal = d[metric];
    let title =  d.title.buckets[0] ? d.title.buckets[0].key : "Unknown"
    let author = getAuthors(d);
    let articleUrl = (
      <a href={`/landing/article/${uuid}`}
         target="_blank"
      >
        {title}
      </a>
    );
    let ftUrl = (
      <a href={`http://www.ft.com/cms/s/${uuid}.html`}
         target="_blank"
      >
        FT
        <Glyphicon glyph="new-window"
                   style={tagStyle}
        />
      </a>
    );

    return [
      articleUrl, author, metricVal, ftUrl
    ];
  });
}

class TopArticlesView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  static getStores() {
    return [TopArticlesStore];
  }

  static getPropsFromStores() {
    return TopArticlesStore.getState();
  }

  componentWillMount() {
    TopArticlesActions.fetch();
  }

  componentDidMount() {
    let analytics = require('../utils/analytics');
    analytics.sendGAPageViewEvent();
    analytics.trackScroll();
  }

  render() {
    let data = this.props.data;
    let title = (data) ? 'Lantern - The Highlights' : '';
    let top5Date = moment(this.props.dateTo).format('dddd MMMM Do YYYY');

    if (this.props.errorMessage) {
      return (
        <ErrorHandler
          category="The Highlights"
          type="ERROR"
          message={this.props.errorMessage}
          error={this.props.error}
        />
      );
    } else if (!data || Object.keys(data).length === 0) {
      return (
        <Messaging
          category="The Highlights"
          type="LOADING"
        />
      );
    }

    /* Average time reading the article */
    let avg_time_rows = getColumns(data.timeOnPageTop, 'avg_time_on_page');
    avg_time_rows = avg_time_rows.map((d, i) => {
      let time = convertTime(d[2].value)
      return [d[0], d[1], time, d[3]]
    });

    /* Most read article */
    let topArticleViews = getColumns(data.topArticleViews, 'doc_count');

    /* Most commented article */
    let topArticleCommented = data.topArticlesCommentPosts.filter((d,i) => {
      return d.posts.doc_count !== 0;
    }).map((d, i) => {
      return {
        key : d.key,
        author: d.posts.author,
        doc_count: d.posts.doc_count,
        title: d.posts.title
      }
    });
    topArticleCommented = getColumns(topArticleCommented, 'doc_count');

    /* Top referred articles from seach engines */
    let searchReferrers = data.topArticlesSearchRef.map((d, i) => {
      return {
        key : d.key,
        author: d.views.author,
        doc_count: d.views.doc_count,
        title: d.views.title
      }
    });
    searchReferrers = getColumns(searchReferrers, 'doc_count');

    /* Top referred articles from social sites */
    let socialReferrers = data.topArticlesSocialRef.map((d, i) => {
      return {
        key : d.key,
        author: d.views.author,
        doc_count: d.views.doc_count,
        title: d.views.title
      }
    });

    socialReferrers = getColumns(socialReferrers, 'doc_count');

    /* Top articles keeping users on FT */
    let topArticlesRetention = getColumns(data.topArticlesRetention, 'doc_count');

    let updating
    if (this.props.loading) {
      updating = (
        <Messaging
          category="The Highlights"
          type="UPDATING"
        />
      );
    }
    else {
      updating = (
        <Messaging
          category="Section"
          type="PLACEHOLDER"
        />
      );
    }

    return(<DocumentTitle title={title}>
      <div>
        <ChunkWrapper component="header">
          {updating}

          <Header
            title={'The Highlights'}
            subHeading={`Stories viewed between 00:00 and 23:59 GMT on ${top5Date}`}
          />
        </ChunkWrapper>

        <ChunkWrapper component="Top5TimeSpentOnPage">
          <Row>
            <Col xs={12}>
              <h3>Top 5 - Time spent on page</h3>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Table
                headers={['Article', 'Author(s)', 'Time', '']}
                rows={avg_time_rows}
              />
            </Col>
          </Row>
        </ChunkWrapper>

        <ChunkWrapper component="Top5KeptOnFt">
          <Row>
            <Col xs={12}>
              <h3>Top 5 - Articles that kept readers on FT.com</h3>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Table
                headers={['Article', 'Author(s)', 'Users retained', '']}
                rows={topArticlesRetention}
              />
            </Col>
          </Row>
        </ChunkWrapper>

        <ChunkWrapper component="Top5MostCommented">
          <Row>
            <Col xs={12}>
              <h3>Top 5 - Most commented</h3>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Table
                headers={['Article', 'Author(s)', 'Comments', '']}
                rows={topArticleCommented}
              />
            </Col>
          </Row>
        </ChunkWrapper>

        <ChunkWrapper component="Top5PageViews">
          <Row>
            <Col xs={12}>
              <h3>Top 5 - Number of page views</h3>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Table
                headers={['Article', 'Author(s)', 'Views', '']}
                rows={topArticleViews}
              />
            </Col>
          </Row>
        </ChunkWrapper>

        <ChunkWrapper component="Top5FromSocialMedia">
          <Row>
            <Col xs={12}>
              <h3>Top 5 - Traffic from social media</h3>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Table
                headers={['Article', 'Author(s)', 'Views', '']}
                rows={socialReferrers}
              />
            </Col>
          </Row>
        </ChunkWrapper>

        <ChunkWrapper component="Top5FromSearchEngines">
          <Row>
            <Col xs={12}>
              <h3>Top 5 - Traffic from search engines</h3>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Table
                headers={['Article', 'Author(s)', 'Views', '']}
                rows={searchReferrers}
              />
            </Col>
          </Row>
        </ChunkWrapper>
      </div>
    </DocumentTitle>)
  }
}

export default connectToStores(TopArticlesView);
