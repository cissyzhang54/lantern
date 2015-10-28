import React from 'react/addons';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import SingleMetric from "./SingleMetric";
import FeatureFlag from '../utils/featureFlag';
import Table from '../components/Table';

let config = {
  subscription: {
    metricType: 'integer',
    label: 'Subscriptions',
    size: 'small'
  },
  social_shares: {
    metricType: 'integer',
    label: 'Social Shares',
    size: 'small'
  },
  total_links_clicked: {
    metricType: 'integer',
    label: 'Total Links Clicked',
    size: 'small'
  }
}

function renderMetric (metricName, metric, comparatorName, comparatorMetric) {
  let componentConfig = config[metricName];
  componentConfig.metric = metric;
  componentConfig.comparatorName = comparatorName || '';
  componentConfig.comparatorMetric = comparatorMetric >= 0 ? comparatorMetric : undefined;

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
    let subscription = renderMetric('subscription', subscriptions);

    let social_shares_total = renderMetric('social_shares', data.social_shares_total, comparatorData.comparator, comparatorData.social_shares_total);
    let links_clicked_total = renderMetric('total_links_clicked', data.total_links_clicked, comparatorData.comparator, comparatorData.total_links_clicked);

    return ( <div className='sectionInteractiveStats' >
      <Row>
        <Col xs={12} sm={4} >

        </Col>
        <Col xs={12} sm={4} >
          {links_clicked_total}
        </Col>
        <Col xs={12} sm={4} >
          {social_shares_total}
        </Col>
      </Row>
      <Row>
        <Col xs={12} sm={4} >

        </Col>
        <Col xs={12} sm={4} >

        </Col>
        <Col xs={12} sm={4} >
          {subscription}
        </Col>
      </Row>
      <Row>
        <Col xs={12} sm={4} >

        </Col>
        <Col xs={12} sm={4} >

        </Col>
        <Col xs={12} sm={4} >
          <Table
            headers={['Social Network', 'Shares']}
            rows={data.social_shares_types}
            />
        </Col>
      </Row>
    </div>);
  }
}
