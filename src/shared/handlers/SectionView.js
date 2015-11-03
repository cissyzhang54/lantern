import React from 'react/addons';
import connectToStores from 'alt/utils/connectToStores';

import Header from '../components/Header';
import SectionModifier from '../components/SectionModifier';
import SingleMetric from '../components/SingleMetric';

import SectionActions from '../actions/SectionActions';
import SectionStore from '../stores/SectionStore';
import SectionQueryActions from '../actions/SectionQueryActions';
import SectionQueryStore from '../stores/SectionQueryStore';

import ComparatorActions from '../actions/ComparatorActions';
import ComparatorStore from '../stores/ComparatorStore';
import ComparatorQueryActions from '../actions/ComparatorQueryActions';
import ComparatorQueryStore from '../stores/ComparatorQueryStore';

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
    return [SectionStore, SectionQueryStore, ComparatorStore, ComparatorQueryStore];
  }

  static getPropsFromStores() {
    let sectionState = SectionStore.getState();
    let queryState = SectionQueryStore.getState();
    let comparatorState = ComparatorStore.getState();
    let comparatorQueryState = ComparatorQueryStore.getState();

    return {
      data: sectionState.data,
      query: queryState.query,
      comparatorQuery: comparatorQueryState.query,
      comparatorData: comparatorState.data || {}
    };
  }

  componentWillMount() {
    ComparatorQueryActions.setCategory('sections');
    let hasSectionChanged = this.state.section !== SectionQueryStore.getState().query.section;
    if (hasSectionChanged){
      SectionQueryActions.setSection(this.state.section);
      ComparatorQueryActions.setSection(this.state.section);
    }
  }

  componentWillUnmount(){
    SectionActions.unlistenToQuery();
    SectionActions.destroy()
    SectionQueryActions.destroy()
    ComparatorActions.unlistenToQuery();
    ComparatorActions.destroy();
    ComparatorQueryActions.destroy();
  }

  componentDidMount() {
    //let analytics = require('../utils/analytics');
    //analytics.sendGAEvent('pageview');
    //analytics.trackScroll();
    SectionActions.listenToQuery();
    ComparatorActions.listenToQuery();
  }

  render() {
    if (!this.props.data){
      return <div>Loading</div>;
    }
    let data = this.props.data
    let query = this.props.query
    let comparatorData = this.props.comparatorData
    let comparatorQuery = this.props.comparatorQuery

    return(<div>

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

      <Header
        title={'Section: ' + this.props.params.section}
        />

      <SingleMetric
        metric={data.topicsCovered}
        metricType='integer'
        comparatorMetric={comparatorData.topicsCovered}
        comparatorName={comparatorData.comparator}
        label='Topics covered'
        size="large"
      />

      <SingleMetric  metric={data.unique_visitors} metricType='integer' label='Unique Visitors' size="large" />

    </div>)
  }
}

export default connectToStores(SectionView);
