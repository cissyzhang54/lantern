import React from 'react/addons';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import SingleMetric from "./SingleMetric";
import FeatureFlag from '../utils/featureFlag';

let config = {
  timeOnPage: {
    metricType: 'time',
    label: 'Time on Page',
    size: 'large'
  },
  uniqueVisitors: {
    metricType: 'integer',
    label: 'Unique Visitors',
    size: 'large'
  },
  pageViews: {
    metricType: 'integer',
    label: 'Page Views',
    size: 'large'
  },
  socialUsers: {
    metricType: 'integer',
    label: 'Social Users',
    size: 'large'
  },
  scroll_depth: {
    metricType: 'percentage',
    label: 'Scroll Depth',
    size: 'large'
  }
}

function renderMetric (metricName, metric, comparatorName, comparatorMetric) {

  let componentConfig = config[metricName]
  componentConfig.metric = metric
  componentConfig.comparatorName = comparatorName || ''
  componentConfig.comparatorMetric = comparatorMetric || undefined

  let component = FeatureFlag.check(`article:${metricName}`)
    ? <SingleMetric {...componentConfig} />
    : {}
  return component
}

export default class SectionHeadlineStats extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    let data = this.props.data;
    let comparatorData = this.props.comparatorData ;
    let timeOnPage = renderMetric('timeOnPage', data.timeOnPage, comparatorData.comparator, comparatorData.timeOnPage)
    let pageViews = renderMetric('pageViews', data.pageViews, comparatorData.comparator, comparatorData.category_average_view_count)
    let socialUsers = renderMetric('socialUsers', data.socialReaders)
    let scrollDepth = renderMetric('scroll_depth', data.scroll_depth, comparatorData.comparator, comparatorData.scroll_depth)
    let uniqueVisitors = renderMetric('uniqueVisitors', data.unique_visitors, comparatorData.comparator, comparatorData.unique_visitors)

    return ( <Row data-component='sectionHeadlineStats' >
      <Col xs={12} >
        <Col xs={12} sm={3} >
          {timeOnPage}
        </Col>
        <Col xs={12} sm={3} >
          {pageViews}
        </Col>
        <Col xs={12} sm={3} >
          {uniqueVisitors}
        </Col>
        <Col xs={12} sm={3} >
          {socialUsers}
        </Col>
        <Col xs={12} sm={3} >
          {scrollDepth}
        </Col>
      </Col>
    </Row>);
  }
}
