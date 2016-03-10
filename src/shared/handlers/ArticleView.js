import React from 'react';
import DocumentTitle from 'react-document-title';
import Header from "../components/Header";
import SectionModifier from "../components/SectionModifier";
import SectionHeadlineStats from "../components/SectionHeadlineStats";
import SectionJourney from "../components/SectionJourney.js";
import SectionWhere from "../components/SectionWhere";
import SectionHow from "../components/SectionHow";
import SectionWhen from "../components/SectionWhen";
import SectionSocial from "../components/SectionSocial";
import SectionWho from "../components/SectionWho";
import SectionInteract from "../components/SectionInteract";
import Text from '../components/Text'
import TabNav from '../components/TabNav'
import Messaging from '../components/Messaging';
import FormatData from "../utils/formatData";

import FeatureFlag from '../utils/featureFlag';
import * as formatAuthors from '../utils/formatAuthors';

import ChunkWrapper from '../components/ChunkWrapper';

class ArticleView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      chartShown: 'timeOnPage'
    }
  }

  componentDidMount() {
    let analytics = require('../utils/analytics');
    analytics.sendGAPageViewEvent();
    analytics.trackScroll();
  }

  render() {
    const data = this.props.data;
    const comparatorData = this.props.comparatorData || { article: {}};

    let comparator = this.props.params.comparator || this.props.data.primarySection || 'FT';
    let comparatorType = this.props.params.comparatorType || ((comparator === 'FT') ? 'global' : 'section');

    comparatorData.comparator = unescape(comparatorType + ' ' + comparator);
    const title = (data) ? 'Lantern - ' + data.title : '';

    const dataFormatter = new FormatData(data, comparatorData);
    let [retentionRateData, , keys] = dataFormatter.getPCTMetric('isLastPage', 'Article', 'Exited FT', 'Stayed on FT')

    let dataPoint;
    for (let i = 0; i < retentionRateData.length; i++) {
      dataPoint = retentionRateData[i];
      if (dataPoint.category === 'Stayed on FT') {
        data.retentionRate = parseFloat(dataPoint[keys[0] + ' %']);
        comparatorData.retentionRate = parseFloat(dataPoint[keys[1] + ' %']);
      }
    }

    let headlineStats = {
      timeOnPage: {
        metricType: 'time',
        label: 'Average Time on Page',
        size: 'large',
        comparatorFormatName: 'timeOnPage',
        onClick: () => {
          this.setState({chartShown: 'timeOnPage'})
        }
      },
      pageViews: {
        metricType: 'integer',
        label: 'Page Views',
        size: 'large',
        comparatorFormatName: 'categoryAverageViewCount',
        onClick: () => {
          this.setState({chartShown: 'pageViews'})
        }
      },
      uniqueVisitors: {
        metricType: 'integer',
        label: 'Unique Visitors',
        size: 'large',
        comparatorFormatName: 'categoryAverageUniqueVisitors',
        toolTip: (<Text message='explanations.story.metric.uniqueVisitors' />),
        onClick: () => {
          this.setState({chartShown: 'uniqueVisitors'})
        }
      },
      retentionRate: {
        metricType: 'percentage',
        label: 'Retention Rate',
        size: 'large',
        comparatorFormatName: 'retentionRate',
        toolTip: (<Text message='explanations.articleHandlers.retentionRate' />),
        onClick: () => {
          this.setState({chartShown: 'retentionRate'})
        }
      },
      scrollDepth: {
        metricType: 'percentage',
        label: 'Average Scroll Depth',
        size: 'large',
        comparatorFormatName: 'scrollDepth',
        toolTip: (<Text message='explanations.articleHandlers.scrollDepth' />),
        onClick: () => {
          this.setState({chartShown: 'scrollDepth'})
        }
      }
    }

    let selectedGraphTitle;
    let selectedGraphData;
    let selectedGraphYLabel;

    switch (this.state.chartShown) {
      case 'timeOnPage':
        selectedGraphTitle = 'Time on page';
        selectedGraphData = data.headlineStatsOverTime.map((row) => {
          return {
            'Average time on page' : row.avg_time_on_page.value != null ? row.avg_time_on_page.value : 0,
            "category" : row.key_as_string
          }
        });
        selectedGraphData =  [selectedGraphData, "category", ['Average time on page']];
        selectedGraphYLabel = 'Time On Page (seconds)';
        break;
      case 'pageViews':
        selectedGraphTitle = 'Page views';
        selectedGraphData = dataFormatter.getMetric('readTimes', 'Page views');
        selectedGraphYLabel = 'Page Views';
        break;
      case 'uniqueVisitors':
        selectedGraphTitle = 'Unique Visitors';
        selectedGraphData = data.headlineStatsOverTime.map((row) => {
          return {
            'Unique visitors' : row.unique_visitors.value != null ? row.unique_visitors.value : 0,
            "category" : row.key_as_string
          }
        });
        selectedGraphData =  [selectedGraphData, "category", ['Unique visitors']];
        selectedGraphYLabel = 'Unique Visitors';
        break;
      case 'retentionRate':
        selectedGraphTitle = 'Retention on page';
        selectedGraphData = data.headlineStatsOverTime.map((row) => {
          return {
            'Retention' : row.is_last_page.buckets.length != 0 ? row.is_last_page.buckets[1].doc_count : 0,
            "category" : row.key_as_string
          }
        });
        selectedGraphData =  [selectedGraphData, "category", ['Retention']];
        selectedGraphYLabel = 'Retained Users';
        break;
      case 'scrollDepth':
        selectedGraphTitle = 'Scroll depth';
        selectedGraphData = data.scrollOverTime.map((row) => {
          return {
            'Average scroll depth' : row.scroll_depth.average_scroll.value != null ? row.scroll_depth.average_scroll.value : 0,
            "category" : row.key_as_string
          }
        })
        selectedGraphData =  [selectedGraphData, "category", ['Average scroll depth']];
        selectedGraphYLabel = 'Scroll Depth'
        break;
      default:
    }

    let updating = (this.props.loading)
      ? (<Messaging
        category="Article"
        type="UPDATING"
         />)
      : (<Messaging
        category="Article"
        type="PLACEHOLDER"
         />)


    return (<DocumentTitle title={title}>
      <div>
        {updating}

        <ChunkWrapper noBorder>
          <Header
            title={data.title}
            linkURL={'http://www.ft.com/cms/s/0/' + data.uuid + '.html'}
            author={'By: ' + formatAuthors.join(data.author)}
            published={'First Published: ' + data.published_human}
            uuid={data.uuid}
          />
        </ChunkWrapper>

        <TabNav
          analyticsView={this.props.route.analyticsView}
          publishDate={data.published}
          uuid={data.uuid}
        />

        <ChunkWrapper component="modifier">
          <SectionModifier
            data={data}
            comparatorData={comparatorData}
            comparator={comparator}
            query={this.props.query}
            uuid={data.uuid}
            dateRange='published'
            availableFilters={this.props.availableFilters}
            onDateRangeChange={this.props.onDateRangeChange}
            publishDate={data.published}
            timespanOptions={[
              {label: 'First 24h', value: 24},
              {label: 'First 48h', value: 48},
              {label: 'First 3 days', value: 24 * 3},
              {label: 'First 7 days', value: 24 * 7}
             ]}
          />
        </ChunkWrapper>

        <SectionHeadlineStats
          data={data}
          comparatorData={comparatorData}
          config={headlineStats}
        />

        <SectionWhen
          graphData={selectedGraphData}
          lastPublishDates={data.lastPublishDate}
          title={selectedGraphTitle}
          selectedGraphYLabel={selectedGraphYLabel}
        />

        <SectionInteract
          data={data}
          comparatorData={comparatorData}
          renderInteract={FeatureFlag.check('article:interact')}
        />

        <SectionJourney
          data={data}
          comparatorData={comparatorData}
          renderReferrers={FeatureFlag.check('article:referrers')}
          renderInternalRefTypes={FeatureFlag.check('article:referrers:internalRefTypes')}
        />

        <SectionSocial
          data={data}
          comparatorData={comparatorData}
        />

        <SectionWho
          data={data}
          comparatorData={comparatorData}
          renderWho={FeatureFlag.check('article:who')}
        />

        <SectionWhere
          data={data}
          comparatorData={comparatorData}
          renderWhere={FeatureFlag.check('article:where')}
        />

        <SectionHow
          data={data}
          comparatorData={comparatorData}
          renderDevices={FeatureFlag.check('article:devices')}
          renderChannels={FeatureFlag.check('article:channels')}
        />

      </div>
    </DocumentTitle>);
  }
}

export default ArticleView;
