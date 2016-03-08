import React from 'react';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import ColumnChart from './ColumnChart';
import FormatData from "../utils/formatData";
import ChunkWrapper from './ChunkWrapper.js';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Popover from 'react-bootstrap/lib/Popover';
import Text from './Text'
import ToolTip from '../components/ToolTip';
import FeatureFlag from '../utils/featureFlag';

const styles = {
  infoIcon : {
    'fontSize' : '15px',
    'color': '#039',
    'top': '0px',
    'paddingRight': '8px',
    'cursor': 'pointer'
  },
  toolTip : {
    'white-space': 'pre-wrap'
  }
};

export default class SectionWho extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.renderWho) {
      return <div></div>
    }

    let dataFormatter = new FormatData(this.props.data, this.props.comparatorData)
    let [rfvData, rfvID, rfvKeys] = dataFormatter.getPCTMetric('rfvCluster', 'Article')
    let [returningData, returningID, returningKeys] = dataFormatter.getPCTMetric('isFirstVisit', 'Article', 'New', 'Returning')
    let [cohortData, cohortID, cohortKeys] = dataFormatter.getPCTMetric('userCohort', 'Article')

    const users = (
      <ChunkWrapper component='sectionWhoUsers'>
        <Row>
          <Col xs={12}>
            <h3>Who are the users?</h3>
          </Col>
        </Row>
        <Row>
          <Col xs={12}
            sm={6}
          >
            <h4>User Type</h4>
            <ColumnChart
              data={cohortData}
              keys={cohortKeys}
              category={cohortID}
              yLabel="Page Views"
              xLabel="User Type"
            />
          </Col>
          <Col xs={12}
            sm={6}
          >
            <h4>
              <ToolTip
                type="html"
                message='explanations.barChart.newVsReturning'
                id={'new-vs-returning'}
              />
              New vs Returning
            </h4>
            <ColumnChart
              data={returningData}
              keys={returningKeys}
              category={returningID}
              yLabel="Page Views"
              xLabel="User Type"
            />
          </Col>
        </Row>
      </ChunkWrapper>
    );

    const engagementGroups = (
      <ChunkWrapper component='sectionWhoEngagementGroups'>
        <Row style={{marginTop: "35px"}}>
          <Col xs={12}>
            <h3>Who is this content appealing to?</h3>
          </Col>
        </Row>
        <Row>
          <Col xs={12}
            sm={12}
          >
            <h4>
              <OverlayTrigger
                trigger="click"
                placement="bottom"
                rootClose
                overlay={
                  <Popover id="rfv-description" >
                    <div style={styles.toolTip} >
                      <Text type='html'
                        message='explanations.sectionWho.rfv'
                      />
                    </div>
                  </Popover>
                  }
              >
              <Glyphicon glyph="question-sign"
                style={styles.infoIcon}
              />
              </OverlayTrigger>
              Engagement Groups
            </h4>
            <ColumnChart
              data={rfvData}
              keys={rfvKeys}
              category={rfvID}
              yLabel="Page Views"
              xLabel="User Type"
              reverseMobileAxis
            />
          </Col>
        </Row>
      </ChunkWrapper>
    );
    return (
      <div>
        {FeatureFlag.check('sectionWhoUsers') ? users : null}
        {FeatureFlag.check('sectionWhoEngagementGroups') ? engagementGroups : null}
      </div>
    );
  }
}
