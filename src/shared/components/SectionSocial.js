import React from 'react';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import BarChart from '../components/BarChart';
import MetricList from '../components/MetricList'
import Table from '../components/Table';
import FormatData from '../utils/formatData';
import ChunkWrapper from './ChunkWrapper';

export default class SectionSocial extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let dataFormatter = new FormatData(this.props.data, this.props.comparatorData)
    let [socialData, socialID, socialKeys] = dataFormatter.getPCTMetric('socialReferrers', 'Article')

    let socialTrafficTotal = this.props.data.socialReferrers.reduce((a,b) => (a + b[1]), 0);
    let socialTrafficTotalRow = ['Total traffic from social', socialTrafficTotal];
    let socialTrafficReferrerValues = this.props.data.socialReferrers.slice(0);
    socialTrafficReferrerValues.unshift(socialTrafficTotalRow);
    let socialTrafficList = socialTrafficReferrerValues.map((row, index) => {
      return {
        term:  row[0],
        value: row[1],
        header: (index === 0)
      };
    });


    return (<ChunkWrapper component='sectionSocial'>

      <Row>
        <Col xs={12}>
          <h3>How did the article perform on social media?</h3>
        </Col>
      </Row>

      <Row style={
          {marginTop:"10px"}
        }>
        <Col xs={12} sm={6}>
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
          <MetricList
            items={socialTrafficList}
          />
        </Col>
      </Row>
    </ChunkWrapper>);
  }
}
