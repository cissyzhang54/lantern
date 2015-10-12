import React from 'react/addons';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import BarChart from "../components/BarChart";
import Table from "../components/Table";
import Map from "../components/Map";

const articleLabel = 'views'

function mapTypes (name, data){
  return {
    [name]: data[0],
    views: data[1]
  };
}

function mapRegions (name, data){
  return {
    [name]: data[0],
    [articleLabel]: data[1]
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

export default class SectionWhere extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.renderWhere){
      return <div></div>
    }

    let data = this.props.data;
    let comparatorData = this.props.comparatorData;
    let countries = data.countries;
    let regions = data.regions.map((data) => mapTypes('region', data));
    let keys = [articleLabel];

    if (comparatorData.regions){
      let comparatorRegionLabel = comparatorData.comparator + ' Average';
      let comparatorRegion = comparatorData.regions.map((data) => mapRegions('region', data))
      regions = regions.map((d) => merge('region', d, comparatorRegion, comparatorRegionLabel))
      keys.push(comparatorRegionLabel)
    }

    return (<div>
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
            data={regions}
            keys={keys}
            category={'region'}
            yLabel="Page Views"
            xLabel="Regions"
            />
        </Col>
        <Col xs={12} sm={6}>
          <Map
            data={countries}
            />
        </Col>
      </Row>
    </div>);
  }
}
