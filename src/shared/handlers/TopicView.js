import React from 'react/addons';
import Header from '../components/Header';
import SectionModifier from '../components/SectionModifier';
import TopicStore from '../stores/TopicStore';
import TopicQueryStore from '../stores/TopicQueryStore';
import TopicQueryActions from '../actions/TopicQueryActions';
import TopicActions from '../actions/TopicActions';
import connectToStores from 'alt/utils/connectToStores';
import Messaging from '../components/Messaging';

import moment from 'moment'

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

    console.log(data)

    return(<div>

      <Header
        title={'Topic: ' + this.props.params.topic}
        />

    </div>)
  }
}

export default connectToStores(TopicView);
