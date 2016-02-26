import React from 'react';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import LineChart from "../components/LineChart";
import Text from '../components/Text'
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Popover from 'react-bootstrap/lib/Popover';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import ChunkWrapper from './ChunkWrapper.js';
import moment from 'moment';

const styles = {
  infoIcon : {
    'fontSize' : '15px',
    'color': '#039',
    cursor:'pointer'
  }
}

export default class SectionWhen extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let [timeData, timeID, timeKeys] = this.props.graphData;
    let publishDates = this.props.lastPublishDates.map((d, i) => {
      return {
        value: moment(d.key_as_string).toISOString(),
        text: (i) ? 'Republished' : 'Published'
      }
    })

    // Update the first data point to match the publish time
    // as the aggs are in hours not minutes
    if(this.props.lastPublishDates.length > 0) {
      timeData[0].category = this.props.lastPublishDates[0].key_as_string
    }

    return (<ChunkWrapper component='sectionWhen'>
      <Row>
        <Col xs={12}>
          <h3>
            <OverlayTrigger
              trigger="click"
              placement="bottom"
              rootClose
              overlay={
                <Popover id="chart-description">
                  <p><Text message='explanations.sectionWhen.articleViews.historical' /></p>
                </Popover>
              }
            >
              <span>
                <Glyphicon
                  glyph="question-sign"
                  style={styles.infoIcon}
                  aria-describedby="chart-description"
                />
              </span>
            </OverlayTrigger>
            <span >When did the users view the article?</span>
          </h3>
          <h4>{this.props.title}</h4>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <LineChart
            data={timeData}
            keys={timeKeys}
            category={timeID}
            yLabel={this.props.selectedGraphYLabel}
            xLabel='Time since Published'
            marks={publishDates}
            cols={12}
          />
        </Col>
      </Row>
    </ChunkWrapper>);
  }
}

SectionWhen.defaultProps = {
  lastPublishDates: []
}
