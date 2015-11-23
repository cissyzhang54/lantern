import React from 'react/addons';
import DocumentTitle from 'react-document-title';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import connectToStores from 'alt/utils/connectToStores';
import FeatureFlag from '../utils/featureFlag';

import FormatData from "../utils/formatData";
import TopicStore from '../stores/TopicStore';
import TopicQueryStore from '../stores/TopicQueryStore';
import TopicQueryActions from '../actions/TopicQueryActions';
import TopicActions from '../actions/TopicActions';

import ComparatorActions from '../actions/ComparatorActions';
import ComparatorStore from '../stores/ComparatorStore';
import ComparatorQueryActions from '../actions/ComparatorQueryActions';
import ComparatorQueryStore from '../stores/ComparatorQueryStore';

import Header from '../components/Header';
import Messaging from '../components/Messaging';
import SectionModifier from '../components/SectionModifier';
import SectionHeadlineStats from '../components/SectionHeadlineStats';
import SectionWho from '../components/SectionWho';
import DualScaleLineChart from "../components/DualScaleLineChart";
import ChunkWrapper from "../components/ChunkWrapper";
import SectionWhere from '../components/SectionWhere';
import BarChart from '../components/BarChart.js';

import moment from 'moment';

function decode(uri){
  return uri ? decodeURI(uri) : null
}

