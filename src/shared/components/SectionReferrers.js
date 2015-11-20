import React from 'react';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import BarChart from '../components/BarChart.js';
import Table from '../components/Table';
import FormatData from "../utils/formatData";
import ChunkWrapper from './ChunkWrapper.js';
import Url from 'url';

function getReferrerUrls(data, i) {
  const maxLen = 60;

  var parsed = Url.parse(data[0]);
  let displayString = data[0].length > maxLen ? data[0].substr(0, maxLen) + '…' : data[0];

  if (!/ft.com/.test(parsed.hostname)) {
    displayString = displayString.split('?')[0];
  }
  let url = displayString.indexOf('http') < 0 ? displayString : (
    <a target="_blank" href={data[0]}>
      {displayString}
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

    let refUrls = this.props.data.referrerUrls.map(getReferrerUrls);
    let internalRefUrls = this.props.data.internalReferrerUrls.map(getReferrerUrls);
    let dataFormatter = new FormatData(this.props.data, this.props.comparatorData)
    let [refData, refID, refKeys] = dataFormatter.getPCTMetric('referrerTypes', 'Article')
    let [socialData, socialID, socialKeys] = dataFormatter.getPCTMetric('socialReferrers', 'Article')
    let [internalData, internalID, internalKeys] = dataFormatter.getPCTMetric('internalReferrerTypes', 'Article')

    let internalRefTypeChart = this.props.renderInternalRefTypes ? <Col xs={12} sm={6}>
      <h5>FT Traffic Source</h5>
      <BarChart
        data={internalData}
        keys={internalKeys}
        category={internalID}
        yLabel="Page Views"
        xLabel="Referrer"
        usePercentages={true}
      />
      </Col> : {};

    return (<ChunkWrapper component='sectionReferrers'>

      <Row>
        <Col xs={12}>
          <h3>Where did the users come from?</h3>
        </Col>
      </Row>

      <Row style={
          {marginTop:"10px"}
        }>
        <Col xs={12}>
          <h4>External Sources</h4>
        </Col>
      </Row>
      <Row>
        <Col xs={12} sm={6}>
          <h5>Traffic Source</h5>
          <BarChart
            data={refData}
            keys={refKeys}
            category={refID}
            yLabel="Page Views"
            xLabel="Traffic Source"
            usePercentages={true}
            />
          <h5>Social Networks</h5>
          <BarChart
            data={socialData}
            keys={socialKeys}
            category={socialID}
            yLabel="Page Views"
            xLabel="Social Network"
            usePercentages={true}
            />
        </Col>
        <Col xs={12} sm={6}>
          <h5>Top URLs</h5>
          <Table
            headers={['Traffic Source', 'Views']}
            rows={refUrls}
            />
        </Col>
      </Row>

      <Row style={
          {marginTop:"20px"}
        }>
        <Col xs={12}>
          <h4>FT Source</h4>
        </Col>
      </Row>

      <Row>
        {internalRefTypeChart}
        <Col xs={12} sm={6}>
          <h5>Top Internal URLs</h5>
          <Table
            headers={['FT Source', 'Views']}
            rows={internalRefUrls}
            />
        </Col>
      </Row>
    </ChunkWrapper>);
  }
}
