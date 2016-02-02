import React from 'react';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import DocumentTitle from 'react-document-title';
import connectToStores from 'alt-utils/lib/connectToStores';
import ArticleRealtimeStore from '../stores/ArticleRealtimeStore';
import ArticleRealtimeActions from '../actions/ArticleRealtimeActions';
import LineChart from '../components/LineChart';
import Table from '../components/Table';
import ChunkWrapper from '../components/ChunkWrapper';
import LiveIndicator from '../components/LiveIndicator';
import Header from '../components/Header';
import SectionHeadlineStats from '../components/SectionHeadlineStats';
import SingleMetric from '../components/SingleMetric';
import * as formatAuthors from '../utils/formatAuthors';
import Link from 'react-router/lib/Link';
import ErrorHandler from '../components/ErrorHandler';
import FormatData from "../utils/formatData";
import BarChart from '../components/BarChart.js';
import ColumnChart from '../components/ColumnChart.js'
import Url from 'url';
import MetricList from '../components/MetricList'
import TabNav from '../components/TabNav';
import Text from '../components/Text';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Popover from 'react-bootstrap/lib/Popover';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';

const maxStrLen = 60;

const styles = {
  infoIcon : {
    'fontSize' : '15px',
    'color': '#039',
    cursor:'pointer'
  }
}

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

