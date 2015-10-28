import React from 'react/addons';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import BarChart from "../components/BarChart";
import FormatData from "../utils/formatData";
import Table from '../components/Table';

function getReferrerUrls(data, i) {
  const maxLen = 60;
  const displayString = data[0].length > maxLen ? data[0].substr(0, maxLen) + '…' : data[0];
  let url = displayString.indexOf('http') < 0 ? displayString : (
    <a target="_blank" href={data[0]}>
      {displayString}
    </a>
  );
  return {
    'referrer': url,
    'Views': data[1]
  }
}

export default class SectionWhere extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.renderBounceRate){
      return <div></div>
    }
    let dataFormatter = new FormatData(this.props.data, this.props.comparatorData);
    let [metricData, id, keys] = dataFormatter.getPCTMetric('is_last_page', 'Views', 'Exited FT.com', 'Stayed on FT.com')
    let intUrls = this.props.data.next_internal_url.map(getReferrerUrls);

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
            usePercentages={true}
            />
        </Col>
        <Col xs={12} sm={6}>
          <h5>Of those who stayed where did they go?</h5>
          <Table
            headers={['Exit Page', 'Views']}
            rows={intUrls}
            />
        </Col>
      </Row>
    </div>);
  }
}
