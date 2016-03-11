import React from 'react';
import Table from './Table';
import Button from 'react-bootstrap/lib/Button';
import ChunkWrapper from './ChunkWrapper';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import d3 from 'd3';
import moment from 'moment';
import {Link} from 'react-router';
import convert from '../utils/convertUnits';
import GlyphIcon from 'react-bootstrap/lib/Glyphicon';

export default class ArticleList extends React.Component {

  constructor(props) {
    super(props);
    this.state =  {
      showAllArticles: false,
      page: 0,
      articlesPerPage: 10,
      sortIndex: 1,
      sortDirection: -1
    };
  }

  toggleAllArticles() {
    this.setState({
      showAllArticles: !this.state.showAllArticles
    });
  }

  handleSort(name, index) {
    if (this.state.sortIndex === index) {
      return this.setState({
        sortDirection: -1 * this.state.sortDirection
      });
    }
    this.setState({
      sortIndex: index,
      sortDirection : -1
    });
  }

  render() {
    const numArticles = this.props.articleList.length;
    const buttText = this.state.showAllArticles ? 'Show only 10 stories' : `Show all ${numArticles} stories`;
    const clickHandler = this.toggleAllArticles.bind(this);
    const lastArticleIndex = this.state.showAllArticles ? numArticles : 10;

    const formatter = d3.format(',n');

    const headersForSorting = [
      'title',
      'initial_publish_date',
      'page_views',
      'retention_rate',
      'time_on_page'
    ];
    // this list contains the data to sort on
    const articleList = this.props.articleList
    .sort((a, b) => {
      const propName = headersForSorting[this.state.sortIndex];
      const aval = a[propName];
      const bval = b[propName];
      if (this.state.sortDirection > 0) {
        if (aval > bval) return 1
        if (aval < bval) return -1
      } else {
        if (bval > aval) return 1
        if (bval < aval) return -1
      }
      return 0
    })
    .slice(0, lastArticleIndex).map((d, i) => {
      let linkUrl = '/articles/' + d.article_uuid;
      const publishedMoment = moment(d.initial_publish_date);
      const now = moment();
      const diff = now.diff(publishedMoment, 'hours');
      let link;
      if (diff < 24) {
        linkUrl = '/realtime' + linkUrl;
        link = <Link to={linkUrl}>{d.title}</Link>;
      } else if (diff < 48) {
        linkUrl = '/realtime' + linkUrl + '/48h';
        link = <Link to={linkUrl}>{d.title}</Link>;
      } else {
        link = <a href={linkUrl}>{d.title}</a>;
      }

      const pageViews = formatter(d.page_views);
      const retRate = Math.floor(d.retention_rate * 100) + '%';
      const timeOnPage = convert.time(d.time_on_page)[0];
      const row = [
        i+1,
        link,
        publishedMoment.format('MMM D, YYYY HH:mm'),
        pageViews,
        retRate,
        timeOnPage
      ];
      return row;
    });

    const articleListHeaders = [
      '', 'Story', 'Publish Date',
      'Page Views', 'Retention Rate',
      'Time on Page'
    ];

    const sortDirectionIndicator = (this.state.sortDirection > 0)
      ? <GlyphIcon glyph="arrow-up"/>
      : <GlyphIcon glyph="arrow-down"/>

    const sortedEl = (
      <span>
        {articleListHeaders[this.state.sortIndex+1]}
        {sortDirectionIndicator}
      </span>
    );

    const showButton = (numArticles < 10
      ? <div></div>
      : <Row>
          <Col xs={12}>
            <Button onClick={clickHandler}>
              {buttText}
            </Button>
          </Col>
        </Row>
    );

    articleListHeaders[this.state.sortIndex+1] = sortedEl;

    const sortHandler = this.handleSort.bind(this);
    return (
      <ChunkWrapper component="ArticleList">
        <Row>
          <Col xs={12}>
            <h3>Stories</h3>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Table
              rows={articleList}
              headers={articleListHeaders}
              onHeaderClick={sortHandler}
              sortable
            />
          </Col>
        </Row>
        {showButton}
      </ChunkWrapper>
    );
  }

}