function getLinksForReferrerUrls(data) {
  const maxLen = 60;

  var parsed = Url.parse(data[0]);
  let displayString = data[0].length > maxLen ? data[0].substr(0, maxLen) + '…' : data[0];

  if (!/ft.com/.test(parsed.hostname)) {
    displayString = displayString.split('?')[0];
  }

  let title = data[2];
  if (!title || (title === 'Unknown')) title = displayString;
  let url = displayString.indexOf('http') < 0 ? displayString : (
    <a
      target="_blank"
      href={data[0]}
    >
      {(title !== 'Unknown') ? title : displayString}
    </a>
  );
  return {
    'referrer': url,
    'Views': data[1]
  }
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
    const timespan = this.props.params.timespan || '1h';
    ArticleRealtimeActions.subscribeToArticle({
      uuid: this.props.params.uuid,
      timespan: timespan
    });
  }

  componentWillReceiveProps(nextProps) {
     if (this.props.params.timespan !== nextProps.params.timespan) {
       ArticleRealtimeActions.subscribeToArticle({
         timespan: nextProps.params.timespan || '1h',
         uuid: this.props.uuid,
         previousArticle: {
           timespan: this.props.timespan,
           uuid: this.props.uuid
         }
       });
     }
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

    let title = (this.props.title) ? 'Lantern - ' + this.props.title : '';
    let realtimeNextInternalUrl = this.props.realtimeNextInternalUrl.map(getReferrerUrls);
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
      retentionRate: {
        metricType: 'percentage',
        label: 'Retention Rate',
        size: 'large',
        onClick: () => {
          this.setState({chartShown: 'retentionRate'})
        }
      },
      scrollDepth: {
        metricType: 'percentage',
        label: 'Average Scroll Depth',
        size: 'large',
        comparatorFormatName: 'scrollDepth',
        onClick: () => {
          this.setState({chartShown: 'scrollDepth'})
        },
        toolTip: (<Text message='explanations.articleHandlers.scrollDepth' />)
      }
    }

    let selectedGraphComponentName;
    let selectedGraphTitle;
    let selectedGraphData;
    let selectedGraphKeys;
    let selectedGraphYLabel;
    let selectedGraphToolTipMessage;
    let timespan48h = this.props.timespan === '48h';

    switch (this.state.chartShown) {
      case 'pageViews':
        selectedGraphComponentName = 'realtime-pageviews';
        selectedGraphTitle = 'Real time page views';
        selectedGraphToolTipMessage = timespan48h ? 'explanations.pageViewsChart.realtime48h' : 'explanations.pageViewsChart.realtime1h';
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
        selectedGraphToolTipMessage = timespan48h ? 'explanations.scrollDepthChart.realtime48h' : 'explanations.scrollDepthChart.realtime1h';
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
        selectedGraphToolTipMessage = timespan48h ? 'explanations.timeOnPageChart.realtime48h' : 'explanations.timeOnPageChart.realtime1h';
        selectedGraphData =  this.props.realtimeTimeOnPage.map(function(d) {
          return {
            date: d[0],
            time: d[1]
          }
        });
        selectedGraphKeys = ['time'];
        selectedGraphYLabel = 'Time On Page (seconds)'
        break;
      case 'retentionRate':
        selectedGraphComponentName = 'realtime-retentionRate';
        selectedGraphTitle = 'Real time retention on page';
        selectedGraphToolTipMessage = timespan48h ? 'explanations.retentionRateChart.realtime48h' : 'explanations.retentionRateChart.realtime1h';
        selectedGraphData =  this.props.realtimeRetention.map(function(d) {
          return {
            date: d[0],
            views: d[1]
          }
        });
        selectedGraphKeys = ['views'];
        selectedGraphYLabel = 'Retained Users'
        break;
      default:

    }

    /* User Journey Section */
    let formatterData = this.props
    let dataFormatter = new FormatData(formatterData , null);

    let [refData, refID, refKeys] = dataFormatter.getPCTMetric('internalReferrerLastHourTypes', 'Article')
    let [extRefData, extRefID, extRefKeys] = dataFormatter.getPCTMetric('externalReferrerLastHourTypes', 'Article')

    let internalReferrerLastHourUrls = this.props.internalReferrerLastHourUrls.map(getLinksForReferrerUrls);
    let externalReferrerLastHourUrls = this.props.externalReferrerLastHourUrls.map(getLinksForReferrerUrls);



    /* Interaction Section */
    // Links Clicked
    let linksClickedByCategory = this.props.realtimeLinksClickedByCategory;

    let linksClicked = linksClickedByCategory.reduce((prev, curr) => {
      return prev + curr[1];
    }, 0);

    linksClickedByCategory.unshift(['Total links clicked', linksClicked])

    let linksClickedCategoryList = linksClickedByCategory.map((row, index) => {
      return {
        term:  row[0],
        value: row[1],
        header: (index === 0)
      };
    });

    //Comments
    let comments = this.props.comments;
    let commentsReadLastHour = this.props.commentsReadLastHour;
    let commentsTotal = comments + commentsReadLastHour;
    let commentsList = [
      {term: 'Total comments', value: commentsTotal, header: true},
      {term: 'Comments viewed', toolTip: (<p><Text message='explanations.sectionInteract.commentsViewed'/></p>), value: commentsReadLastHour, header: false},
      {term: 'Comments posted', value: comments, header: false}
    ]


    /* Social Media Section */
    let socialMedia = this.props.socialReferrersLastHour;
    let socialMediaTotal = socialMedia.reduce((prev, curr) => {
      return prev + curr[1];
    }, 0);
    let socialMediaChartData = socialMedia.map((d) => {
      return {
        network: d[0],
        'referrals %': (d[1] / socialMediaTotal * 100) | 0,
        referrals: d[1]
      };
    });


    /* Who are the users */
    let [userTypeData, userTypeID, userTypeKeys] = dataFormatter.getPCTMetric('userTypesLastHour', 'Article')
    let timespan = this.props.timespan || "";

    return (
      <DocumentTitle title={title}>
      <div>

        <TabNav
          analyticsView={this.props.route.analyticsView + timespan}
          publishDate={this.props.published}
          uuid={this.props.uuid}
          />

        <ChunkWrapper component="header">
          <Header
            title={this.props.title}
            linkURL={'http://www.ft.com/cms/s/0/' + this.props.uuid + '.html'}
            author={'By: ' + formatAuthors.join(this.props.author)}
            published={'First Published: ' + this.props.published_human}
            uuid={this.props.uuid}
          />
        </ChunkWrapper>

        <SectionHeadlineStats
          data={this.props}
          comparatorData={{}}
          config={headlineStats}
        />

        <ChunkWrapper component={selectedGraphComponentName}>
          <Row>
            <Col>
              <h3>
                <OverlayTrigger
                  trigger="click"
                  placement="bottom"
                  overlay={
                    <Popover id="chart-description">
                     <p><Text message={selectedGraphToolTipMessage} /></p>
                    </Popover>
                    }
                  >
                  <span>
                     <Glyphicon
                     glyph="question-sign"
                     style={styles.infoIcon}
                     aria-describedby="chart-description"
                     />
                  </span>
                </OverlayTrigger>
                <span > {selectedGraphTitle}</span>
              </h3>
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
            <Col>
              <h3>Where did users go next?</h3>
              <Table
                headers={['FT Source', 'Views']}
                rows={realtimeNextInternalUrl}
              />
            </Col>
          </Row>
        </ChunkWrapper>


        <ChunkWrapper component="traffic-sources">
          <Row>
            <Col
              xs={12}
              sm={6}
            >
              <h3>External Sources</h3>
            </Col>
          </Row>
          <Row>
            <Col
              xs={12}
              sm={6}
            >
              <h4>Traffic Source</h4>
              <BarChart
                data={extRefData}
                keys={extRefKeys}
                category={extRefID}
                yLabel="Page Views"
                xLabel="Traffic Source"
                usePercentages
              />
            </Col>
            <Col
              xs={12}
              sm={6}
            >
              <Table
                headers={['Top 5 traffic sources', 'Views']}
                rows={externalReferrerLastHourUrls}
              />
            </Col>
          </Row>
          <Row>
            <Col
              xs={12}
              sm={6}
            >
              <h3>Internal Sources</h3>
            </Col>
          </Row>
          <Row>
            <Col
              xs={12}
              sm={6}
            >
              <h4>FT Traffic Sources</h4>
              <BarChart
                data={refData}
                keys={refKeys}
                category={refID}
                yLabel="Page Views"
                xLabel="Traffic Source"
                usePercentages
              />
            </Col>
            <Col
              xs={12}
              sm={6}
            >
              <Table
                headers={['Top 5 traffic sources', 'Views']}
                rows={internalReferrerLastHourUrls}
                />
            </Col>
          </Row>
        </ChunkWrapper>

        <ChunkWrapper component="user-interact">
          <h3>How did the user interact?</h3>
          <Row>
            <Col
              xs={12}
              sm={6}
            >
              <MetricList
                items={linksClickedCategoryList}
              />
            </Col>

            <Col
              xs={12}
              sm={6}
              >
              <MetricList
                items={commentsList}
                />
            </Col>

          </Row>
        </ChunkWrapper>

        <ChunkWrapper component="social-media">
          <Row>
            <Col>
              <h3>How did the article perform on social media?</h3>
            </Col>
          </Row>
          <Row>
            <Col
              xs={12}
              sm={6}
            >
              <BarChart
                data={socialMediaChartData}
                keys={['referrals']}
                category={'network'}
                yLabel="Traffic from Social"
                xLabel="Social Network"
                usePercentages
              />
            </Col>
            <Col
              xs={12}
              sm={6}
            >
              <Table
                headers={['Total traffic from social', socialMediaTotal]}
                rows={socialMedia}
              />
            </Col>
          </Row>
        </ChunkWrapper>


        <ChunkWrapper component="user-type">
          <Row>
            <Col>
              <h3>Who are the users?</h3>
            </Col>
          </Row>
          <Row>
            <Col
              xs={12}
              sm={6}
              >
              <ColumnChart
                data={userTypeData}
                keys={userTypeKeys}
                category={userTypeID}
                yLabel="Page Views"
                xLabel="User Type"
                usePercentages
                />
            </Col>
          </Row>
        </ChunkWrapper>


        <SingleMetric
          metricType='integer'
          metric={socialShares}
          label='Social shares last hour'
        />

      </div>
      </DocumentTitle>
    );

  }
}

ArticleRealtimeView.defaultProps = {
  pageViews: [],
  timeOnPage: null,
  scrollDepth: null,
  totalPageViews: null,
  realtimeNextInternalUrl: [],
  linksClicked: null,
  socialShares: null,
  comments: null,
  commentsReadLastHour: null,
  userTypesLastHour: [],
  externalReferrerLastHourTypes: [],
  internalReferrerLastHourTypes : [],
  realtimeLinksClickedByCategory: null,
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
  isLive: false,
  timespan: '1h'
};

export default connectToStores(ArticleRealtimeView);
