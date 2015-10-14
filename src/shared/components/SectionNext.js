import React from 'react/addons';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import BarChart from "../components/BarChart";
import FormatData from "../utils/formatData";

export default class SectionWhere extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.renderBounceRate){
      return <div></div>
    }
    let dataFormatter = new FormatData(this.props.data, this.props.comparatorData)
    let [metricData, id, keys] = dataFormatter.getMetric('is_last_page', 'Views', 'Exited FT.com', 'Stayed on FT.com')

    return (<div className='sectionNext'>
      <Row>
        <Col xs={12}>
          <h4>Where did they go next?</h4>
        </Col>
      </Row>
      <Row>
        <Col xs={12} sm={6}>
          <h5>What was the Bounce-Rate?</h5>
          <BarChart
            data={metricData}
            keys={keys}
            category={id}
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
