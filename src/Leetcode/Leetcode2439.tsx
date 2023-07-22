import { SetStateAction, useState } from 'react';

import ButtonBar from '../controls/ButtonBar';
import SvgRects from '../controls/SvgRects';
import SvgTexts from '../controls/SvgTexts';

export default function Leetcode2439() {
  const [frameIndex, setFrameIndex] = useState<number>(0);
  const dp = '3555';
  const sums = ['', '3', '10', '11', '17'];
  const avgs = ['', '3', '5', '4', '5'];
  const bests = ['', '3', '5', '5', '5'];

  function setIndex(index: SetStateAction<number>) {
    let newIndex = 0;
    if (typeof index == 'number') {
      newIndex = index;
    } else {
      newIndex = index(frameIndex);
    }

    if (newIndex >= 0 && newIndex < 5) {
      setFrameIndex(index);
    }
  }

  const rectStyle = {
    fill: 'blue',
  };

  const textStyle = {
    fontWeight: 'bold',
    fontSize: 90,
    fontFamily: 'Arial',
    fill: '#FFFFFF',
  };

  const dpStyle = {
    fontWeight: 'bold',
    fontSize: 80,
    fontFamily: 'Arial',
    fill: '#000000',
  };

  const offset = 200;

  return (
    <>
      <svg id='svg' width={1100} height={300}>
        <SvgRects x={80} y={75} height={120} width={120} n={4} offsetX={offset} style={rectStyle}></SvgRects>
        <SvgTexts x={110} y={165} text={'3716'} offsetX={offset} style={textStyle}></SvgTexts>
        <SvgTexts
          x={105}
          y={270}
          text={dp.substring(0, frameIndex)}
          offsetX={offset}
          spaceOffset={20}
          style={dpStyle}></SvgTexts>
        <rect
          x={-125 + frameIndex * offset}
          y={70}
          stroke='green'
          strokeWidth={10}
          strokeDasharray='10'
          fill='none'
          width={130}
          height={130}></rect>
      </svg>
      <div id='message' style={{ display: 'grid', gridTemplateColumns: 'auto auto auto' }}>
        <div>Sum: {sums[frameIndex]}</div>
        <div>Avg: {avgs[frameIndex]}</div>
        <div>Best: {bests[frameIndex]}</div>
      </div>
      <ButtonBar setIndex={setIndex} />
    </>
  );
}
