import * as d3 from 'd3';
import { SetStateAction, useEffect, useRef, useState } from 'react';
import ButtonBar from '../controls/ButtonBar';

export default function Leetcode0056() {
  const [frameIndex, setFrameIndex] = useState<number>(0);
  const w = 900;
  const h = 400;

  const svgRef = useRef<SVGSVGElement>(null);
  const intervals = [
    [1, 2],
    [3, 5],
    [6, 7],
    [8, 10],
    [12, 16],
  ];

  useEffect(() => {
    if (svgRef.current == null) {
      return;
    }
    const padding = 50;

    const svg = d3.select(svgRef.current).select('#change');
    svg.selectAll('*').remove();
    const xScale = d3
      .scaleLinear()
      .domain([0, 17])
      .range([100, w - 50]);

    const yScale = d3
      .scaleLinear()
      .domain([0, intervals.length + 1])
      .range([h - padding, padding]);

    const xAxis = d3.axisBottom(xScale);
    svg
      .append('g')
      .style('font', '32px times')
      .attr('id', 'x-axis')
      .attr('transform', `translate(0, ${h - padding})`)
      .call(xAxis);

    const meeting_height = 20;
    for (let i = frameIndex; i < intervals.length; i++) {
      const [start, end] = intervals[i];
      svg
        .append('line')
        .attr('x1', `${xScale(start)}`)
        .attr('y1', yScale(i + 2))
        .attr('x2', `${xScale(end)}`)
        .attr('y2', yScale(i + 2))
        .attr('stroke', 'blue')
        .attr('stroke-width', meeting_height);
    }

    for (let i = 0; i < frameIndex; i++) {
      svg
        .append('line')
        .attr('x1', `${xScale(intervals[i][0])}`)
        .attr('y1', yScale(1))
        .attr('x2', `${xScale(intervals[i][1])}`)
        .attr('y2', yScale(1))
        .attr('stroke', 'blue')
        .attr('stroke-width', meeting_height);
    }

    // new Interval
    svg
      .append('line')
      .attr('x1', `${xScale(4)}`)
      .attr('y1', yScale(1))
      .attr('x2', `${xScale(8)}`)
      .attr('y2', yScale(1))
      .attr('stroke', 'blue')
      .attr('stroke-width', meeting_height);
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
      <svg id='svg' ref={svgRef} width={w} height={h}>
        <g id='change'></g>
      </svg>
      <ButtonBar setIndex={setIndex} />
    </>
  );
}
