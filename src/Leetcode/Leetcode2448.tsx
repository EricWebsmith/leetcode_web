import * as d3 from 'd3';
import { SetStateAction, useEffect, useRef, useState } from 'react';

import ButtonBar from '../controls/ButtonBar';
import SvgTexts from '../controls/SvgTexts';

export default function Leetcode2448() {
  const [frameIndex, setFrameIndex] = useState<number>(0);

  const nums = [1, 2, 3, 5];
  const cost = [2, 14, 3, 1];
  const dp = '24 820  56';

  const gRef = useRef<SVGGElement>(null);
  const n = 10;
  const messages = [
    'cost = 14*1 + 3*2 + 1*4 = 24',
    'cost=24 - 1 * (14+3+1)=6',
    'cost=6',
    'cost=6 + 2 * 1=8',
    '8 - 1 * (3 + 1) = 4',
    '4',
    '4 + 1 * (14 + 2) = 20',
    '20 - 2 * (1) = 18',
    '18',
    '18 + 2 * (2 + 14 + 3) = 56',
  ];

  const minValue = Math.min(...nums);
  const maxValue = Math.max(...nums);

  const padding = 50;
  const w = 1000;
  const h = 500;
  const xScale = d3
    .scaleLinear()
    .domain([minValue - 2, maxValue + 2])
    .range([100, w - 50]);

  const yScale = d3
    .scaleLinear()
    .domain([0, 5])
    .range([h - padding, padding]);

  useEffect(() => {
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
  });

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
  for (let i = 0; i < nums.length; i++) {
    circles.push(<circle key={i} cx={xScale(nums[i])} cy={yScale(1)} r={25} fill='blue' />);
  }

  const polyLines = [];
  const polyLineTexts = [];
  let index = 0;
  let indexLeft = 0;
  let indexRight = 0;
  if (frameIndex > 0) {
    index = Math.floor((frameIndex - 1) / 3) + 1;
    indexLeft = index - 1;
    indexRight = index - 1;
    if ((frameIndex - 1) % 3 > 0) {
      indexRight++;
      if ((frameIndex - 1) % 3 > 1) {
        indexLeft++;
      }
    }
  }

  // left
  for (let i = 0; i < indexLeft; i++) {
    const d = `${xScale(nums[i])}, ${yScale(1)} ${xScale(nums[i])}, ${yScale(1 + indexLeft - i)} ${
      xScale(nums[indexLeft]) - 30
    }, ${yScale(1 + indexLeft - i)}`;
    polyLines.push(<polyline key={i} points={d}></polyline>);
    const textKey = `text-${i}`;
    polyLineTexts.push(
      <text key={textKey} x={xScale(nums[i])} y={yScale(1 + indexLeft - i) - 20}>
        {cost[i]} * {nums[indexLeft] - nums[i]}
      </text>
    );
  }
  // right
  for (let i = indexRight + 1; i < nums.length; i++) {
    const d = `${xScale(nums[i])}, ${yScale(1)} ${xScale(nums[i])}, ${yScale(1 + i - indexRight)} ${
      xScale(nums[indexRight]) + 30
    }, ${yScale(1 + i - indexRight)}`;
    polyLines.push(<polyline key={i} points={d}></polyline>);
    const textKey = `text-${i}`;
    polyLineTexts.push(
      <text key={textKey} x={xScale(nums[i])} y={yScale(1 + i - indexRight) - 20}>
        {cost[i]} * {nums[i] - nums[indexRight]}
      </text>
    );
  }

  return (
    <>
      <svg id='svg' width={900} height={560}>
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
        {/* <g style={{ strokeWidth: 5, stroke: 'red', markerEnd: 'url(#arrowhead)' }}>{lines}</g> */}
        {circles}
        <g ref={gRef}>
          <text>this is the asix</text>
        </g>
        <g style={{ stroke: 'red', strokeWidth: 10, fill: 'none', markerEnd: 'url(#arrowhead)' }}>
          {polyLines}
        </g>
        <g style={{ fontSize: 32 }}>{polyLineTexts}</g>

        <line
          x1={xScale(nums[index])}
          y1={yScale(1)}
          x2={xScale(nums[index])}
          y2={yScale(5)}
          style={{
            stroke: 'green',
            strokeDasharray: '10',
            strokeWidth: 10,
          }}></line>
        <SvgTexts
          x={xScale(1) - 25}
          y={yScale(-1) + 10}
          text={dp}
          style={{
            fontSize: 48,
          }}
          step={2}
          spaceOffset={10}
          offsetX={xScale(2) - xScale(1)}></SvgTexts>
      </svg>
      <div className='message' style={{ height: 50 }}>
        {messages[frameIndex]}
      </div>
      <ButtonBar setIndex={setIndex} />
    </>
  );
}
