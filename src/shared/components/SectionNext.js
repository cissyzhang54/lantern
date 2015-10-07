import React from 'react/addons';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import FeatureFlag from '../utils/featureFlag';
import PieChart from "../components/PieChart";

export default class SectionWhere extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    if (!FeatureFlag.check('article:bounceRate')){
      return <div></div>
    }

    let data = this.props.data;
    let comparatorData = this.props.comparatorData;
    let is_last_page = data.is_last_page.map((d)=> {
      is_last_page = d[0] === "T" ? 'Exited FT.com' : 'Stayed on FT.com';
      return [is_last_page, d[1]]
    });

    return (<div>
      <Row>
        <Col xs={12}>
          <h4>Where did they go next?</h4>
        </Col>
      </Row>
      <Row>
        <Col xs={12} sm={6}>
          <h5>What was the Bounce-Rate?</h5>
          <PieChart
            data={is_last_page}
            keys={['views']}
            />
        </Col>
        <Col xs={12} sm={6}>

        </Col>
      </Row>
    </div>);
  }
}
