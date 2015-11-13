import React from 'react/addons';
import DocumentTitle from 'react-document-title';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';

import Header from '../components/Header';
import SectionModifier from '../components/SectionModifier';
import SectionHeadlineStats from '../components/SectionHeadlineStats';

import TopicStore from '../stores/TopicStore';
import TopicQueryStore from '../stores/TopicQueryStore';
import TopicQueryActions from '../actions/TopicQueryActions';
import TopicActions from '../actions/TopicActions';

import connectToStores from 'alt/utils/connectToStores';
import Messaging from '../components/Messaging';

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
    return [TopicStore, TopicQueryStore];
  }

  static getPropsFromStores() {
    let topicState = TopicStore.getState();
    let topicQueryState = TopicQueryStore.getState();

    return {
      data: topicState.data,
      query: topicQueryState.query,
      topicLoading: topicState.loading
    };
  }

  componentWillMount() {
    let hasTopicChanged = this.state.topic !== TopicQueryStore.getState().query.topic;
    if (hasTopicChanged){
      TopicQueryActions.setTopic(this.state.topic);
    }
  }

  componentWillUnmount(){
    TopicActions.unlistenToQuery();
    TopicActions.destroy()
    TopicQueryActions.destroy()
  }

  componentDidMount() {
    //let analytics = require('../utils/analytics');
    //analytics.sendGAEvent('pageview');
    //analytics.trackScroll();
    TopicActions.listenToQuery();
    if (!this.props.data) {
      TopicActions.loadData(this.props);
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

    let query = this.props.query
    let comparatorData = this.props.comparatorData || {}
    let title = (data) ? 'Lantern - ' + this.props.params.topic : '';

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
            category={'sections'}
            uuid={this.props.params.section}
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
          </Col>
        </Col>
      </div>

    </DocumentTitle>)
  }
}

export default connectToStores(TopicView);
