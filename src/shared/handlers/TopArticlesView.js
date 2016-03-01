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
import moment from 'moment';


const tagStyle = {
  fontSize: '15px',
  marginLeft: '8px'
}

function convertTime (avg) {
  let seconds = Math.abs(avg)
  let metricMinutes = Math.floor(seconds / 60);
  let metricSeconds = Math.floor(seconds - metricMinutes * 60);
  return `${metricMinutes}m ${metricSeconds}s`
}

function getAuthors (authors) {
  return authors.author.buckets.map((d) => {
    return d.key;
  }).join(", ") || 'Unknown author';
}

function getFilteredColumns(data, filterName, metric) {
  if (!metric) metric = filterName;
  const flattenedData = data.map((d) => {
    const obj = d[filterName];
    obj.key = d.key;
    if (metric != 'doc_count')
      obj.doc_count = d.doc_count;
    return obj;
  });

  return getColumns(flattenedData, metric);
}

function getColumns (data, metric) {
  return data.map((d) => {
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
    let title = (data) ? 'Lantern - Top Articles' : '';
    let top5Date = moment(this.props.dateTo).format('dddd MMMM Do YYYY');

    if (this.props.errorMessage) {
      return (
        <ErrorHandler
          category="Pick of the day"
          type="ERROR"
          message={this.props.errorMessage}
          error={this.props.error}
        />
      );
    } else if (!data || Object.keys(data).length === 0) {
      return (
        <Messaging
          category="Pick of the day"
          type="LOADING"
        />
      );
    }

    /* Average time reading the article */
    let avg_time_rows = getFilteredColumns(data.timeOnPageTop, 'avg_time_on_page');
    avg_time_rows = avg_time_rows.map((d) => {
      let time = convertTime(d[2].value)
      return [d[0], d[1], time, d[3]]
    });

    /* Most read article */
    let topArticleViews = getFilteredColumns(data.topArticleViews, 'top_article_views', 'doc_count');
    /* Most commented article */
    let topArticleCommented = data.topArticlesCommentPosts.filter((d) => {
      return d.posts.doc_count !== 0;
    });
    topArticleCommented = getFilteredColumns(topArticleCommented, 'posts', 'doc_count');

    /* Top referred articles from seach engines */
    let searchReferrers = getFilteredColumns(data.topArticlesSearchRef, 'views', 'doc_count');

    /* Top referred articles from social sites */
    let socialReferrers = getFilteredColumns(data.topArticlesSocialRef, 'views', 'doc_count');

    /* Top articles keeping users on FT */
    let topArticlesRetention = getFilteredColumns(data.topArticlesRetention, 'retained_users')
    .map((d) => {
      d[2] = d[2].value;
      return d;
    });

    let updating
    if (this.props.loading) {
      updating = (
        <Messaging
          category="Pick of the day"
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
            title={'Pick of the day'}
            subHeading={`Articles first published between 00:00 and 23:59 GMT on ${top5Date}`}
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
