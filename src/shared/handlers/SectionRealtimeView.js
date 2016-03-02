import React from 'react';
import ChunkWrapper from '../components/ChunkWrapper';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import DocumentTitle from 'react-document-title';
import connectToStores from 'alt-utils/lib/connectToStores';
import SectionRealtimeStore from '../stores/SectionRealtimeStore';
import SectionRealtimeActions from '../actions/SectionRealtimeActions';
import ErrorHandler from '../components/ErrorHandler';
import Header from '../components/Header';
import LineChart from '../components/LineChart';
import TabNav from '../components/TabNav';
import SectionHeadlineStats from '../components/SectionHeadlineStats';
import LiveIndicator from '../components/LiveIndicator';
import RealtimeArticleList from '../components/RealtimeArticleList';

class SectionRealtimeView extends React.Component {

  constructor(props) {
    super(props);
  }

  static getStores() {
    return [SectionRealtimeStore];
  }

  static getPropsFromStores() {
    return SectionRealtimeStore.getState();
  }

  componentDidMount() {
    const timespan = this.props.params.timespan || '24h';
    SectionRealtimeActions.subscribeToSection({
      section: this.props.params.section,
      timespan: timespan
    });
    const analytics = require('../utils/analytics');
    analytics.sendGAPageViewEvent();
    analytics.trackScroll();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params.timespan !== nextProps.params.timespan) {
      SectionRealtimeActions.subscribeToSection({
        timespan: nextProps.params.timespan || '24h',
        section: nextProps.section,
        previousSection: {
          timespan: this.props.timespan,
          section: this.props.section
        }
      });
    }
  }

  componentWillUnmount() {
    SectionRealtimeActions.disconnect();
  }

  render() {
    if (this.props.error) {
      return (
        <ErrorHandler
          category="Section"
          type="ERROR"
          message={this.props.errorMessage}
          error={this.props.error}
        />
      );
    }

    const title = (this.props.title) ? 'Lantern - ' + this.props.title : '';

    const headlineStats = {
      topicsCovered: {
        metricType: 'integer',
        label: 'Topics Covered',
        size: 'large'
      },
      totalPageViews: {
        metricType: 'integer',
        label: 'Page Views',
        size: 'large'
      },
      articlesPublished: {
        metricType: 'integer',
        label: 'Articles Published',
        size: 'large'
      }
    }

    const links = [
      {
        title: "Live",
        url: `/realtime/sections/${this.props.params.section}`,
        type: 'realtime'
      },
      {
        title: 'Archive',
        url: `/sections/${this.props.params.section}`,
        type: 'section'
      }
    ];

    const pageViews = this.props.pageViews.map((d) => {
      return {
        date: d[0],
        views: d[1]
      };
    });

    return (
      <DocumentTitle title={title}>
        <div>

          <ChunkWrapper
            component="header"
            noBorder
          >
            <Header title={`Section: ${this.props.params.section}`}/>
          </ChunkWrapper>

          <TabNav
            links={links}
            analyticsView={'realtime'}
          />

          <SectionHeadlineStats
            data={this.props}
            comparatorData={{}}
            config={headlineStats}
          />

          <RealtimeArticleList component="article-list"
                               articleList={this.props.articleList}
            />

          <ChunkWrapper compoonent="page-views-chart">
            <Row>
              <Col>
                <h3>Story page views for this section</h3>
                <LiveIndicator isLive={this.props.isLive} />
                <LineChart
                  data={pageViews}
                  keys={['views']}
                  category={'date'}
                  yLabel={'Page Views'}
                  xLabel='Time'
                  realtime
                  cols={12}
                />
              </Col>
            </Row>
          </ChunkWrapper>

        </div>
      </DocumentTitle>
    );
  }

}

SectionRealtimeView.defaultProps = {
  topicsCovered : null,
  totalPageViews : null,
  articlesPublished : null,
  pageViews : [],
  articleList: [],
  section: null,
  timespan: '24h',
  isLive: false
}


export default connectToStores(SectionRealtimeView);