class TopicView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}
    this.state.topic = decode(this.props.params.topic)
  }

  static getStores() {
    return [TopicStore, TopicQueryStore, ComparatorStore, ComparatorQueryStore];
  }

  static getPropsFromStores() {
    let topicState = TopicStore.getState();
    let topicQueryState = TopicQueryStore.getState();
    let comparatorState = ComparatorStore.getState();
    let comparatorQueryState = ComparatorQueryStore.getState();

    return {
      data: topicState.data,
      query: topicQueryState.query,
      topicLoading: topicState.loading,
      comparatorLoading : comparatorState.loading,
      comparatorQuery: comparatorQueryState.query,
      comparatorData: comparatorState.data || {}
    };
  }

  componentWillMount() {
    ComparatorQueryActions.setCategory('topics');

    let hasTopicChanged = this.state.topic !== TopicQueryStore.getState().query.topic;
    let hasComparatorChanged = this.state.comparator !== ComparatorQueryStore.getState().query.comparator;
    if (hasTopicChanged){
      TopicQueryActions.setTopic(this.state.topic);
      ComparatorQueryActions.setTopic(this.state.topic);
    }
    if (this.state.comparator && hasComparatorChanged){
      ComparatorQueryActions.selectComparator(this.state);
    }
  }

  componentWillUnmount(){
    TopicActions.unlistenToQuery();
    TopicActions.destroy();
    TopicQueryActions.destroy();
    ComparatorActions.unlistenToQuery();
    ComparatorActions.destroy();
    ComparatorQueryActions.destroy();
  }

  componentDidMount() {
    //let analytics = require('../utils/analytics');
    //analytics.sendGAEvent('pageview');
    //analytics.trackScroll();

    TopicActions.listenToQuery();
    ComparatorActions.listenToQuery();

    var comparatorDateRange = {
      from: this.props.query.dateFrom,
      to: this.props.query.dateTo
    }

    const isGlobalFTComparator = this.props.comparatorQuery.comparatorType === 'global';

    if (!isGlobalFTComparator) {
      // Update the comparator query dates
      let fromDate = moment(this.props.query.dateFrom);
      let toDate = moment(this.props.query.dateTo);
      let span = toDate - fromDate;
      fromDate.subtract(span, 'milliseconds');
      toDate.subtract(span, 'milliseconds');
      comparatorDateRange = {
        from: fromDate.format('YYYY-MM-DD'),
        to: toDate.format('YYYY-MM-DD')
      };
    }

    ComparatorQueryActions.selectDateRange(comparatorDateRange);

    if (!this.props.data) {
      TopicActions.loadData(this.props);
      ComparatorActions.loadData(this.props);
    }
  }

  render() {
    if (this.props.errorMessage) {
      return (<Messaging category="Topic" type="ERROR" message={this.props.errorMessage} />);
    } else if (!this.props.data) {
      return (<Messaging category="Topic" type="LOADING" />);
    }
    let updating = (this.props.topicLoading)
      ? <Messaging category="Topic" type="UPDATING" />
      : <Messaging category="Topic" type="PLACEHOLDER" />

    let data = this.props.data;
    let query = this.props.query
    let comparatorData = this.props.comparatorData
    let comparatorQuery = this.props.comparatorQuery
    let title = (data) ? 'Lantern - ' + this.props.params.topic : '';

    let dataFormatter = new FormatData(this.props.data, this.props.comparatorData);
    let [publishData, publishID, publishKeys] =  dataFormatter.getMetric('publishTimes', 'Articles published');
    let [readData, readID, readKeys] =  dataFormatter.getMetric('readTimes', 'Articles read');

    let [refData, refID, refKeys] = dataFormatter.getPCTMetric('referrerTypes', 'Views');
    let [socialData, socialID, socialKeys] = dataFormatter.getPCTMetric('socialReferrers', 'Views');
    let [internalData, internalID, internalKeys] = dataFormatter.getPCTMetric('internalReferrerTypes', 'Views');

    let headlineStats = {
      uniqueVisitors: {
        metricType: 'integer',
        label: 'Unique Visitors',
        size: 'large',
        comparatorFormatName: 'uniqueVisitors'
      },
      articleCount: {
        metricType: 'integer',
        label: 'Articles Published',
        size: 'large',
        comparatorFormatName: 'articleCount'
      }
    }

    return(<DocumentTitle title={title}>
      <div>
          <ChunkWrapper component="modifier">
            <SectionModifier
            data={data}
            comparatorData={comparatorData}
            comparatorQuery={this.props.comparatorQuery}
            renderDevice={true}
            renderRegion={true}
            renderReferrers={true}
            renderUserCohort={true}
            query={query}
            category={'topics'}
            uuid={this.props.params.topic}
            dateRange='historical'
            />
          </ChunkWrapper>
          <ChunkWrapper component="header">
            {updating}

            <Header
              title={'Topic: ' + this.props.params.topic}
              />
          </ChunkWrapper>
          <SectionHeadlineStats
            data={data}
            comparatorData={comparatorData}
            config={headlineStats}
            />

          <ChunkWrapper component="ArticlesPublished">
            <Row>
              <Col xs={12}>
                <h3>Articles Published vs Articles Read for this topic</h3>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <DualScaleLineChart
                  leftData={publishData}
                  rightData={readData}
                  keys={publishKeys.concat(readKeys)}
                  categories={[publishID, readID]}
                  yLabel='Articles published'
                  y2Label='Articles read'
                  xLabel='Time' />
              </Col>
            </Row>
          </ChunkWrapper>

          <SectionWho
            data={data}
            comparatorData={comparatorData}
            renderWho={FeatureFlag.check('topic:who')}
            />

          <ChunkWrapper component="section-referrers">
            <Row>
              <Col xs={12}>
                <h3>Where do the users come from?</h3>
              </Col>
            </Row>
            <Row>
              <Col xs={12} sm={4}>
                <h4>External Sources</h4>
                <BarChart
                  data={refData}
                  keys={refKeys}
                  category={refID}
                  yLabel="Page Views"
                  xLabel="Referrer"
                  usePercentages={true} />
              </Col>

              <Col xs={12} sm={4}>
                <h4>Social Network Breakdown</h4>
                <BarChart
                  data={socialData}
                  keys={socialKeys}
                  category={socialID}
                  yLabel="Page Views"
                  xLabel="Social Network"
                  usePercentages={true}  />
              </Col>

              <Col xs={12} sm={4}>
                <h4>Internal Referrer Types</h4>
                <BarChart
                  data={internalData}
                  keys={internalKeys}
                  category={internalID}
                  yLabel="Page Views"
                  xLabel="Referrer"
                  usePercentages={true} />
              </Col>
            </Row>
          </ChunkWrapper>
          <SectionWhere
            data={data}
            comparatorData={comparatorData}
            renderWhere={FeatureFlag.check('topic:where')}
            />
      </div>

    </DocumentTitle>)
  }
}

export default connectToStores(TopicView);
