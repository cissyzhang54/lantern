import React from 'react/addons';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import moment from 'moment';
import LineChart from "../components/LineChart";
import FormatData from "../utils/formatData";

export default class SectionWhen extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.renderReadTimes){
      return (<div></div>);
    }

    let dataFormatter = new FormatData(this.props.data, this.props.comparatorData);
    let [timeData, timeID, timeKeys] = dataFormatter.getMetric('readTimes', 'Value');
    let [pubTimeData, pubTimeID, pubTimeKeys] = dataFormatter.getMetric('readTimesSincePublish', 'Value');

    let timeSincePublishedChart = (this.props.renderTimeSincePublished)
      ? <LineChart
      data={pubTimeData}
      keys={pubTimeKeys}
      category={pubTimeID}
      type='indexed'
      yLabel='Page Views Since Publish date'
      xLabel='Time since Published'
      cols={12}
      />
      : {}

    return (<div className='sectionWhen'>
      <Row>
        <Col xs={12}>
          <h4>When did users access the article?</h4>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <LineChart
            data={timeData}
            keys={timeKeys}
            category={timeID}
            yLabel='Page Views'
            xLabel='Time'
            cols={12}
            />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          {timeSincePublishedChart}
        </Col>
      </Row>
    </div>);
  }
}
