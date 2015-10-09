import React from 'react';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import PieChart from "../components/PieChart";
import ChunkWrapper from './ChunkWrapper.js';

export default class SectionHow extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let renderDevices = this.props.renderDevices;
    let renderChannels = this.props.renderChannels;
    if (!renderDevices && !renderChannels){
      return <div></div>
    }

    let deviceComponent = renderDevices ? <Col xs={6}>
      <h4>Devices:</h4>
      <PieChart
        data={this.props.data.devices}
        keys={['views']}
        />
    </Col> : {}
    let channelComponent = renderChannels ? <Col xs={6}>
      <h4>Channels:</h4>
      <PieChart
        data={this.props.data.channels}
        keys={['views']}
        />
    </Col> : {}

    return (<ChunkWrapper component='sectionHow'>
      <Row>
        <Col xs={12}>
          <h3>How did users access the article?</h3>
        </Col>
      </Row>
      <Row>
        {deviceComponent}
        {channelComponent}
      </Row>
    </ChunkWrapper>);
  }
}
