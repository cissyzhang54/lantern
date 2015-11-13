import React from 'react';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import ColumnChart from './ColumnChart';
import BarChart from "../components/BarChart";
import FormatData from "../utils/formatData";
import ChunkWrapper from './ChunkWrapper.js';
export default class SectionWho extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.renderWho) {
      return <div></div>
    }

    let dataFormatter = new FormatData(this.props.data, this.props.comparatorData)
    let [rfvData, rfvID, rfvKeys] = dataFormatter.getPCTMetric('rfvCluster', 'Article')
    let [returningData, returningID, returningKeys] = dataFormatter.getPCTMetric('isFirstVisit', 'Article', 'New', 'Returning')
    let [cohortData, cohortID, cohortKeys] = dataFormatter.getPCTMetric('userCohort', 'Article')

    return (
      <ChunkWrapper component='sectionWho'>
        <Row>
          <Col xs={12}>
            <h3>Who are the users?</h3>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={6}>
            <h4>User Type</h4>
            <ColumnChart
              data={cohortData}
              keys={cohortKeys}
              category={cohortID}
              yLabel="Page Views"
              xLabel="User Type"
              usePercentages={true}
            />
          </Col>
          <Col xs={12} sm={6}>
            <h4>New vs Returning</h4>
            <ColumnChart
              data={returningData}
              keys={returningKeys}
              category={returningID}
              yLabel="Page Views"
              xLabel="User Type"
              usePercentages={true}
            />
          </Col>
        </Row>
        <Row style={
          {marginTop: "35px"}
          }>
          <Col xs={12}>
            <h3>Who is this content appealing to?</h3>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12}>
            <h4>Engagement Groups</h4>
            <ColumnChart
              data={rfvData}
              keys={rfvKeys}
              category={rfvID}
              yLabel="Page Views"
              xLabel="User Type"
              usePercentages={true}
              />
          </Col>
        </Row>
      </ChunkWrapper>
    );
  }
}
