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
import TableFormatting from '../utils/tableFormatting';
import ConvertUnits from '../utils/convertUnits';

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
    let avg_time_rows = TableFormatting(data.timeOnPageTop, 'avg_time_on_page');
    avg_time_rows = avg_time_rows.map((d) => {
      let time = ConvertUnits.secondsToMinutes(d[2].value)
      time = `${time.minutes}m ${time.seconds}s`
      return [d[0], d[1], time, d[3]]
    });

    /* Most read article */
    let topArticleViews = TableFormatting(data.topArticleViews, 'top_article_views', 'doc_count');
    /* Most commented article */
    let topArticleCommented = data.topArticlesCommentPosts.filter((d) => {
      return d.posts.doc_count !== 0;
    });
    topArticleCommented = TableFormatting(topArticleCommented, 'posts', 'doc_count');

    /* Top referred articles from seach engines */
    let searchReferrers = TableFormatting(data.topArticlesSearchRef, 'views', 'doc_count');

    /* Top referred articles from social sites */
    let socialReferrers = TableFormatting(data.topArticlesSocialRef, 'views', 'doc_count');

    /* Top articles keeping users on FT */
    let topArticlesRetention = TableFormatting(data.topArticlesRetention, 'retained_users')
    .map((d) => {
      d[2] = d[2].value;
      return d;
    });

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
