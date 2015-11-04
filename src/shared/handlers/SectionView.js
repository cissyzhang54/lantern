import React from 'react/addons';
import Header from '../components/Header';
import SectionModifier from '../components/SectionModifier';
import SingleMetric from '../components/SingleMetric';
import SectionStore from '../stores/SectionStore';
import SectionQueryStore from '../stores/SectionQueryStore';
import SectionQueryActions from '../actions/SectionQueryActions';
import SectionActions from '../actions/SectionActions';
import connectToStores from 'alt/utils/connectToStores';

import moment from 'moment'

function decode(uri){
  return uri ? decodeURI(uri) : null
}

class SectionView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}
    this.state.section = decode(this.props.params.section)
  }

  static getStores() {
    return [SectionStore, SectionQueryStore];
  }

  static getPropsFromStores() {
    let overviewState = SectionStore.getState();

    return {
      data: overviewState.data
    };
  }

  componentWillMount() {
    let hasSectionChanged = this.state.section !== SectionQueryStore.getState().query.section;

    if (hasSectionChanged){
      SectionQueryActions.setSection(this.state.section);
    }
  }

  componentWillUnmount(){
    SectionActions.unlistenToQuery();
  }

  componentDidMount() {
    //let analytics = require('../utils/analytics');
    //analytics.sendGAEvent('pageview');
    //analytics.trackScroll();
    SectionActions.listenToQuery();
  }

  render() {
    if (!this.props.data){
      return <div>Loading</div>;
    }
    let data = this.props.data
    let comparatorData = {
      comparator: this.props.params.comparator,
      comparatorType: this.props.params.comparatorType
    };
    let comparatorQuery = {
      dateTo: moment(),
      dateFrom:  moment().subtract(29,'days')
    }

    return(<div>

      <SectionModifier
        data={data}
        comparatorData={comparatorData}
        renderDevice={true}
        renderRegion={true}
        renderReferrers={true}
        renderUserCohort={true}
        query={comparatorQuery}
        category={'sections'}
        uuid={this.props.params.section}
        />

      <Header
        title={'Section: ' + this.props.params.section}
        />

      <SingleMetric  metric={data.topicsCovered} metricType='integer' label='Topics covered' size="large" />
      <SingleMetric  metric={data.unique_visitors} metricType='integer' label='Unique Visitors' size="large" />

    </div>)
  }
}

export default connectToStores(SectionView);
