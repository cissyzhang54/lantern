import React from 'react/addons';
import connectToStores from 'alt/utils/connectToStores';
import DocumentTitle from 'react-document-title';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';

import Header from '../components/Header';
import Messaging from '../components/Messaging';
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

import LineChart from "../components/LineChart";
import FormatData from "../utils/formatData";


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
      sectionLoading : sectionState.loading,
      comparatorLoading : comparatorState.loading,
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
    if (this.props.errorMessage) {
      return (<Messaging category="Section" type="ERROR" message={this.props.errorMessage} />);
    } else if (!this.props.data) {
      return (<Messaging category="Section" type="LOADING" />);
    }
    let updating = (this.props.sectionLoading || this.props.comparatorLoading)
      ? <Messaging category="Section" type="UPDATING" />
      : <Messaging category="Section" type="PLACEHOLDER" />

    let data = this.props.data
    let query = this.props.query
    let comparatorData = this.props.comparatorData
    let comparatorQuery = this.props.comparatorQuery
    let title = (data) ? 'Lantern - ' + this.props.params.section : '';

    let dataFormatter = new FormatData(data);
    let [viewData, viewID, viewKeys] =  dataFormatter.getMetric('readTimes', 'Articles read');

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

          <SingleMetric
            metric={data.unique_visitors}
            metricType='integer'
            comparatorMetric={comparatorData.unique_visitors}
            comparatorName={comparatorData.comparator}
            label='Unique Visitors'
            size="large" />

          <SingleMetric
            metric={data.articleCount}
            metricType='integer'
            comparatorMetric={comparatorData.articleCount}
            comparatorName={comparatorData.comparator}
            label='Articles published'
            size="large" />


          <LineChart
            data={viewData}
            keys={viewKeys}
            category={viewID}
            yLabel='Number of articles'
            xLabel='Time'
            cols={12} />
        </Col>
      </Col>
    </div>
  </DocumentTitle>)

  }
}

export default connectToStores(SectionView);
