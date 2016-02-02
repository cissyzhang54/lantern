import React from 'react';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import BarChart from "../components/BarChart";
import Map from "../components/Map";
import FormatData from "../utils/formatData";
import ChunkWrapper from "./ChunkWrapper.js";

export default class SectionWhere extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.renderWhere) {
      return <div></div>
    }

    let dataFormatter = new FormatData(this.props.data, this.props.comparatorData)
    let [regionData, regionID, regionKeys] = dataFormatter.getPCTMetric('regions', 'Article')

    return (<ChunkWrapper component='sectionWhere'>
      <Row>
        <Col xs={12}>
          <h3>Where in the world was the article read?</h3>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <h4>Globally</h4>
        </Col>
      </Row>
      <Row>
        <Col xs={12}
          sm={6}
        >
          <BarChart
            data={regionData}
            keys={regionKeys}
            category={regionID}
            yLabel="Page Views"
            xLabel="Regions"
          />
        </Col>
        <Col xs={12}
          sm={6}
        >
          <Map
            data={this.props.data.countries}
          />
        </Col>
      </Row>
    </ChunkWrapper>);
  }
}
