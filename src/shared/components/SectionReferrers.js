import React from 'react';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import BarChart from '../components/BarChart.js';
import Table from '../components/Table';

const referrerLabel = 'Views'
const referrerColumn = 'referrer'

function mapTypes (name, data){
  return {
    [name]: data[0],
    [referrerLabel]: data[1]
  };
}

function merge(name, data, comparatorData, comparatorLabel) {
  let merged = data.map((d) => {
    let i = 0
    while (comparatorData.length && i < comparatorData.length) {
      var cData = comparatorData[i]
      if (cData[name] === d[name]) {
        d[comparatorLabel] = cData[referrerLabel]
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
      [comparatorLabel]: cData[referrerLabel],
      [name]: cData[name],
      [referrerLabel]: 0
    });
  })
  return merged
}

function getReferrerUrls(data, i) {
  const maxLen = 60;
  const displayString = data[0].length > maxLen ? data[0].substr(0, maxLen) + '…' : data[0];
  let url = displayString.indexOf('http') < 0 ? displayString : (
    <a target="_blank" href={data[0]}>
      {displayString}
    </a>
  );
  return mapTypes(referrerColumn, [url, data[1]])
}

export default class SectionReferrers extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.renderReferrers) {
      return <div></div>
    }

    let data = this.props.data;
    let comparatorData = this.props.comparatorData;
    let comparatorLabel = comparatorData.comparator + ' Average';
    let keys = [referrerLabel]
    if (comparatorData.comparator) {
      keys.push(comparatorLabel)
    }

    let refUrls = data.referrer_urls.map(getReferrerUrls);

    let refs = data.referrer_types.map((data) => mapTypes(referrerColumn, data));
    if (comparatorData.referrer_types) {
      let comparatorRefTypes = comparatorData.referrer_types.map((data) => mapTypes(referrerColumn, data));
      refs = merge(referrerColumn, refs, comparatorRefTypes, comparatorLabel)
    }

    let socialRefs = data.social_referrers.sort().map((data) => mapTypes(referrerColumn, data));
    if (comparatorData.social_referrers) {
      let comparatorSocial = comparatorData.social_referrers.map((data) => mapTypes(referrerColumn, data));
      socialRefs = merge(referrerColumn, socialRefs, comparatorSocial, comparatorLabel)
    }

    return (<div>

      <Row>
        <Col xs={12}>
          <h4>Where did the users come from?</h4>
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
            keys={keys}
            category={referrerColumn}
            yLabel="Page Views"
            xLabel="Referrer"
            />
          <h6>Social Networks</h6>
          <BarChart
            data={socialRefs}
            keys={keys}
            category={referrerColumn}
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
