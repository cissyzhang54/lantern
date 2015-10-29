import React from 'react/addons';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import moment from 'moment';
import LineChart from "../components/LineChart";
import FormatData from "../utils/formatData";
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Popover from 'react-bootstrap/lib/Popover';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';

const styles = {
  infoIcon : {
    'fontSize' : '15px',
    'color': '#039',
    'position':'Absolute',
    'left': '-4px'

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
    let [timeData, timeID, timeKeys] = dataFormatter.getMetric('readTimes', 'Value');
    let [pubTimeData, pubTimeID, pubTimeKeys] = dataFormatter.getMetric('readTimesSincePublish', 'Value');

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

    return (<div data-component='sectionWhen'>
      <Row>
        <Col xs={12}>
          <h4>
            <OverlayTrigger
              trigger="hover"
              placement="bottom"
              overlay={
                  <Popover >
                      <p>This chart show page views over time for this article (blue)
                      and average page views for the articles in the selected tag (orange).</p>
                      <p>The time scale (horizontal axis) shows time since publication</p>
                  </Popover>
                  }
              >
              <span>
                <Glyphicon glyph="question-sign" style={styles.infoIcon} />
              </span>
            </OverlayTrigger>
            <span >When did users access the article?</span>
          </h4>
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
    </div>);
  }
}
