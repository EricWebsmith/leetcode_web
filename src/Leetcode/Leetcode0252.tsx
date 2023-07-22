import * as d3 from 'd3';
import { SetStateAction, useEffect, useRef, useState } from 'react';

import ButtonBar from '../controls/ButtonBar';

export default function Leetcode0252() {
  const [frameIndex, setFrameIndex] = useState<number>(0);
  const w = 900;
  const h = 400;

  const svgRef = useRef<SVGSVGElement>(null);
  const intervals = [
    [0, 30],
    [5, 10],
    [15, 20],
  ];

  useEffect(() => {
    if (svgRef.current == null) {
      return;
    }
    const padding = 50;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();
    const xScale = d3
      .scaleLinear()
      .domain([-1, 31])
      .range([100, w - 50]);

    const yScale = d3
      .scaleLinear()
      .domain([0, 4])
      .range([h - padding, padding]);

    const xAxis = d3.axisBottom(xScale);
    svg
      .append('g')
      .style('font', '32px times')
      .attr('id', 'x-axis')
      .attr('transform', `translate(0, ${h - padding})`)
      .call(xAxis);

    for (const [index, [start, end]] of intervals.entries()) {
      svg
        .append('line')
        .attr('x1', `${xScale(start)}`)
        .attr('y1', yScale(index + 1))
        .attr('x2', `${xScale(end)}`)
        .attr('y2', yScale(index + 1))
        .attr('stroke', 'blue')
        .attr('stroke-width', 10);

      svg
        .append('circle')
        .attr('cx', xScale(start))
        .attr('cy', yScale(index + 1))
        .attr('r', 10)
        .attr('fill', 'blue');

      svg
        .append('circle')
        .attr('cx', xScale(end))
        .attr('cy', yScale(index + 1))
        .attr('r', 10)
        .attr('fill', 'blue');
    }

    if (frameIndex > 0) {
      const x = xScale(intervals[frameIndex - 1][0]);
      svg
        .append('line')
        .attr('x1', x)
        .attr('y1', yScale(0))
        .attr('x2', x)
        .attr('y2', yScale(4))
        .attr('stroke-width', 5)
        .attr('stroke', 'red');
    }
  }, [frameIndex]);

  function setIndex(index: SetStateAction<number>) {
    let newIndex = 0;
    if (typeof index == 'number') {
      newIndex = index;
    } else {
      newIndex = index(frameIndex);
    }

    if (newIndex >= 0 && newIndex < intervals.length + 1) {
      setFrameIndex(index);
    }
  }

  return (
    <>
      <svg id='svg' ref={svgRef} width={w} height={h}></svg>
      <ButtonBar setIndex={setIndex} />
    </>
  );
}
