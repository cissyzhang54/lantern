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

function getReferrerUrls (data, i){
  const maxLen = 60;
  const displayString = data[0].length > maxLen ? data[0].substr(0, maxLen)+'…' : data[0];
  let url = displayString.indexOf('http')<0 ? displayString : (
    <a target="_blank" href={data[0]} >
      {displayString}
    </a>
  );
  return {
    referrer: url,
    views: data[1]
  };
}

export default class SectionWhere extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.renderReferrers){
      return <div></div>
    }

    let data = this.props.data;
    let comparatorData = this.props.comparatorData;
    let countries = data.countries;
    let regions = data.regions.map((data) => mapTypes('region', data));
    let refs = data.referrer_types.map((data) => mapTypes('referrer', data));
    let socialrefs = data.social_referrers.sort().map((data) => mapTypes('referrer', data));
    let refUrls = data.referrer_urls.map(getReferrerUrls);
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
          <h4>Where did the users come from?</h4>
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
      <Row>
        <Col xs={12}>
          <h5>External Sources</h5>
        </Col>
      </Row>
      <Row>
        <Col xs={12} sm={6}>
          <h6>Referrer Types</h6>
          <BarChart
            data={refs}
            keys={['views']}
            category={'referrer'}
            yLabel="Page Views"
            xLabel="Referrer"
          />
          <h6>Social Networks</h6>
          <BarChart
            data={socialrefs}
            keys={['views']}
            category={'referrer'}
            yLabel="Page Views"
            xLabel="Social Network"
          />
        </Col>
        <Col xs={12} sm={6}>
          <h6>Top URLs</h6>
          <Table
            headers={['Referrer', 'Views']}
            rows={refUrls}
            />
        </Col>
      </Row>
    </div>);
  }
}
