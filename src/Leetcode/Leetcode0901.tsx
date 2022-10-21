import * as d3 from 'd3';
import React, { SetStateAction } from 'react';
import ButtonBar from '../controls/ButtonBar';

export default function Leetcode0901() {
  const [frameIndex, setFrameIndex] = React.useState<number>(0);
  const [data, setData] = React.useState([100, 80, 60, 70, 60, 75, 85]);
  const n = data.length;
  const gRef = React.useRef<SVGGElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const dp = new Array(n).fill(-1);
  const minValue = Math.min(...data);
  const maxValue = Math.max(...data);
  for (let i = 1; i < n; i++) {
    let prev = i - 1;
    while (prev >= 0 && data[prev] <= data[i]) {
      prev = dp[prev];
    }

    dp[i] = prev;
  }

  const padding = 50;
  const w = 1000;
  const h = 500;
  const xScale = d3
    .scaleLinear()
    .domain([-1, data.length])
    .range([100, w - 50]);

  const yScale = d3
    .scaleLinear()
    .domain([minValue, maxValue])
    .range([h - padding, padding]);

  React.useEffect(() => {
    if (gRef.current == null) {
      return;
    }
    const svg = d3.select(gRef.current);
    svg.selectAll('*').remove();

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
  }, [data]);

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

  const circles = [];
  for (let i = 0; i < n; i++) {
    circles.push(<circle key={i} cx={xScale(i)} cy={yScale(data[i])} r={15} fill='blue' />);
  }

  const lines = [];
  if (frameIndex > 0) {
    for (let x = 1; x < Math.min(data.length, frameIndex + 1); x++) {
      const x1 = xScale(x);
      const y1 = yScale(data[x]);
      const x2 = xScale(dp[x]);
      const y2 = dp[x] === -1 ? yScale(data[x]) : yScale(data[dp[x]]);
      const tan = (x1 - x2) / (y1 - y2);
      const angle = Math.atan(tan);
      const xdiff = 25 * Math.sin(angle);
      const ydiff = 25 * Math.cos(angle);

      lines.push(<line key={x} x2={x2 + xdiff} y2={y2 + ydiff} x1={x1} y1={y1} />);
    }
  }

  function dataChangeClickHandler() {
    if (inputRef.current == null) {
      return;
    }

    const value = inputRef.current.value ?? '';
    const arr = value.split(',');
    const newData = [];
    for (const s of arr) {
      if (s.match(/^\d+$/)) {
        newData.push(Number(s));
      }
    }
    setData(newData);
    setFrameIndex(0);
  }

  return (
    <>
      <svg
        id='svg'
        width={900}
        height={500}
        style={{
          backgroundColor: 'white',
          cursor: 'url(Laser_Pointer.png), pointer!important',
        }}>
        <defs>
          <marker
            id='arrowhead'
            viewBox='0 0 10 10'
            markerWidth='5'
            markerHeight={5}
            orient='auto-start-reverse'
            refX='5'
            refY='5'>
            <path d='M0,0 L10,5 L0,10 z' fill='red' />
          </marker>
        </defs>
        <g style={{ strokeWidth: 5, stroke: 'red', markerEnd: 'url(#arrowhead)' }}>{lines}</g>
        {circles}
        <g ref={gRef}>
          <text>this is the asix</text>
        </g>
      </svg>
      <ButtonBar setIndex={setIndex} />
      <div className='message'>
        <input ref={inputRef} defaultValue={data.toString()} style={{ width: 500 }}></input>
        <button className='btn' onClick={dataChangeClickHandler}>
          Change
        </button>
      </div>
    </>
  );
}
