import React from 'react';
import DocumentTitle from 'react-document-title';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import connectToStores from 'alt-utils/lib/connectToStores';
import FeatureFlag from '../utils/featureFlag';
import responsiveStyles from '../utils/responsiveStyles';
import FormatData from "../utils/formatData";
import Header from '../components/Header';
import Messaging from '../components/Messaging';
import ErrorHandler from '../components/ErrorHandler';
import SectionModifier from '../components/SectionModifier';
import SectionHeadlineStats from '../components/SectionHeadlineStats';
import SectionWho from '../components/SectionWho';
import DualScaleLineChart from "../components/DualScaleLineChart";
import ChunkWrapper from "../components/ChunkWrapper";
import SectionWhere from '../components/SectionWhere';
import BarChart from '../components/BarChart.js';
import Table from '../components/Table.js';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import AnalyticsActions from '../actions/AnalyticsActions';
import AnalyticsStore from '../stores/AnalyticsStore';
import _ from 'underscore';
import moment from 'moment';

const componentStyles = {
  'default': {
    tagStyle : {
      fontSize: '15px',
      marginLeft: '8px'
    }
  },
  '(max-width: 500px)': {

  }
};

function decode(uri){
  return uri ? decodeURI(uri) : null
}

class TopArticlesView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      responsiveStyles : componentStyles['default']
    };
  }

  static getStores() {
    return [AnalyticsStore];
  }

  static getPropsFromStores() {
    return AnalyticsStore.getState();
  }

  componentWillMount() {
    AnalyticsActions.updateQuery({
      type: 'topArticles'
    });
  }

  componentWillUnmount(){
    responsiveStyles.removeListeners(this);
    AnalyticsActions.destroy();
  }

  componentDidMount() {
    responsiveStyles.addListeners(this, componentStyles);
    let analytics = require('../utils/analytics');
    analytics.sendGAEvent('pageview');
    analytics.trackScroll();
  }

  componentWillUpdate(nextProps) {
    if (!_.isEqual(nextProps.params, this.props.params)) {
      AnalyticsActions.updateQuery.defer(nextProps.params);
    }
  }


  render() {
    let styles = this.state.responsiveStyles;
    let data = this.props.data;
    let title = (data) ? 'Lantern - Top Articles' : '';

    let dataFormatter = new FormatData(this.props.data, this.props.comparatorData);
    let today = moment().subtract(1, 'days');
    let top5Date = today.format('dddd MMMM Do YYYY');

    let avg_time_rows = data.timeOnPageTop.map((d, i) => {
      let uuid = d.key;
      let avg = d.avg_time_on_page.value;
      let title = d.title.buckets[0].key

      let seconds = Math.abs(avg)
      let metricMinutes = Math.floor(seconds / 60);
      let metricSeconds = Math.floor(seconds - metricMinutes * 60);
      avg = `${metricMinutes}m ${metricSeconds}s`

      let author = d.author.buckets.map((d,i) => {
        return d.key;
      }).toString();

      let titleUrl = <a href={`http://www.ft.com/cms/s/${uuid}.html`}>{title}<Glyphicon glyph="new-window" style={styles.tagStyle} /></a>;
      let lanternUrl = <a href={`/landing/article/${uuid}`}> <Glyphicon glyph="stats" style={styles.tagStyle} /></a>;

      return [
        titleUrl, author, avg, lanternUrl
      ];
    });

    let updating
    if (this.props.loading) {
      updating = (
        <Messaging
          category="Section"
          type="UPDATING"
        />
      );
    }
    else {
      updating = (
        <Messaging
          category="Section"
          type="PLACEHOLDER"
        />
      );
    }

    return(<DocumentTitle title={title}>
      <div>
        <ChunkWrapper component="header">
          {updating}

          <Header
            title={'Pick of the day'}
            subHeading={`Articles first published between 00:00 and 23:59 GMT on ${top5Date}`}
          />
        </ChunkWrapper>

        <ChunkWrapper component="Top5TimeSpentOnPage">
          <Row>
            <Col xs={12}>
              <h3>Top 5 - Time spent on page</h3>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Table
                headers={['Article', 'Author', 'Time']}
                rows={avg_time_rows}
              />
            </Col>
          </Row>
        </ChunkWrapper>

        <ChunkWrapper component="Top5KeptOnFt">
          <Row>
            <Col xs={12}>
              <h3>Top 5 - Articles that kept readers on FT.com</h3>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Table
                headers={['Article', 'Author(s)', 'Time']}
                rows={[{Article: 'Article title', Author: 'Somebody important', Time: 3}, {Article: 'Another article', Author: 'Some peeps', Time: 4}]}
              />
            </Col>
          </Row>
        </ChunkWrapper>

        <ChunkWrapper component="Top5MostCommented">
          <Row>
            <Col xs={12}>
              <h3>Top 5 - Most commented</h3>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Table
                headers={['Article', 'Author(s)', 'Time']}
                rows={[{Article: 'Article title', Author: 'Somebody important', Time: 3}, {Article: 'Another article', Author: 'Some peeps', Time: 4}]}
              />
            </Col>
          </Row>
        </ChunkWrapper>

        <ChunkWrapper component="Top5PageViews">
          <Row>
            <Col xs={12}>
              <h3>Top 5 - Number of page views</h3>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Table
                headers={['Article', 'Author(s)', 'Time']}
                rows={[{Article: 'Article title', Author: 'Somebody important', Time: 3}, {Article: 'Another article', Author: 'Some peeps', Time: 4}]}
              />
            </Col>
          </Row>
        </ChunkWrapper>

        <ChunkWrapper component="Top5FromSocialMedia">
          <Row>
            <Col xs={12}>
              <h3>Top 5 - Traffic from social media</h3>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Table
                headers={['Article', 'Author(s)', 'Time', ""]}
                rows={[{Article: 'Article title', Author: 'Somebody important', Time: 3}, {Article: 'Another article', Author: 'Some peeps', Time: 4}]}
              />
            </Col>
          </Row>
        </ChunkWrapper>
      </div>
    </DocumentTitle>)
  }
}

export default connectToStores(TopArticlesView);
