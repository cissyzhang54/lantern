import React from 'react/addons';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import SingleMetric from "./SingleMetric";
import FeatureFlag from '../utils/featureFlag';

let config = {
  wordCount: {
    metricType: 'integer',
    label: 'Article Wordcount',
    size: 'small'
  },
  imageCount: {
    metricType: 'integer',
    label: 'Article Wordcount',
    size: 'small'
  },
  bodyLinksCount: {
    metricType: 'integer',
    label: 'Body Links',
    size: 'small'
  },
  timeOnPage: {
    metricType: 'time',
    label: 'Time on Page',
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
  }
}

function renderMetric (metricName, metric, comparatorMetric) {

  let componentConfig = config[metricName]
  componentConfig.metric = metric
  componentConfig.comparatorMetric = comparatorMetric || ''

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
    let wordCount = renderMetric('wordCount', data.wordCount);
    let imageCount = renderMetric('imageCount', data.imageCount)
    let bodyLinksCount = renderMetric('bodyLinksCount', data.bodyLinksCount)
    let timeOnPage = renderMetric('timeOnPage', data.timeOnPage)
    let pageViews = renderMetric('pageViews', data.pageViews, comparatorData.category_average_view_count)
    let socialUsers = renderMetric('socialUsers', data.socialReaders)

    return ( <Row >
      <Col xs={12} sm={3} >
        <Col xs={4} sm={12} >
          {wordCount}
        </Col>
        <Col xs={4} sm={12} >
          {imageCount}
        </Col>
        <Col xs={4} sm={12} >
          {bodyLinksCount}
        </Col>
      </Col>
      <Col xs={12} sm={9} >
        <Col xs={12} sm={4} >
          {timeOnPage}
        </Col>
        <Col xs={12} sm={4} >
          {pageViews}
        </Col>
        <Col xs={12} sm={4} >
          {socialUsers}
        </Col>
      </Col>
    </Row>);
  }
}
