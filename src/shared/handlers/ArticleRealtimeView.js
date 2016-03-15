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
import * as formatAuthors from '../utils/formatAuthors';
import ErrorHandler from '../components/ErrorHandler';
import FormatData from "../utils/formatData";
import BarChart from '../components/BarChart.js';
import PieChart from "../components/PieChart";
import ColumnChart from '../components/ColumnChart.js';
import Url from 'url';
import MetricList from '../components/MetricList';
import TabNav from '../components/TabNav';
import Text from '../components/Text';
import TimespanSelector from '../components/TimespanSelector';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Popover from 'react-bootstrap/lib/Popover';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import ToolTip from '../components/ToolTip';
import FeatureFlag from '../utils/featureFlag';

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
    let analytics = require('../utils/analytics');
    analytics.sendGAPageViewEvent();
    analytics.trackScroll();
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
    let realtimeNextInternalUrl = this.props.nextInternalUrl.map(getReferrerUrls);

    let headlineStats = {
      timeOnPageAvg: {
        name: 'timeOnPage',
        metricType: 'time',
        label: 'Average Time on Page',
        size: 'large',
        handler : {
          onClick: () => {
            this.setState({chartShown: 'timeOnPage'})
          },
          currentMetric: this.state.chartShown
        }
      },
      totalPageViews: {
        name: 'pageViews',
        metricType: 'integer',
        label: 'Page Views',
        size: 'large',
        comparatorFormatName: 'totalPageViews',
        handler : {
          onClick: () => {
            this.setState({chartShown: 'pageViews'})
          },
          currentMetric: this.state.chartShown
        }
      },
      retentionRate: {
        name: 'retentionRate',
        metricType: 'percentage',
        label: 'Retention Rate',
        size: 'large',
        handler : {
          onClick: () => {
            this.setState({chartShown: 'retentionRate'})
          },
          currentMetric: this.state.chartShown
        },
        toolTip: (<Text message='explanations.articleHandlers.retentionRate' />)
      },
      scrollDepthAvg: {
        name: 'scrollDepth',
        metricType: 'percentage',
        label: 'Average Scroll Depth',
        size: 'large',
        comparatorFormatName: 'scrollDepth',
        handler : {
          onClick: () => {
            this.setState({chartShown: 'scrollDepth'})
          },
          currentMetric: this.state.chartShown
        },
        toolTip: (<Text message='explanations.articleHandlers.scrollDepth' />)
      }
    }

    let lastPublishDate = this.props.lastPublishDate;
    lastPublishDate.sort(function(a,b) {
      return a.key - b.key
    });

    let publishedDates = lastPublishDate.slice().map((d, i) => {
      return {
        value: d.key_as_string,
        text: (i) ? 'Republished' : 'Published'
      }
    })

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
        selectedGraphTitle = 'Page views';
        selectedGraphToolTipMessage = timespan48h ? 'explanations.pageViewsChart.realtime48h' : 'explanations.pageViewsChart.realtime1h';
        selectedGraphData = this.props.pageViews.map((d) => {
          if (d[0] < this.props.published) {
            return {
              date: d[0],
              views: null
            }
          }
          return {
            date: d[0],
            views: d[1]
          }
        });
        selectedGraphKeys = ['Page views'];
        selectedGraphYLabel = 'Page Views'
        break;
      case 'scrollDepth':
        selectedGraphComponentName = 'realtime-scrolldepth';
        selectedGraphTitle = 'Scroll depth';
        selectedGraphToolTipMessage = timespan48h ? 'explanations.scrollDepthChart.realtime48h' : 'explanations.scrollDepthChart.realtime1h';
        selectedGraphData =  this.props.scrollDepth.map((d) => {
          if (!d.scroll_depth_avg.value) {
            return {
              date: d.key_as_string,
              depth: 0
            }
          }
          return {
            date : d.key_as_string,
            depth: d.scroll_depth_avg.value
          };
        });
        selectedGraphKeys = ['Average scroll depth'];
        selectedGraphYLabel = 'Scroll Depth (%)'
        break;
      case 'timeOnPage':
        selectedGraphComponentName = 'realtime-timeonpage';
        selectedGraphTitle = 'Time on page';
        selectedGraphToolTipMessage = timespan48h ? 'explanations.timeOnPageChart.realtime48h' : 'explanations.timeOnPageChart.realtime1h';
        selectedGraphData =  this.props.timeOnPage.map((d) => {
          let timestamp = d.key_as_string;
          let value = d.time_on_page_avg.values['50.0'];

          if (timestamp < this.props.published) {
            return {
              date: timestamp,
              time: null
            }
          }

          return {
            date: timestamp,
            time: (value === 'NaN') ? 0 : value
          }
        });
        selectedGraphKeys = ['Average time on page'];
        selectedGraphYLabel = 'Time On Page (seconds)'
        break;
      case 'retentionRate':
        selectedGraphComponentName = 'realtime-retentionRate';
        selectedGraphTitle = 'Retention rate';
        selectedGraphToolTipMessage = timespan48h ? 'explanations.retentionRateChart.realtime48h' : 'explanations.retentionRateChart.realtime1h';
        selectedGraphData =  this.props.retention.map((d) => {
          if (d[0] < this.props.published || d[0] > this.props.latestEvent) {
            return {
              date: d[0],
              retention: null
            }
          }
          return {
            date: d[0],
            retention: d[1]
          }
        });
        selectedGraphKeys = ['Retention'];
        selectedGraphYLabel = 'Retained Users'
        break;
      default:

    }

    /* User Journey Section */
    // Bar Chart Data
    let formatterData = this.props
    let dataFormatter = new FormatData(formatterData , null);
    let [extRefData, extRefID, extRefKeys] = dataFormatter.getPCTMetric('internalExternalReferrers', 'Referrals');
    extRefData.sort(function(a,b) {
      return b.Referrals - a.Referrals
    });

    // Table Data
    let internalReferrerUrls = this.props.internalReferrerUrls.map(getLinksForReferrerUrls);
    let externalReferrerUrls = this.props.externalReferrerUrls.map(getLinksForReferrerUrls);

    // Pie Chart Data
    let externalRefTotal = this.props.externalReferrerTypes.reduce((a, b) => { return a + b[1]; }, 0);
    let referrerTotalsData = [['internal', this.props.internalReferrerTotal], ['external', externalRefTotal]]



    /* Interaction Section */
    // Links Clicked
    let linksClickedByCategory = this.props.linksClickedByCategory.slice();

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
    let commentsList = [
      {term: 'Total comments posted', value: comments, header: true}, {}
    ]


    /* Social Media Section */
    let socialMedia = this.props.socialReferrers;
    let socialMediaTotal = socialMedia.reduce((prev, curr) => {
      return prev + curr[1];
    }, 0);
    let socialMediaChartData = socialMedia.map((d) => {
      return {
        network: d[0],
        'Social Media Referrals %': (d[1] / socialMediaTotal * 100) | 0,
        'Social Media Referrals': d[1]
      };
    });

    /* Who are the users */
    let [userTypeData, userTypeID, userTypeKeys] = dataFormatter.getPCTMetric('userTypes', 'Page Views')
    let timespan = this.props.timespan || "";

    let queryLinkProps = {
      type: 'realtimeArticle',
      timespan: this.props.timespan,
      uuid: this.props.uuid
    };

    const userInteract = (
      <ChunkWrapper component="user-interact"
        featureflag={FeatureFlag.check('articleLive:interact')}
      >
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
    );

    const socialMediaChunk = (
      <ChunkWrapper component="social-media"
        featureflag={FeatureFlag.check('articleLive:socialMedia')}
      >
        <Row>
          <Col>
            <h3>How did the story perform on social media?</h3>
          </Col>
        </Row>
        <Row>
          <Col
            xs={12}
            sm={6}
          >
            <BarChart
              realtime
              data={socialMediaChartData}
              keys={['Social Media Referrals']}
              category={'network'}
              yLabel="Traffic from Social"
              xLabel="Social Network"
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
    );

    const trafficSources = (
      <ChunkWrapper component="traffic-sources"
        featureflag={FeatureFlag.check('articleLive:trafficSources')}
      >
        <Row>
          <Col xs={12}>
            <h3>How was the user referred to the story?</h3>
          </Col>
        </Row>
        <Row>
          <Col
            xs={12}
            sm={6}
          >
            <h4>Internal vs External</h4>
            <PieChart
              realtime
              data={referrerTotalsData}
              keys={['referrers']}
            />
          </Col>
          <Col
            xs={12}
            sm={6}
          >
            <h4>
              <ToolTip
                type="html"
                message='explanations.sectionJourney.articleViews.referrers'
                id={'referrers-desc'}
              />
              Referrers
            </h4>
            <BarChart
              realtime
              data={extRefData}
              keys={extRefKeys}
              category={extRefID}
              yLabel="Page Views"
              xLabel="Referrer"
              usePercentages
            />
          </Col>
        </Row>
        <Row style={{marginTop:"10px"}}>
          <Col
            xs={12}
            sm={6}
          >
            <h4>Top 5 Internal sources</h4>
            <Table
              headers={['FT Source', 'Views']}
              rows={internalReferrerUrls}
            />
          </Col>
          <Col
            xs={12}
            sm={6}
          >
            <h4>Top 5 External sources</h4>
            <Table
              headers={['Traffic Source', 'Views']}
              rows={externalReferrerUrls}
            />
          </Col>
        </Row>
      </ChunkWrapper>
    );

    const realtimeNext = (
      <ChunkWrapper component="realtime-next-internal"
        featureflag={FeatureFlag.check('articleLive:realtimeNext')}
      >
        <Row>
          <Col>
            <h3>Of those who stayed, where did they go?</h3>
            <Table
              headers={['FT Source', 'Views']}
              rows={realtimeNextInternalUrl}
            />
          </Col>
        </Row>
      </ChunkWrapper>
    );

    const userType = (
      <ChunkWrapper component="user-type"
        featureflag={FeatureFlag.check('articleLive:userType')}
      >
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
            />
          </Col>
        </Row>
      </ChunkWrapper>
    );

    return (
      <DocumentTitle title={title}>
        <div>
          <ChunkWrapper
            component="modifier"
            noBorder
          >
            <Header
              title={this.props.title}
              linkURL={'http://www.ft.com/cms/s/0/' + this.props.uuid + '.html'}
              author={'By: ' + formatAuthors.join(this.props.author)}
              published={'First Published: ' + this.props.published_human}
              uuid={this.props.uuid}
            />
          </ChunkWrapper>

          <TabNav
            analyticsView={this.props.route.analyticsView + timespan}
            publishDate={this.props.published}
            uuid={this.props.uuid}
          />

          <ChunkWrapper component="modifier">
            <Row>
              <Col sm={2}
                xs={12}
              >
                <span style={{lineHeight: "1.5em"}}>Timespan:</span>
              </Col>
              <Col sm={10}
                xs={12}
              >
                <TimespanSelector
                  current={this.props.timespan}
                  options={[
                  {label: 'Last hour', value: '1h'},
                  {label: 'Last 6 hours', value: '6h'},
                  {label: 'Last 24 hours', value: '24h'},
                  {label: 'Last 48 hours', value: '48h'}
                 ]}
                  query={queryLinkProps}
                />
              </Col>
            </Row>
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
                    rootClose
                    placement="bottom"
                    overlay={
                    (<Popover id="chart-description">
                      <p><Text message={selectedGraphToolTipMessage} /></p>
                    </Popover>)
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
                  marks={publishedDates}
                  realtime
                  cols={12}
                />
              </Col>
            </Row>
          </ChunkWrapper>

          {FeatureFlag.check('articleLive:interact') ? userInteract : null}
          {FeatureFlag.check('articleLive:trafficSources') ? trafficSources : null}
          {FeatureFlag.check('articleLive:socialMedia') ? socialMediaChunk : null}
          {FeatureFlag.check('articleLive:realtimeNext') ? realtimeNext : null}
          {FeatureFlag.check('articleLive:userType') ? userType : null}

        </div>
      </DocumentTitle>
    );

  }
}

ArticleRealtimeView.defaultProps = {
  pageViews: [],
  timeOnPage: [],
  scrollDepth: null,
  totalPageViews: null,
  nextInternalUrl: [],
  linksClicked: null,
  comments: 0,
  commentsRead: 0,
  userTypes: [],
  internalReferrerTotal: 0,
  internalReferrerOther: 0,
  internalReferrerArticles: 0,
  internalReferrerUrls: [],
  internalExternalReferrers:[],
  externalReferrerTypes: [],
  externalReferrerUrls: [],
  socialReferrers: [],
  linksClickedByCategory: null,
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
