import * as d3 from 'd3';
import { SetStateAction, useEffect, useRef, useState } from 'react';

import MeetingRoom from '../SvgIcons/MeetingRoom';
import ButtonBar from '../controls/ButtonBar';

export default function Leetcode2402() {
  const [frameIndex, setFrameIndex] = useState<number>(0);
  const w = 900;
  const h = 400;

  const svgRef = useRef<SVGSVGElement>(null);
  // prettier-ignore
  const intervals = [[0, 10],[1, 5],[2, 7],[3, 4]];
  const colors = ['red', 'green', 'blue', 'orange'];

  useEffect(() => {
    if (svgRef.current == null) {
      return;
    }
    const padding = 50;

    const svg = d3.select(svgRef.current).select('#change');
    svg.selectAll('*').remove();
    const xScale = d3
      .scaleLinear()
      .domain([-1, 12])
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

    const meeting_height = 20;
    for (let i = frameIndex; i < intervals.length; i++) {
      const [start, end] = intervals[i];
      svg
        .append('line')
        .attr('x1', `${xScale(start)}`)
        .attr('y1', yScale(i / 2 + 2))
        .attr('x2', `${xScale(end)}`)
        .attr('y2', yScale(i / 2 + 2))
        .attr('stroke', colors[i])
        .attr('stroke-width', meeting_height);
    }

    if (frameIndex >= 1) {
      svg
        .append('line')
        .attr('x1', `${xScale(intervals[0][0])}`)
        .attr('y1', yScale(1))
        .attr('x2', `${xScale(intervals[0][1])}`)
        .attr('y2', yScale(1))
        .attr('stroke', colors[0])
        .attr('stroke-width', meeting_height);
    }

    if (frameIndex >= 2) {
      svg
        .append('line')
        .attr('x1', `${xScale(intervals[1][0])}`)
        .attr('y1', yScale(0.4))
        .attr('x2', `${xScale(intervals[1][1])}`)
        .attr('y2', yScale(0.4))
        .attr('stroke', colors[1])
        .attr('stroke-width', meeting_height);
    }

    if (frameIndex >= 3) {
      svg
        .append('line')
        .attr('x1', `${xScale(5)}`)
        .attr('y1', yScale(0.4))
        .attr('x2', `${xScale(10)}`)
        .attr('y2', yScale(0.4))
        .attr('stroke', colors[2])
        .attr('stroke-width', meeting_height);
    }

    if (frameIndex >= 4) {
      svg
        .append('line')
        .attr('x1', `${xScale(10)}`)
        .attr('y1', yScale(1))
        .attr('x2', `${xScale(11)}`)
        .attr('y2', yScale(1))
        .attr('stroke', colors[3])
        .attr('stroke-width', meeting_height);
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
      <svg id='svg' ref={svgRef} width={w} height={h}>
        <MeetingRoom x={900} y={2500} color='green' scale={0.1} />
        <MeetingRoom x={900} y={3000} color='blue' scale={0.1} />
        <g id='change'></g>
      </svg>
      <ButtonBar setIndex={setIndex} />
      <div
        style={{
          paddingTop: 100,
          paddingLeft: 50,
        }}>
        The meeting room icon is from <a href='https://www.svgrepo.com/'>svgrepo.com/</a>
      </div>
    </>
  );
}
