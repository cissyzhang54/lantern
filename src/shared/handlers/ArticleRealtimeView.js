import React from 'react';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import connectToStores from 'alt/utils/connectToStores';
import ArticleRealtimeStore from '../stores/ArticleRealtimeStore';
import ArticleRealtimeActions from '../actions/ArticleRealtimeActions';
import LineChart from '../components/LineChart';
import Table from '../components/Table';
import ChunkWrapper from '../components/ChunkWrapper';
import LiveIndicator from '../components/LiveIndicator';
import Header from '../components/Header';
import SectionHeadlineStats from '../components/SectionHeadlineStats';
import * as formatAuthors from '../utils/formatAuthors';
import moment from 'moment';
import Link from 'react-router/lib/Link';

const maxStrLen = 60;

function getReferrerUrls (value, i) {
  let urlObject = value.top_tag_hits.hits.hits[0]._source;
  let count = value.doc_count;
  let title = urlObject.title_not_analyzed;
  title = title.length > maxStrLen ? title.substr(0, maxStrLen) + '…' : title;

  let uuid = urlObject.article_uuid;

  let link
  if(urlObject.page_type === 'article'){
    link = <a href={`http://www.ft.com/cms/s/${uuid}.html`}>{title}</a>;
  } else {
    link = <a href={uuid}>{title}</a>;
  }

  return {
    link: link,
    count: count
  };
}

class ArticleRealtimeView extends React.Component {
  constructor(props) {
    super(props);
  }

  static getStores() {
    return [ArticleRealtimeStore]
  }

  static getPropsFromStores() {
    return ArticleRealtimeStore.getState();
  }

  componentDidMount() {
    const uuid = this.props.params.uuid;
    const isSameArticle = uuid === this.props.uuid;
    // get the last timestamp to see if the data is old
    const lastUpdated = this.props.pageViews.length ? this.props.pageViews.slice(-1)[0][0] : null;
    const timeDiffSinceLastUpdate = moment.utc().diff(moment(lastUpdated));
    const isFresh = timeDiffSinceLastUpdate < 60000;
    if (!isSameArticle || !isFresh) {
      ArticleRealtimeStore.loadArticleRealtimeData({uuid : uuid});
    }
    ArticleRealtimeActions.connect();
    ArticleRealtimeActions.subscribeToArticle(uuid);
  }

  componentWillUnmount() {
    ArticleRealtimeActions.disconnect();
  }

  render() {
    let pageViews = this.props.pageViews.map(function(d) {
      return {
        date: d[0],
        views: d[1]
      }
    })

    let realtimeNextInternalUrl = this.props.realtimeNextInternalUrl.map(getReferrerUrls);

    let headlineStats = {
      timeOnPage: {
        metricType: 'time',
        label: 'Time on Page',
        size: 'large'
      },
      livePageViews: {
        metricType: 'integer',
        label: 'Current Readers',
        size: 'large'
      },
      scrollDepth: {
        metricType: 'percentage',
        label: 'Scroll Depth',
        size: 'large',
        comparatorFormatName: 'scrollDepth'
      },
      totalPageViews: {
        metricType: 'integer',
        label: 'Total Page Views',
        size: 'large',
        comparatorFormatName: 'totalPageViews'
      }
    }

    return (
      <div>

        <Row>
          <ChunkWrapper component="link">
            <Link
              to={'/articles/' + this.props.uuid}
              >
              Historical view
            </Link>
          </ChunkWrapper>
        </Row>

        <ChunkWrapper component="header">
          <Header
            title={this.props.title}
            linkURL={'http://www.ft.com/cms/s/0/' + this.props.uuid + '.html'}
            author={'By: ' + formatAuthors.join(this.props.author)}
            published={'First Published: ' + this.props.published_human}
            uuid={this.props.uuid}
            />
        </ChunkWrapper>

        <ChunkWrapper component="headlineStats">
          <SectionHeadlineStats
            data={this.props}
            comparatorData={{}}
            config={headlineStats}
            />
        </ChunkWrapper>


        <ChunkWrapper component="realtime-views">
          <Row>
            <Col>
              <h3>Real time views</h3>
              <LiveIndicator isLive={this.props.isLive} />
              <LineChart
                data={pageViews}
                keys={['views']}
                category={'date'}
                yLabel='Page Views'
                xLabel='Time'
                realtime={true}
                cols={12}
                />
            </Col>
          </Row>
        </ChunkWrapper>

        <ChunkWrapper component="realtime-views">
          <Row>
            <Col xs={12} sm={6}>
              <h3>Where did users go next?</h3>
              <Table
                headers={['FT Source', 'Views']}
                rows={realtimeNextInternalUrl}
                />
            </Col>
            <Col xs={12} sm={6}></Col>
          </Row>
        </ChunkWrapper>
      </div>
    );

  }

}

export default connectToStores(ArticleRealtimeView);
