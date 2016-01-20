import React from 'react';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import SingleMetric from "./SingleMetric";
import ChunkWrapper from './ChunkWrapper.js';


export default class SectionHeadlineStats extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    function getMetrics (config, data, comparatorData) {
      let keys = Object.keys(config);
      let metrics = [];
      let colWidth = Math.floor(12 / keys.length);
      let isFive = keys.length === 5;
      if (isFive) colWidth = '5ths'
      keys.forEach(function (value, i) {
        let componentConfig = config[value];
        componentConfig.metric = data[value];
        componentConfig.comparatorMetric = comparatorData[config[value].comparatorFormatName] || undefined;
        componentConfig.comparatorName = value || '';

        let component = null
        if (typeof componentConfig.metric !== 'undefined') {
          component = <SingleMetric {...componentConfig} />
        }
        metrics.push(addComponentToColumn(component, colWidth, i));
      });

      return metrics;
    }

    function addComponentToColumn (component, colWidth, i) {
      return (
        <Col
          xs={6}
          sm={colWidth}
          key={i}
        >
          {component}
        </Col>
      )
    }

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
