import React from 'react';
import d3 from 'd3';

export default class Sparkline extends React.Component {

  constructor(props) {
    super(props)
    this.xScale = d3.scale.linear();
    this.yScale = d3.scale.linear();
    this.path = d3.svg.line()
      .interpolate('basis')
      .x((d, i) => this.xScale(i))
      .y((d) => this.yScale(d[1]));
  }

  drawChart(container) {
    this.xScale
      .range([0, this.props.width])
      .domain([0, this.props.data.length])
    this.yScale
      .range([this.props.height, 0])
      .domain([0, d3.max(this.props.data, (d) => d[1])])

    const cont = d3.select(container);
    const svg = cont.selectAll('svg')
      .data([this.props.data]);

    const svgEnter = svg.enter().append('svg');

    svgEnter.append('path')
      .attr('class', 'sparkline')

    svg
      .attr('height', this.props.height)
      .attr('width', this.props.width);

    svg.select('path.sparkline')
    .attr('d', this.path)
    .attr('stroke', 'blue')
    .attr('fill', 'none')

  }


  render() {
    const refHandler = this.drawChart.bind(this);
    return (
      <div className="sparkline"
        ref={refHandler}
      >
      </div>
    );

  }
}

Sparkline.defaultProps = {
  data : [
    [0, 2],
    [1, 3],
    [2, 4],
    [3, 1],
    [4, 1]
  ],
  height: 45,
  width: 100

}
