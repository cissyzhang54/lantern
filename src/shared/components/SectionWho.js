import React from 'react';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import ColumnChart from './ColumnChart';
import BarChart from "../components/BarChart";

const articleLabel = 'Views'
const COHORT = 'cohort'
const USER_TYPE = 'user_type'

function mapTypes (name, data){
  return {
    [name]: data[0],
    [articleLabel]: data[1]
  };
}
function removePrefix (data){
  return {
    [USER_TYPE] : data[0].replace(/\d+\./g,'').trim(),
    [articleLabel] : data[1]
  };
}

function merge(name, data, comparatorData, comparatorLabel){
  comparatorData.forEach(function(cData){
    if (cData[name] === data[name]){
      data[comparatorLabel] = cData[articleLabel]
    }
  })
  return data;
}

function renameDataKey(data){
  let label = data[0] === "T" ? 'New' : 'Returning';
  return mapTypes(USER_TYPE, [label, data[1]])
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
    let comparatorRFV, comparatorFirstVisit, comparatorCohort, comparatorLabel;
    comparatorLabel = comparatorData.comparator + ' Average';
    let keys = [articleLabel];
    let cohort = data.user_cohort.map((data) => mapTypes(COHORT, data) );
    let newVsReturning = data.is_first_visit.map(renameDataKey);
    let rfv_cluster = data.rfv_cluster.map(removePrefix);

    if (comparatorData.comparator) {
      keys.push(comparatorLabel)
    }
    if (comparatorData.rfv_cluster){
      comparatorRFV = comparatorData.rfv_cluster.map(removePrefix)
      rfv_cluster = rfv_cluster.map((d) => merge(USER_TYPE, d, comparatorRFV, comparatorLabel))
    }
    if (comparatorData.is_first_visit){
      comparatorFirstVisit = comparatorData.is_first_visit.map(renameDataKey)
      newVsReturning = newVsReturning.map((d) => merge(USER_TYPE, d, comparatorFirstVisit, comparatorLabel))
    }
    if (comparatorData.user_cohort){
      comparatorCohort = comparatorData.user_cohort.map((data) => mapTypes(COHORT, data))
      cohort = cohort.map((d) => merge(COHORT, d, comparatorCohort, comparatorLabel))
    }

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
              keys={keys}
              category={COHORT}
              yLabel="Page Views"
              xLabel="User Type"
            />
          </Col>
          <Col xs={12} sm={6}>
            <h5>New vs Returning</h5>
            <ColumnChart
              data={newVsReturning}
              keys={keys}
              category={USER_TYPE}
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
              keys={keys}
              category={USER_TYPE}
              yLabel="Page Views"
              xLabel="User Type"
              />
          </Col>
        </Row>
      </div>
    );
  }

}
