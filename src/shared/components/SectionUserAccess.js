import React from 'react/addons';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import PieChart from "../components/PieChart";
import FeatureFlag from '../utils/featureFlag';

export default class SectionUserAccess extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let renderDevices = FeatureFlag.check('article:devices');
    let renderChannels = FeatureFlag.check('article:channels');
    if (!renderDevices && !renderChannels){
      return <div></div>
    }

    let data = this.props.data;
    let comparatorData = this.props.comparatorData;
    let devices = data.devices;
    let channels = data.channels;
    let deviceComponent = renderDevices ? <Col xs={6}>
      <h5>Devices:</h5>
      <PieChart
        data={devices}
        keys={['views']}
        />
    </Col> : {}
    let channelComponent = renderChannels ? <Col xs={6}>
      <h5>Channels:</h5>
      <PieChart
        data={channels}
        keys={['views']}
        />
    </Col> : {}

    return (<div>
      <Row>
        <Col xs={12}>
          <h4>How did users access the article?</h4>
        </Col>
      </Row>
      <Row>
        {deviceComponent}
        {channelComponent}
      </Row>
    </div>);
  }
}
