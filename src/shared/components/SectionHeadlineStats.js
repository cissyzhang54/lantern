import React from 'react/addons';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import SingleMetric from "./SingleMetric";
import FeatureFlag from '../utils/featureFlag';
import ChunkWrapper from './ChunkWrapper.js';

function getMetrics (config, data, comparatorData) {
  let keys = Object.keys(config);
  let metrics = [];
  let colWidth = 12 / keys.length;

  keys.forEach(function (value) {
    let componentConfig = config[value];
    componentConfig.metric = data[value];
    componentConfig.comparatorMetric = comparatorData[config[value].comparatorFormatName] || undefined;
    componentConfig.comparatorName = data[value] || '';

    let component = <SingleMetric {...componentConfig} />
    metrics.push(addComponentToColumn(component, colWidth));
  });

  return metrics;
}

function addComponentToColumn (component, colWidth) {
  return (
    <Col xs={12} sm={colWidth}>
      {component}
    </Col>
  )
}

export default class SectionHeadlineStats extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let config = this.props.config;
    let data = this.props.data;
    if (!Object.keys(data).length) return (<div></div>);
    let comparatorData = this.props.comparatorData;
    let metricsComponents = getMetrics(config, data, comparatorData);

    return (
    <ChunkWrapper component='SectionHeadlineStats'>
     <Row data-component='sectionHeadlineStats' >
      <Col xs={12} >
        {metricsComponents}
      </Col>
    </Row>
    </ChunkWrapper>
    );
  }
}
