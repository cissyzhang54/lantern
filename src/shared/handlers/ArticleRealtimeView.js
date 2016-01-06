import React from 'react';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import connectToStores from 'alt-utils/lib/connectToStores';
import ArticleRealtimeStore from '../stores/ArticleRealtimeStore';
import ArticleRealtimeActions from '../actions/ArticleRealtimeActions';
import LineChart from '../components/LineChart';
import PieChart from '../components/PieChart';
import Table from '../components/Table';
import ChunkWrapper from '../components/ChunkWrapper';
import LiveIndicator from '../components/LiveIndicator';
import Header from '../components/Header';
import SectionHeadlineStats from '../components/SectionHeadlineStats';
import SingleMetric from '../components/SingleMetric';
import * as formatAuthors from '../utils/formatAuthors';
import Link from 'react-router/lib/Link';
import ErrorHandler from '../components/ErrorHandler';

const maxStrLen = 60;

function getReferrerUrls (value) {
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
    this.state = {
      chartShown: 'pageViews'
    };
  }

  static getStores() {
    return [ArticleRealtimeStore]
  }

  static getPropsFromStores() {
    return ArticleRealtimeStore.getState();
  }

  componentDidMount() {
    ArticleRealtimeActions.subscribeToArticle(this.props.params.uuid);
  }

  componentWillUnmount() {
    ArticleRealtimeActions.disconnect();
  }

  render() {

    if (this.props.error) {
      return (
        <ErrorHandler
          category="Article"
          type="ERROR"
          message={this.props.errorMessage}
          error={this.props.error}
        />
      );
    }

    let realtimeNextInternalUrl = this.props.realtimeNextInternalUrl.map(getReferrerUrls);
    let linksClicked = this.props.linksClicked;
    let socialShares = this.props.socialShares;

    let headlineStats = {
      totalPageViews: {
        metricType: 'integer',
        label: 'Page Views',
        size: 'large',
        comparatorFormatName: 'totalPageViews',
        onClick: () => {
          this.setState({chartShown: 'pageViews'})
        }
      },
      timeOnPage: {
        metricType: 'time',
        label: 'Average Time on Page',
        size: 'large',
        onClick: () => {
          this.setState({chartShown: 'timeOnPage'})
        }
      },
      scrollDepth: {
        metricType: 'percentage',
        label: 'Average Scroll Depth',
        size: 'large',
        comparatorFormatName: 'scrollDepth',
        onClick: () => {
          this.setState({chartShown: 'scrollDepth'})
        }
      }
    }

    let selectedGraphComponentName;
    let selectedGraphTitle;
    let selectedGraphData;
    let selectedGraphKeys;
    let selectedGraphYLabel;

    switch (this.state.chartShown) {
      case 'pageViews':
        selectedGraphComponentName = 'realtime-pageviews';
        selectedGraphTitle = 'Real time page views';
        selectedGraphData = this.props.pageViews.map(function(d) {
          return {
            date: d[0],
            views: d[1]
          }
        });
        selectedGraphKeys = ['views'];
        selectedGraphYLabel = 'Page Views'
        break;
      case 'scrollDepth':
        selectedGraphComponentName = 'realtime-scrolldepth';
        selectedGraphTitle = 'Real time scroll depth';
        selectedGraphData =  this.props.realtimeScrollDepth.map(function(d) {
          return {
            date: d[0],
            depth: d[1]
          }
        });
        selectedGraphKeys = ['depth'];
        selectedGraphYLabel = 'Scroll Depth'
        break;
      case 'timeOnPage':
        selectedGraphComponentName = 'realtime-timeonpage';
        selectedGraphTitle = 'Real time time on page';
        selectedGraphData =  this.props.realtimeTimeOnPage.map(function(d) {
          return {
            date: d[0],
            time: d[1]
          }
        });
        selectedGraphKeys = ['time'];
        selectedGraphYLabel = 'Time On Page (seconds)'
        break;
      default:

    }

    let retentionRate = [
      ['Stayed on FT.com', this.props.retentionRate],
      ['Left FT.com', 100-this.props.retentionRate]
    ];

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

        <ChunkWrapper component={selectedGraphComponentName}>
          <Row>
            <Col>
              <h3>{selectedGraphTitle}</h3>
              <LiveIndicator isLive={this.props.isLive} />
              <LineChart
                data={selectedGraphData}
                keys={selectedGraphKeys}
                category={'date'}
                yLabel={selectedGraphYLabel}
                xLabel='Time'
                realtime
                cols={12}
              />
            </Col>
          </Row>
        </ChunkWrapper>

        <ChunkWrapper component="realtime-views">
          <Row>
            <Col
              xs={12}
              sm={6}
            >
              <h3>What is the Retention Rate?</h3>
              <PieChart
                data={retentionRate}
                keys={['value']}
                yLabel={'Percentage of Views'}
              />
            </Col>
            <Col
              xs={12}
              sm={6}
            >
              <h3>Where did users go next?</h3>
              <Table
                headers={['FT Source', 'Views']}
                rows={realtimeNextInternalUrl}
              />
            </Col>
          </Row>
        </ChunkWrapper>

        <SingleMetric
          metricType='integer'
          metric={linksClicked}
          label='Links clicked last hour'
        />

        <SingleMetric
          metricType='integer'
          metric={socialShares}
          label='Social shares last hour'
        />


      </div>
    );

  }

}

ArticleRealtimeView.defaultProps = {
  pageViews: [],
  timeOnPage: null,
  scrollDepth: null,
  livePageViews: null,
  totalPageViews: null,
  realtimeNextInternalUrl: [],
  linksClicked: null,
  socialShares: null,
  author: [],
  genre: [],
  title: "[No realtime data available]",
  topics: [],
  sections: [],
  published: "",
  published_human: "",
  errorMessage: null,
  error: null,
  loading: false,
  uuid: null,
  isLive: false
};

export default connectToStores(ArticleRealtimeView);
