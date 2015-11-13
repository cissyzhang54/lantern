import React from 'react/addons';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import SingleMetric from "./SingleMetric";
import FeatureFlag from '../utils/featureFlag';
import Table from '../components/Table';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Popover from 'react-bootstrap/lib/Popover';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import ChunkWrapper from './ChunkWrapper.js';

let config = {
  subscription: {
    metricType: 'integer',
    label: 'Subscriptions',
    size: 'small'
  },
  social_shares: {
    metricType: 'integer',
    label: 'Social Shares',
    size: 'small',
    toolTip : (<p>This is the number of times the article has been shared using the share buttons on ft.com</p>)
  },
  total_links_clicked: {
    metricType: 'integer',
    label: 'Links Clicked',
    size: 'small'
  },
  comments_posted_total: {
    metricType: 'integer',
    label: 'Comments Posted',
    size: 'small'
  },
  comments_viewed_total: {
    metricType: 'integer',
    label: 'Comments Viewed',
    size: 'small',
    toolTip : (<p>This shows the number of users who read down to the comment section of the article page</p>)
  }
}
const styles = {
  infoIcon : {
    'fontSize' : '15px',
    'color': '#039',
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
    if (!Object.keys(data).length) return (<div></div>);
    let comparatorData = this.props.comparatorData ;

    let subscriptions = data.isSubscription.length <= 1 ? 0 : data.isSubscription[1][1] ;
    let subscription = renderMetric('subscription', subscriptions);

    let social_shares_total = renderMetric('social_shares', data.socialSharesTotal, comparatorData.comparator, comparatorData.socialSharesTotal);
    let links_clicked_total = renderMetric('total_links_clicked', data.totalLinksClicked, comparatorData.comparator, comparatorData.totalLinksClicked);
    let comments_posted_total = renderMetric('comments_posted_total', data.totalCommentsPosted, comparatorData.comparator, comparatorData.totalCommentsPosted);
    let comments_viewed_total = renderMetric('comments_viewed_total', data.totalCommentsViewed, comparatorData.comparator, comparatorData.totalCommentsViewed);

    let link_click_categories = data.linkClickCategories.buckets.map((d, i) => {
      let key = d.key;
      let value = d.total_clicks.value;
      return [
        key,
        value
      ];
    });

    return ( <ChunkWrapper component='sectionInteractiveStats' >
      <Row>
        <Col xs={12}>
          <h3>How did the user interact?</h3>
        </Col>
      </Row>
      <Row>
        <Col xs={12} sm={6} >
          {links_clicked_total}
        </Col>
        <Col xs={12} sm={6} >
          {social_shares_total}
        </Col>
      </Row>
      <Row>
        <Col xs={12} sm={4} >
          {comments_viewed_total}
        </Col>
        <Col xs={12} sm={4} >
          {comments_posted_total}
        </Col>
        <Col xs={12} sm={4} >
          {subscription}
        </Col>
      </Row>
      <Row style={{marginTop: '20px'}}>
        <Col xs={12} sm={4} >
          <Table
            headers={['Link Category', 'Clicks']}
            rows={link_click_categories}
            />
        </Col>
        <Col xs={12} sm={4} >

        </Col>
        <Col xs={12} sm={4} >
          <Table
            headers={['Social Network', 'Shares']}
            rows={data.socialSharesTypes}
            />
        </Col>
      </Row>
    </ChunkWrapper>);
  }
}
