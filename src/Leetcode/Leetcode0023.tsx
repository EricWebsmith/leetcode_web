import { PriorityQueue } from '@datastructures-js/priority-queue';
import * as d3 from 'd3';
import cloneDeep from 'lodash/cloneDeep';
import { SetStateAction, useEffect, useState } from 'react';
import ButtonBar from '../controls/ButtonBar';

function comparer(list1: number[], list2: number[]): number {
  if (list1[0] !== list2[0]) {
    return list1[0] - list2[0];
  }

  return list1[1] - list2[1];
}

type Frame = {
  row: number;
  col: number;
};

export default function Leetcode0023() {
  const [frameIndex, setFrameIndex] = useState<number>(0);
  const data = [
    [1, 4, 5],
    [1, 3, 4],
    [2, 6],
  ];

  const q_data: number[][] = [];
  const q = PriorityQueue.fromArray(q_data, comparer);
  for (let row = 0; row < data.length; row++) {
    q.enqueue([data[row][0], row]);
  }

  const frameOriginal = { row: -1, col: -1 };
  const frames: Frame[] = [];
  const frame0 = cloneDeep(frameOriginal);
  frames.push(frame0);
  const indices = Array<number>(data.length).fill(0);
  while (q.size() > 0) {
    const [, row] = q.dequeue();
    frameOriginal.row = row;
    frameOriginal.col = indices[row];
    const frameCurrent = cloneDeep(frameOriginal);
    frames.push(frameCurrent);
    // nodes
    indices[row]++;
    if (indices[row] < data[row].length) {
      q.enqueue([data[row][indices[row]], row]);
    }
  }

  const dp: number[][] = [];
  for (let row = 0; row < data.length; row++) {
    const dpArr: number[] = Array(data[row].length).fill(-1);
    dp.push(dpArr);
  }

  for (let i = 1; i <= frameIndex; i++) {
    const { row, col } = frames[i];
    dp[row][col] = i;
  }

  const textStyle = {
    fontWeight: 'bold',
    fontSize: 80,
    fontFamily: 'Arial',
    fill: '#FFFFFF',
  };



  // Sorted Node List
  const y0 = 50;
  const offsetY = 120;
  const x0 = 200;
  const offsetX = 200;
  const circles: JSX.Element[] = [];
  const radius = 50;
  const colors = ['red', 'green', 'blue'];
  const texts = [];
  for (let row = 0; row < data.length; row++) {
    for (let col = 0; col < data[row].length; col++) {
      if (dp[row][col] >= 0) {
        continue;
      }
      const x = x0 + offsetX * col;
      const y = y0 + offsetY * row;
      circles.push(<circle key={`circle-${row}-${col}`} cx={x} cy={y} r={radius} fill={colors[row]}></circle>);
      texts.push(
        <text key={`test-${row}-${col}`} x={x} y={y}>
          {data[row][col]}
        </text>
      );
    }
  }

  // Merged
  const mergedOffsetX = 120;
  const mergedNodes = [];
  for (let i = 1; i <= frameIndex; i++) {
    const { row, col } = frames[i];
    const x = x0 - 150 + i * mergedOffsetX;
    const y = y0 + 3 * offsetY;
    mergedNodes.push(<circle key={`merged-node-${row}-${col}`} cx={x} cy={y} r={radius} fill={colors[row]}></circle>);
    texts.push(
      <text  key={`merged-node-test-${row}-${col}`} x={x} y={y}>
        {data[row][col]}
      </text>
    );
  }

  useEffect(() => {
    d3.select('#texts').selectAll('text').style('dominant-baseline', 'middle').style('text-anchor', 'middle');
  }, [frameIndex]);

  function setIndex(index: SetStateAction<number>) {
    let newIndex = 0;
    if (typeof index == 'number') {
      newIndex = index;
    } else {
      newIndex = index(frameIndex);
    }

    if (newIndex >= 0 && newIndex < frames.length) {
      setFrameIndex(index);
    }
  }

  return (
    <>
      <svg id='svg' width={1100} height={500}>
        {circles}
        {mergedNodes}
        <g id='texts' style={textStyle}>
          {texts}
        </g>
      </svg>
      <ButtonBar setIndex={setIndex} />
    </>
  );
}
