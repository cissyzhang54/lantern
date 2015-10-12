import React from 'react';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import ColumnChart from './ColumnChart';
import BarChart from "../components/BarChart";

function mapTypes (name, data){
  return {
    [name]: data[0],
    views: data[1]
  };
}
function removePrefix (data){
  return {
    'user_type' : data[0].replace(/\d+\./g,''),
    'views' : data[1]
  };
}
function renameDataKey (data) {
  let newData = data.slice();
  if (newData[0] === 'T') {
    newData[0] = 'New';
  }
  if (newData[0] === 'F') {
    newData[0] = 'Returning';
  }
  return mapTypes('user_type', newData);
}

export default class SectionWho extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.renderWho) {
      return <div></div>
    }

    let data = this.props.data;
    let comparatorData = this.props.comparatorData;
    let cohort = data.user_cohort.map((data) => mapTypes('cohort', data) );
    let newVsReturning = data.is_first_visit.map(renameDataKey);
    let rfv_cluster = data.rfv_cluster.map(removePrefix);

    return (
      <div>
        <Row>
          <Col xs={12}>
            <h4>Who are the users?</h4>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={6}>
            <h5>Cohort</h5>
            <ColumnChart
              data={cohort}
              keys={['views']}
              category={'cohort'}
              yLabel="Page Views"
              xLabel="User Type"
            />
          </Col>
          <Col xs={12} sm={6}>
            <h5>New vs Returning</h5>
            <ColumnChart
              data={newVsReturning}
              keys={['views']}
              category={'user_type'}
              yLabel="Page Views"
              xLabel="User Type"
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12}>
            <h5>RFV Clusters</h5>
            <ColumnChart
              data={rfv_cluster}
              keys={['views']}
              category={'user_type'}
              yLabel="Page Views"
              xLabel="User Type"
              />
          </Col>
        </Row>
      </div>
    );
  }

}
