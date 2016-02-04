import React from 'react';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import moment from 'moment';
import LineChart from "../components/LineChart";
import Text from '../components/Text'
import FormatData from "../utils/formatData";
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Popover from 'react-bootstrap/lib/Popover';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import ChunkWrapper from './ChunkWrapper.js';

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
    console.log( this.props.data)
    let [timeData, timeID, timeKeys] = this.props.data;

    return (<ChunkWrapper component='sectionWhen'>
      <Row>
        <Col xs={12}>
          <h3>
            <OverlayTrigger
              trigger="click"
              placement="bottom"
              overlay={
                <Popover id="chart-description">
                  <p><Text message='explanations.sectionWhen.articleViews' /></p>
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
            cols={12}
          />
        </Col>
      </Row>
    </ChunkWrapper>);
  }
}
