import React from 'react/addons';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import SingleMetric from "./SingleMetric";
import FeatureFlag from '../utils/featureFlag';

let config = {
  is_subscription: {
    metricType: 'integer',
    label: 'Subscriptions',
    size: 'small'
  }
}

function renderMetric (metricName, metric, comparatorName, comparatorMetric) {

  let componentConfig = config[metricName];
  componentConfig.metric = metric;
  componentConfig.comparatorName = comparatorName || '';
  componentConfig.comparatorMetric = comparatorMetric || undefined;

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

    let subscriptions = data.is_subscription.length <= 1 ? 0 : data.is_subscription[1][1] ;
    let is_subscription = renderMetric('is_subscription', subscriptions);

    return ( <div className='sectionInteractiveStats' >
      <Row>
        <Col xs={12} sm={4} >

        </Col>
        <Col xs={12} sm={4} >

        </Col>
        <Col xs={12} sm={4} >

        </Col>
      </Row>
      <Row>
        <Col xs={12} sm={4} >

        </Col>
        <Col xs={12} sm={4} >

        </Col>
        <Col xs={12} sm={4} >
          {is_subscription}
        </Col>
      </Row>
    </div>);
  }
}
