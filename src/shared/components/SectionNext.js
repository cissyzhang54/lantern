import React from 'react/addons';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import BarChart from "../components/BarChart";
import FormatData from "../utils/formatData";
import Table from '../components/Table';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Popover from 'react-bootstrap/lib/Popover';
import ChunkWrapper from './ChunkWrapper.js';

const styles = {
  infoIcon : {
    'fontSize' : '15px',
    'color': '#039',
    'position': 'absolute',
    'top': '0px',
    'left': '-4px'
  }
};

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
    let [metricData, id, keys] = dataFormatter.getPCTMetric('isLastPage', 'Article', 'Exited FT', 'Stayed on FT')
    let intUrls = this.props.data.nextInternalUrl.map(getReferrerUrls);

    return (<ChunkWrapper component='sectionNext'>
      <Row>
        <Col xs={12}>
          <h3>Where did they go next?</h3>
        </Col>
      </Row>
      <Row>
        <Col xs={12} sm={6}>
          <h5>
            <OverlayTrigger
              trigger="click"
              placement="bottom"
              overlay={
                <Popover id="tag-description">
                    <p>Bounce rate is the number of users that exited the FT after only reading this article</p>
                </Popover>
                }
              >
              <Glyphicon glyph="question-sign" style={styles.infoIcon} />
            </OverlayTrigger>
            What was the Bounce-Rate?
          </h5>
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
          <h4>Of those who stayed where did they go?</h4>
          <Table
            headers={['Next Destination', 'Views']}
            rows={intUrls}
            />
        </Col>
      </Row>
    </ChunkWrapper>);
  }
}
