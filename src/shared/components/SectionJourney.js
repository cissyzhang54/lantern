import React from 'react';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import BarChart from '../components/BarChart.js';
import Table from '../components/Table';
import FormatData from "../utils/formatData";
import ChunkWrapper from './ChunkWrapper.js';
import Url from 'url';
import ToolTip from '../components/ToolTip';
import PieChart from "../components/PieChart";


function getReferrerUrls(data) {
  const maxLen = 60;

  var parsed = Url.parse(data[0]);
  let displayString = data[0].length > maxLen ? data[0].substr(0, maxLen) + '…' : data[0];

  if (!/ft.com/.test(parsed.hostname)) {
    displayString = displayString.split('?')[0];
  }

  let title = data[2];
  if (!title || (title === 'Unknown')) title = displayString;
  let url = displayString.indexOf('http') < 0 ? displayString : (
    <a target="_blank"
      href={data[0]}
    >
      {(title !== 'Unknown') ? title : displayString}
    </a>
  );
  return {
    'referrer': url,
    'Views': data[1]
  }
}

export default class SectionReferrers extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.renderReferrers) {
      return <div></div>
    }

    let data = this.props.data;
    let comparatorData = this.props.comparatorData

    // Tables
    let refUrls = this.props.data.referrerUrls.map(getReferrerUrls);
    let internalRefUrls = data.internalReferrerUrls.map(getReferrerUrls);
    let intUrls = data.nextInternalUrl.map(getReferrerUrls);

    // Bar Chart
    let dataFormatter = new FormatData(data, comparatorData);
    let [externalData, externalID, externalKeys] = dataFormatter.getPCTMetric('internalExternalReferrers', 'Article');
    externalData.sort(function(a,b) {
      return b.Article - a.Article
    });

    // Pie Chart
    let referrers = [['internal', data.internalReferrerTotal], ['external', data.referrerTotal]]


    return (<ChunkWrapper component='sectionJourney'>

      <Row>
        <Col xs={12}>
          <h3>How was the user referred to the story?</h3>
        </Col>
      </Row>

      <Row style={{marginTop:"10px"}}>
        <Col xs={12}>
          <h4>
             <ToolTip
               type="html"
               message='explanations.sectionJourney.articleViews.external'
               id={'external-sources-desc'}
             />
             External Sources
          </h4>
        </Col>
      </Row>
      <Row>
        <Col xs={12}
          sm={6}
        >
          <h5>Internal vs External</h5>
          <PieChart
            data={referrers}
            keys={['referrers']}
            />

        </Col>
        <Col xs={12}
             sm={6}
          >
          <h5>Referrers</h5>
          <BarChart
            data={externalData}
            keys={externalKeys}
            category={externalID}
            yLabel="Page Views"
            xLabel="Traffic Source"
            />

        </Col>
      </Row>

      <Row style={{marginTop:"20px"}}>
        <Col xs={12}>
          <h4>Internal Source</h4>
        </Col>
      </Row>

      <Row>
        <Col xs={12}
             sm={6}
          >
          <h5>Top 5 internal sources</h5>
          <Table
            headers={['FT Source', 'Views']}
            rows={internalRefUrls}
            />
        </Col>
        <Col xs={12}
             sm={6}
          >
          <h5>Top 5 external sources</h5>
          <Table
            headers={['Traffic Source', 'Views']}
            rows={refUrls}
            />
        </Col>
      </Row>

      <Row>
        <Col xs={12}
          sm={12}
        >
          <h4>Of those who stayed, where did they go?</h4>
          <Table
            headers={['Next Destination', 'Views']}
            rows={intUrls}
          />
        </Col>
      </Row>
    </ChunkWrapper>);
  }
}
