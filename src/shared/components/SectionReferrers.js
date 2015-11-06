import React from 'react';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import BarChart from '../components/BarChart.js';
import Table from '../components/Table';
import FormatData from "../utils/formatData";

function getReferrerUrls(data, i) {
  const maxLen = 60;
  const displayString = data[0].length > maxLen ? data[0].substr(0, maxLen) + '…' : data[0];
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
    let [refData, refID, refKeys] = dataFormatter.getPCTMetric('referrerTypes', 'Views')
    let [socialData, socialID, socialKeys] = dataFormatter.getPCTMetric('socialReferrers', 'Views')
    let [internalData, internalID, internalKeys] = dataFormatter.getPCTMetric('internalReferrerTypes', 'Views')

    let internalRefTypeChart = this.props.renderInternalRefTypes ? <Col xs={12} sm={6}>
      <h6> Internal Referrer Types</h6>
      <BarChart
        data={internalData}
        keys={internalKeys}
        category={internalID}
        yLabel="Page Views"
        xLabel="Referrer"
        usePercentages={true}
      />
      </Col> : {};

    return (<div data-component='sectionReferrers'>

      <Row>
        <Col xs={12}>
          <h4>Where did the users come from?</h4>
        </Col>
      </Row>

      <Row>
        <Col xs={12}>
          <h5>External Sources</h5>
        </Col>
      </Row>
      <Row>
        <Col xs={12} sm={6}>
          <h6>Referrer Types</h6>
          <BarChart
            data={refData}
            keys={refKeys}
            category={refID}
            yLabel="Page Views"
            xLabel="Referrer"
            usePercentages={true}
            />
          <h6>Social Networks</h6>
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
          <h6>Top URLs</h6>
          <Table
            headers={['Referrer', 'Views']}
            rows={refUrls}
            />
        </Col>
      </Row>

      <Row>
        <Col xs={12}>
          <h5>Internal Sources</h5>
        </Col>
      </Row>

      <Row>
        {internalRefTypeChart}
        <Col xs={12} sm={6}>
          <h6>Top Internal URLs</h6>
          <Table
            headers={['Referrer', 'Views']}
            rows={internalRefUrls}
            />
        </Col>
      </Row>
    </div>);
  }
}
