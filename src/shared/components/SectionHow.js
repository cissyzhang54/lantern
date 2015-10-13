import React from 'react/addons';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import PieChart from "../components/PieChart";

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
      <h5>Devices:</h5>
      <PieChart
        data={this.props.data.devices}
        keys={['views']}
        />
    </Col> : {}
    let channelComponent = renderChannels ? <Col xs={6}>
      <h5>Channels:</h5>
      <PieChart
        data={this.props.data.channels}
        keys={['views']}
        />
    </Col> : {}

    return (<div className='sectionHow'>
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
