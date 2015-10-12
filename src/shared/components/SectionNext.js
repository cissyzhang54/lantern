import React from 'react/addons';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import BarChart from "../components/BarChart";

const articleLabel = 'Users'
const articleColumn = 'bounce'

function mapTypes(name, data){
  return {
    [name]: data[0],
    [articleLabel]: data[1],
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
  let label = data[0] === "T" ? 'Exited FT.com' : 'Stayed on FT.com';
  return mapTypes(articleColumn, [label, data[1]])
}

export default class SectionWhere extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.renderBounceRate){
      return <div></div>
    }

    let data = this.props.data;
    let comparatorData = this.props.comparatorData;
    let comparatorBounce, comparatorLabel;
    comparatorLabel = comparatorData.comparator + ' Average';
    let keys = [articleLabel]
    let bounce = data.is_last_page.map(renameDataKey);
    if (comparatorData.is_last_page){
      comparatorBounce = comparatorData.is_last_page.map(renameDataKey)
      bounce = bounce.map((d) => merge(articleColumn, d, comparatorBounce, comparatorLabel))
      keys.push(comparatorLabel)
    }

    return (<div>
      <Row>
        <Col xs={12}>
          <h4>Where did they go next?</h4>
        </Col>
      </Row>
      <Row>
        <Col xs={12} sm={6}>
          <h5>What was the Bounce-Rate?</h5>
          <BarChart
            data={bounce}
            keys={keys}
            category={articleColumn}
            yLabel="Users"
            xLabel=""
            />
        </Col>
        <Col xs={12} sm={6}>

        </Col>
      </Row>
    </div>);
  }
}
