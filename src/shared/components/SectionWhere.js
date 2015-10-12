import React from 'react/addons';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import BarChart from "../components/BarChart";
import Table from "../components/Table";
import Map from "../components/Map";

const regionLabel = 'Views'
const regionColumn = 'region'

function mapTypes (name, data){
  return {
    [name]: data[0],
    [regionLabel]: data[1]
  };
}

function mapRegions (name, data) {
  return {
    [name]: data[0],
    [regionLabel]: data[1]
  };
}

function merge(name, data, comparatorData, comparatorLabel) {
    let merged = data.map((d) => {
      let i = 0
      while (comparatorData.length && i < comparatorData.length) {
        var cData = comparatorData[i]
        if (cData[name] === d[name]) {
          d[comparatorLabel] = cData[regionLabel]
          comparatorData.splice(i, 1);
          break
        } else {
          i++
        }
      }
      return d;
    });
    comparatorData.forEach(function (cData) {
      merged.push({
        [comparatorLabel]: cData[regionLabel],
        [name]: cData[name],
        [regionLabel]: 0
      });
    })
    return merged
}

export default class SectionWhere extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.renderWhere) {
      return <div></div>
    }

    let data = this.props.data;
    let comparatorData = this.props.comparatorData;
    let comparatorLabel = comparatorData.comparator + ' Average';
    let keys = [regionLabel]
    let countries = data.countries;

    if (comparatorData.comparator) {
      keys.push(comparatorLabel)
    }

    let regions = data.regions.map((data) => mapTypes(regionColumn, data));

    if (comparatorData.regions) {
      let comparatorRegions = comparatorData.regions.map((data) => mapTypes(regionColumn, data));
      regions = merge(regionColumn, regions, comparatorRegions, comparatorLabel)
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
            category={regionColumn}
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
