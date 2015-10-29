import React from 'react/addons';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import BarChart from "../components/BarChart";
import Table from "../components/Table";
import Map from "../components/Map";
import FormatData from "../utils/formatData";

export default class SectionWhere extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.renderWhere) {
      return <div></div>
    }

    let dataFormatter = new FormatData(this.props.data, this.props.comparatorData)
    let [regionData, regionID, regionKeys] = dataFormatter.getPCTMetric('regions', 'Views')

    return (<div data-component='sectionWhere'>
      <Row>
        <Col xs={12}>
          <h4>Where in the world was the article read?</h4>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <h5>Globally</h5>
        </Col>
      </Row>
      <Row>
        <Col xs={12} sm={6}>
          <BarChart
            data={regionData}
            keys={regionKeys}
            category={regionID}
            yLabel="Page Views"
            xLabel="Regions"
            usePercentages={true}
            />
        </Col>
        <Col xs={12} sm={6}>
          <Map
            data={this.props.data.countries}
            />
        </Col>
      </Row>
    </div>);
  }
}
