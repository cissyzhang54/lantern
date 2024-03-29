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
import TopArticlesActions from '../actions/TopArticlesActions';
import TopArticlesStore from '../stores/TopArticlesStore';
import moment from 'moment';
import ConvertUnits from '../utils/convertUnits';
import * as formatAuthors from '../utils/formatAuthors';

import {getFilteredColumns, createRowMarkUp} from '../utils/tableFormatting';

import FeatureFlag from '../utils/featureFlag';

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
    let orderedTimeOnPage = data.timeOnPageTop || [];
    orderedTimeOnPage = orderedTimeOnPage.slice(0, 5);

    orderedTimeOnPage = orderedTimeOnPage.sort((a, b) => {
      return b.median_time_on_page.values['50.0'] - a.median_time_on_page.values['50.0'];
    });

    let avg_time_rows = orderedTimeOnPage.map((row) => {
      let time = ConvertUnits.secondsToMinutes(row.median_time_on_page.values['50.0']);
      time = `${time.minutes}m ${time.seconds}s`;
      return {
        uuid: row.key,
        value: time,
        author : row.author.buckets[0] ? formatAuthors.split(row) : "Unknown",
        title : row.title.buckets[0] ? row.title.buckets[0].key : "Unknown",
        date : row.initial_publish_date.buckets[0] ? row.initial_publish_date.buckets[0].key : moment()
      }
    });
    avg_time_rows = createRowMarkUp(avg_time_rows, true);

    /* Most read article */
    let topArticleViews = data.topArticleViews || [];
    topArticleViews = getFilteredColumns(topArticleViews, 'top_article_views', 'doc_count');
    topArticleViews = createRowMarkUp(topArticleViews, true);

    /* Most commented article */
    let topArticleCommented = data.topArticlesCommentPosts || [];
    topArticleCommented = topArticleCommented.filter((d) => {
      return d.posts.doc_count !== 0;
    });
    topArticleCommented = getFilteredColumns(topArticleCommented, 'posts', 'doc_count');
    topArticleCommented = createRowMarkUp(topArticleCommented, true)

    /* Top referred articles from seach engines */
    let searchReferrers = getFilteredColumns(data.topArticlesSearchRef, 'views', 'doc_count');
    searchReferrers = createRowMarkUp(searchReferrers, true)

    /* Top referred articles from social sites */
    let socialReferrers = getFilteredColumns(data.topArticlesSocialRef, 'views', 'doc_count')
    socialReferrers = createRowMarkUp(socialReferrers, true)

    /* Top articles keeping users on FT */
    let topArticlesRetention = data.topArticlesRetention || [];
    topArticlesRetention  = topArticlesRetention.map((row) => {
      let article = row.metadata.hits.hits[0]._source
      return  {
        uuid : article.article_uuid,
        value : `${Math.round(row.key * 100)}%`,
        author : article.authors ? formatAuthors.join(article.authors) : "Unknown",
        title : article.title ? article.title : "Unknown",
        date : article.initial_publish_date ? article.initial_publish_date : moment()
      }
    });
    topArticlesRetention = createRowMarkUp(topArticlesRetention)


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

    const top5TimeSpentOnPage = (
      <ChunkWrapper component="Top5TimeSpentOnPage"
        featureflag={FeatureFlag.check('highlights:timeOnPage')}
      >
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
    );

    const top5keptOnft = (
      <ChunkWrapper component="Top5KeptOnFt"
        featureflag={FeatureFlag.check('highlights:retention')}
      >
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
    );

    const top5MostCommented = (
      <ChunkWrapper component="Top5MostCommented"
        featureflag={FeatureFlag.check('highlights:commented')}
      >
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
    );

    const top5PageViews = (
      <ChunkWrapper component="Top5PageViews"
        featureflag={FeatureFlag.check('highlights:pageViews')}
      >
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
    );

    const top5SocialMedia = (
      <ChunkWrapper component="Top5FromSocialMedia"
        featureflag={FeatureFlag.check('highlights:socialMedia')}
      >
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
    );

    const top5SearchEngines = (
      <ChunkWrapper component="Top5FromSearchEngines"
        featureflag={FeatureFlag.check('highlights:searchEngines')}
      >
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
    );

    return(<DocumentTitle title={title}>
      <div>
        <ChunkWrapper component="header">
          {updating}

          <Header
            title={'The Highlights'}
            subHeading={`Stories viewed between 00:00 and 23:59 GMT on ${top5Date}`}
          />
        </ChunkWrapper>

        {top5TimeSpentOnPage}
        {top5keptOnft}
        {top5MostCommented}
        {top5PageViews}
        {top5SocialMedia}
        {top5SearchEngines}

      </div>
    </DocumentTitle>)
  }
}

export default connectToStores(TopArticlesView);
