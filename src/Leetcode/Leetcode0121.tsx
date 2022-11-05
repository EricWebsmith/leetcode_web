import * as d3 from 'd3';
import React, { SetStateAction } from 'react';
import ButtonBar from '../controls/ButtonBar';

export default function Leetcode0121() {
  const [frameIndex, setFrameIndex] = React.useState<number>(0);

  const data = [7, 1, 5, 3, 6, 4];
  const n = data.length;
  const svgRef = React.useRef<SVGSVGElement>(null);

  React.useEffect(() => {
    if (svgRef.current == null) {
      return;
    }
    const padding = 50;
    const w = 1000;
    const h = 500;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();
    const xScale = d3
      .scaleLinear()
      .domain([-1, 7])
      .range([100, w - 50]);

    const yScale = d3
      .scaleLinear()
      .domain([0, 8])
      .range([h - padding, padding]);

    const xAxis = d3.axisBottom(xScale);
    svg
      .append('g')
      .style('font', '32px times')
      .attr('id', 'x-axis')
      .attr('transform', `translate(0, ${h - padding})`)
      .call(xAxis);

    const yAxis = d3.axisLeft(yScale);
    svg
      .append('g')
      .style('font', '32px times')
      .attr('id', 'y-axis')
      .attr('transform', `translate(${padding * 2}, 0)`)
      .call(yAxis);

    svg
      .append('text')
      .style('font', '32px times')
      .attr('transform', 'rotate(-90)')
      .attr('x', -200)
      .attr('y', 140)
      .text('Stock Price');

    for (let x = 0; x < data.length; x++) {
      svg
        .append('circle')
        .attr('cx', `${xScale(x)}`)
        .attr('cy', yScale(data[x]))
        .attr('r', 10)
        .attr('fill', 'blue');
    }

    if (frameIndex > 0) {
      let movingMin = data[0];
      let previousMin = movingMin;
      for (let x = 1; x < Math.min(data.length, frameIndex + 1); x++) {
        previousMin = movingMin;
        movingMin = Math.min(movingMin, data[x]);
        svg
          .append('line')
          .attr('x1', `${xScale(x - 1)}`)
          .attr('y1', yScale(previousMin))
          .attr('x2', xScale(x))
          .attr('y2', yScale(movingMin))
          .attr('stroke-width', 5)
          .attr('stroke', 'red');
      }
    }
  }, [frameIndex]);

  function setIndex(index: SetStateAction<number>) {
    let newIndex = 0;
    if (typeof index == 'number') {
      newIndex = index;
    } else {
      newIndex = index(frameIndex);
    }

    if (newIndex >= 0 && newIndex < n) {
      setFrameIndex(index);
    }
  }

  return (
    <>
      <svg id='svg' ref={svgRef} width={900} height={500}></svg>
      <ButtonBar setIndex={setIndex} />
    </>
  );
}
