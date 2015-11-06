import React from 'react';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import ColumnChart from './ColumnChart';
import BarChart from "../components/BarChart";
import FormatData from "../utils/formatData";

export default class SectionWho extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.renderWho) {
      return <div></div>
    }

    let dataFormatter = new FormatData(this.props.data, this.props.comparatorData)
    let [rfvData, rfvID, rfvKeys] = dataFormatter.getPCTMetric('rfvCluster', 'Views')
    let [returningData, returningID, returningKeys] = dataFormatter.getPCTMetric('isFirstVisit', 'Views', 'New', 'Returning')
    let [cohortData, cohortID, cohortKeys] = dataFormatter.getPCTMetric('userCohort', 'Views')

    return (
      <div data-component='sectionWho'>
        <Row>
          <Col xs={12}>
            <h4>Who are the users?</h4>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={6}>
            <h5>Cohort</h5>
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
            <h5>New vs Returning</h5>
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
        <Row>
          <Col xs={12} sm={12}>
            <h5>RFV Clusters</h5>
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
      </div>
    );
  }
}
