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
    let hasTopicChanged = this.state.topic !== TopicQueryStore.getState().query.topic;
    if (hasTopicChanged){
      TopicQueryActions.setTopic(this.state.topic);
      ComparatorQueryActions.setTopic(this.state.topic);
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
        <Col xs={12}>
          <SectionModifier
            data={data}
            comparatorData={comparatorData}
            renderDevice={true}
            renderRegion={true}
            renderReferrers={true}
            renderUserCohort={true}
            query={query}
            category={'topics'}
            uuid={this.props.params.topic}
            dateRange='historical'
            />
          <Col xs={12}>
            {updating}

            <Header
              title={'Topic: ' + this.props.params.topic}
              />

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
          </Col>

          <Col xs={12}>
            <SectionWho
              data={data}
              comparatorData={comparatorData}
              renderWho={FeatureFlag.check('topic:who')}
              />
          </Col>
          <Col xs={12}>
            <SectionWhere
              data={data}
              comparatorData={comparatorData}
              renderWhere={FeatureFlag.check('topic:where')}
              />
          </Col>
        </Col>
      </div>

    </DocumentTitle>)
  }
}

export default connectToStores(TopicView);
