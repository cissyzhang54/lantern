import React from 'react';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import SingleMetric from "./SingleMetric";
import FeatureFlag from '../utils/featureFlag';
import Table from '../components/Table';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Popover from 'react-bootstrap/lib/Popover';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import ChunkWrapper from './ChunkWrapper.js';
import Text from './Text';
import responsiveStyles from '../utils/responsiveStyles';

var controllerStyles = {
  'default': {
    infoIcon : {
      'fontSize' : '15px',
      'color': '#039',
      cursor:'pointer'
    },
    list : {
      listStyle: 'none',
      padding : 0,
      margin : 0
    },
    list__item : {
      borderBottom: "1px solid #ccc"
    },
    'list__item--first' : {
      fontWeight: 'bold',
      borderBottom: "2px solid #ccc"
    },
    'list__item--last' : {
      fontWeight: 'bold',
      borderBottom: "none"
    }
  },
  '(max-width: 500px)' : {
    list : {
      marginBottom: '20px',
    }
  }
};

let config = {
  subscription: {
    metricType: 'integer',
    label: 'Total Subscriptions',
    size: 'small'
  },
  social_shares: {
    metricType: 'integer',
    label: 'Social Shares',
    size: 'small',
    toolTip : (<p><Text message='explanations.sectionInteract.socialShares'/></p>)
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
    toolTip : (<p><Text message='explanations.sectionInteract.commentsViewed'/></p>)
  },
  comments_total: {
    metricType: 'integer',
    label: 'Total Comments',
    size: 'small'
  }
}

function renderMetric (metricName, metric, comparatorName, comparatorMetric) {
  let defaultConf = {
    metricType: 'integer',
    size: 'small'
  }

  let componentConfig;
  if (typeof config[metricName] == 'undefined' ) {
    componentConfig = defaultConf;
    componentConfig['label'] = metricName;
  } else {
    componentConfig = config[metricName]
  }

  componentConfig.metric = metric;
  componentConfig.comparatorName = comparatorName || '';
  componentConfig.comparatorMetric = comparatorMetric >= 0 ? comparatorMetric : undefined;
  componentConfig.horizontal = true;

  return <SingleMetric {...componentConfig} />
}

export default class SectionInteract extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      responsiveStyles : controllerStyles['default']
    };
  }

  componentDidMount() {
    responsiveStyles.addListeners(this, controllerStyles);
  }

  componentWillUnmount() {
    responsiveStyles.removeListeners(this);
  }

  render() {
    let styles = this.state.responsiveStyles;
    let data = this.props.data;

    if (!Object.keys(data).length) return (<div></div>);
    let comparatorData = this.props.comparatorData ;

    /* Subscriptions */
    let subscriptions = data.isSubscription.length <= 1 ? 0 : data.isSubscription[1][1] ;
    let subscription = renderMetric('subscription', subscriptions);

    /* Comments */
    let comments_posted_total = renderMetric('comments_posted_total', data.totalCommentsPosted, comparatorData.comparator, comparatorData.totalCommentsPosted);
    let comments_viewed_total = renderMetric('comments_viewed_total', data.totalCommentsViewed, comparatorData.comparator, comparatorData.totalCommentsViewed);
    let comments_total = renderMetric('comments_total', (data.totalCommentsViewed + data.totalCommentsPosted), comparatorData.comparator, (comparatorData.totalCommentsViewed + comparatorData.totalCommentsPosted));

    /* Links */
    let links_clicked_total = renderMetric('total_links_clicked', data.totalLinksClicked, comparatorData.comparator, comparatorData.totalLinksClicked);

    let link_click_categories = data.linkClickCategories.buckets.map((d, i) => {
      let key = d.key;
      let value = d.total_clicks.value;
      let element = renderMetric(key, value)
      return element
    });

    link_click_categories.unshift(links_clicked_total);

    link_click_categories = link_click_categories.map((d, i) => {
      let className = 'list__item';
      if(i === 0){
        className += '--first'
      } else if (i++ === data.linkClickCategories.buckets.length) {
        className += '--last'
      }
      return <li key={i} style={styles[className]}>{d}</li>;
    });

    return ( <ChunkWrapper component='sectionInteractiveStats' >
      <Row>
        <Col xs={12}>
          <h3>How did the user interact?</h3>
        </Col>
      </Row>
      <Row>
        <Col xs={12} sm={4} >
          <ul style={styles.list}>
            {link_click_categories}
          </ul>
        </Col>
        <Col xs={12} sm={4} >
          <ul style={styles.list}>
            <li style={styles['list__item--first']}>{comments_total}</li>
            <li style={styles.list__item}>{comments_viewed_total}</li>
            <li style={styles['list__item--last']}>{comments_posted_total}</li>
          </ul>
        </Col>
        <Col xs={12} sm={4} >
          <ul style={styles.list}>
            <li style={styles['list__item--first']}>{subscription}</li>
          </ul>
        </Col>
      </Row>
    </ChunkWrapper>);
  }
}
