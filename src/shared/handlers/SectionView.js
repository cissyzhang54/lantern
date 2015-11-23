import React from 'react/addons';
import connectToStores from 'alt/utils/connectToStores';
import DocumentTitle from 'react-document-title';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import FormatData from "../utils/formatData";
import FeatureFlag from '../utils/featureFlag';

import Header from '../components/Header';
import Messaging from '../components/Messaging';
import SectionModifier from '../components/SectionModifier';
import SingleMetric from '../components/SingleMetric';
import BarChart from '../components/BarChart.js';
import DualScaleLineChart from "../components/DualScaleLineChart";
import SectionWho from "../components/SectionWho";
import SectionWhere from "../components/SectionWhere";
import SectionHeadlineStats from "../components/SectionHeadlineStats";

import SectionActions from '../actions/SectionActions';
import SectionStore from '../stores/SectionStore';
import SectionQueryActions from '../actions/SectionQueryActions';
import SectionQueryStore from '../stores/SectionQueryStore';

import ComparatorActions from '../actions/ComparatorActions';
import ComparatorStore from '../stores/ComparatorStore';
import ComparatorQueryActions from '../actions/ComparatorQueryActions';
import ComparatorQueryStore from '../stores/ComparatorQueryStore';
import ChunkWrapper from "../components/ChunkWrapper";

import moment from 'moment'


function decode(uri){
  return uri ? decodeURI(uri) : null
}

class SectionView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.state.section = decode(this.props.params.section)
    this.state.comparator = decode(this.props.params.comparator)
    this.state.comparatorType = decode(this.props.params.comparatorType)
  }

  static getStores() {
    return [SectionStore, SectionQueryStore, ComparatorStore, ComparatorQueryStore];
  }

  static getPropsFromStores() {
    let sectionState = SectionStore.getState();
    let sectionQueryState = SectionQueryStore.getState();
    let comparatorState = ComparatorStore.getState();
    let comparatorQueryState = ComparatorQueryStore.getState();

    return {
      data: sectionState.data,
      query: sectionQueryState.query,
      sectionLoading : sectionState.loading,
      comparatorLoading : comparatorState.loading,
      comparatorQuery: comparatorQueryState.query,
      comparatorData: comparatorState.data || {}
    };
  }

  componentWillMount() {
    ComparatorQueryActions.setCategory('sections');

    let hasSectionChanged = this.state.section !== SectionQueryStore.getState().query.section;
    let hasComparatorChanged = this.state.comparator !== ComparatorQueryStore.getState().query.comparator;
    if (hasSectionChanged){
      SectionQueryActions.setSection(this.state.section);
      ComparatorQueryActions.setSection(this.state.section);
    }
    if (this.state.comparator && hasComparatorChanged){
      ComparatorQueryActions.selectComparator(this.state);
    }
  }

  componentWillUnmount(){
    SectionActions.unlistenToQuery();
    SectionActions.destroy();
    SectionQueryActions.destroy();
    ComparatorActions.unlistenToQuery();
    ComparatorActions.destroy();
    ComparatorQueryActions.destroy();
    this.state = {};
  }

  componentDidMount() {
    //let analytics = require('../utils/analytics');
    //analytics.sendGAEvent('pageview');
    //analytics.trackScroll();

    SectionActions.listenToQuery();
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
      SectionActions.loadData(this.props);
      ComparatorActions.loadData(this.props);
    }
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
    let title = (data) ? 'Lantern - ' + this.props.params.section : '';

    let dataFormatter = new FormatData(this.props.data, this.props.comparatorData);
    let [publishData, publishID, publishKeys] =  dataFormatter.getMetric('publishTimes', 'Articles published');
    let [readData, readID, readKeys] =  dataFormatter.getMetric('readTimes', 'Articles read');
    let [topicViewData, topicViewId, topicViewKeys] = dataFormatter.getPCTMetric('topicViews', 'Views');
    let [topicCountData, topicCountId, topicCountKeys] = dataFormatter.getPCTMetric('topicCount', 'Count');

    let [refData, refID, refKeys] = dataFormatter.getPCTMetric('referrerTypes', 'Views');
    let [socialData, socialID, socialKeys] = dataFormatter.getPCTMetric('socialReferrers', 'Views');
    let [internalData, internalID, internalKeys] = dataFormatter.getPCTMetric('internalReferrerTypes', 'Views');

    let headlineStats = {
      topicsCovered: {
        metricType: 'integer',
        label: 'Topics Covered',
        size: 'large',
        comparatorFormatName: 'topicsCovered'
      },
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
          <SectionModifier
            data={data}
            comparatorData={comparatorData}
            comparatorQuery={this.props.comparatorQuery}
            renderDevice={true}
            renderRegion={true}
            renderReferrers={true}
            renderUserCohort={true}
            query={query}
            category={'sections'}
            uuid={this.props.params.section}
            dateRange='historical'
          />
          <ChunkWrapper component="header">
            {updating}

            <Header
              title={'Section: ' + this.props.params.section}
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

          <ChunkWrapper component="Topics">
            <Row>
              <Col xs={12}>
                <h3>Topics Published vs Topics Read</h3>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={6}>
                <h4>Total number of articles per topic</h4>
                <BarChart
                  data={topicCountData}
                  keys={topicCountKeys}
                  category={topicCountId}
                  yLabel="Users"
                  xLabel=""
                  usePercentages={true}
                  />
              </Col>
              <Col xs={12} md={6}>
                <h4>Total number of views per topic</h4>
                <BarChart
                  data={topicViewData}
                  keys={topicViewKeys}
                  category={topicViewId}
                  yLabel="Users"
                  xLabel=""
                  usePercentages={true}
                />
              </Col>
            </Row>
          </ChunkWrapper>

          <SectionWho
            data={data}
            comparatorData={comparatorData}
            renderWho={FeatureFlag.check('section:who')}
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
            renderWhere={FeatureFlag.check('article:where')}
            />

      </div>
  </DocumentTitle>)

  }
}

export default connectToStores(SectionView);
