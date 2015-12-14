import React from 'react';
import ReactDOM from 'react-dom';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import isBrowser from '../utils/isBrowser';
import d3 from 'd3';
import _ from 'underscore';

let Datamap = function() {};

if (isBrowser()) {
  Datamap = require('datamaps');
}

export default class DataMap extends React.Component {

  constructor(props) {
    super(props);
  }

  drawMap() {
    let node = this.refs.mapContainer;
    let dataset = {};

    const domain = d3.extent(this.props.data, d => d[1]);

    let scale = d3.scale.linear()
      .domain(domain)
      .range(['#EFEFFF', '#02386F']);

    this.props.data.forEach((d) => {
      dataset[d[0]] = {
        fillColor : scale(d[1]),
        numberOfThings: d[1]
      };
    });


    this.map = new Datamap({
      element: node,
      responsive: true,
      projection: 'mercator',
      fills: { defaultFill: '#cbcbcf' },
      data: dataset,
      geographyConfig: {
        popupTemplate: (geo, data) => {
          let num = data ? data.numberOfThings : 0;
          let name = geo.properties.name;
          return ['<div class="hoverinfo"><strong>',
            'Visitors in ' + name,
            ': ' + num,
            '</strong></div>'].join('');
          }
      }
    });
    this.map.legend();

    this.setupHandler();
  }

  setupHandler() {
    this.resizeHandler = _.debounce(() => {
      this.map.resize();
    }, 250);
    window.addEventListener('resize', this.resizeHandler);
  }

  componentDidMount() {
    this.drawMap();
  }

  componentDidUpdate() {
    let node = this.refs.mapContainer;
    node.innerHTML = '';
    window.removeEventListener('resize', this.resizeHandler);
    this.drawMap();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeHandler)
  }

  render() {
    const divStyle = {
    };
    return (
      <div data-component='map'>
        <div style={divStyle} ref="mapContainer" id="mapContainer"></div>
      </div>
    );
  }

}

DataMap.defaultProps = {
  data : [['GBR', 0]]
}
