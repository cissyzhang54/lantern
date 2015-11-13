import React from 'react/addons';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import moment from 'moment';
import LineChart from "../components/LineChart";
import FormatData from "../utils/formatData";
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Popover from 'react-bootstrap/lib/Popover';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import ChunkWrapper from './ChunkWrapper.js';

const styles = {
  infoIcon : {
    'fontSize' : '15px',
    'color': '#039'
  }
}

export default class SectionWhen extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.renderReadTimes && !this.props.renderTimeSincePublished){
      return (<div></div>);
    }

    let dataFormatter = new FormatData(this.props.data, this.props.comparatorData);
    let [timeData, timeID, timeKeys] = dataFormatter.getMetric('readTimes', 'Article');
    let [pubTimeData, pubTimeID, pubTimeKeys] = dataFormatter.getMetric('readTimesSincePublish', 'Article');

    let readTimesChart = (this.props.renderReadTimes)
      ? <LineChart
        data={timeData}
        keys={timeKeys}
        category={timeID}
        yLabel='Page Views'
        xLabel='Time'
        cols={12}
        />
      : {}
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

    return (<ChunkWrapper component='sectionWhen'>
      <Row>
        <Col xs={12}>
          <h3>
            <OverlayTrigger
              trigger="click"
              placement="bottom"
              overlay={
                  <Popover id="chart-description">
                      <p>This chart show page views over time for this article (blue)
                      and average page views for the articles in the selected tag (orange).</p>
                      <p>The time scale (horizontal axis) shows time since publication</p>
                  </Popover>
                  }
              >
              <span>
                <Glyphicon glyph="question-sign" style={styles.infoIcon} aria-describedby="chart-description" />
              </span>
            </OverlayTrigger>
            <span >When did the users view the article?</span>
          </h3>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          {readTimesChart}
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          {timeSincePublishedChart}
        </Col>
      </Row>
    </ChunkWrapper>);
  }
}
