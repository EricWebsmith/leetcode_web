import React, { SetStateAction } from 'react';
import ButtonBar from '../controls/ButtonBar';
import NamedPointer from '../controls/NamedPointer';
import SvgRects from '../controls/SvgRects';
import SvgTexts from '../controls/SvgTexts';

const k = 1;

type Frame = { left: number; right: number; maxf: number; ans: number };

const frames: Frame[] = [
  { left: 0, right: 0, maxf: 1, ans: 1 },
  { left: 0, right: 1, maxf: 2, ans: 2 },
  { left: 0, right: 2, maxf: 2, ans: 3 },
  { left: 0, right: 3, maxf: 3, ans: 4 },
  { left: 0, right: 4, maxf: 3, ans: 4 },
  { left: 1, right: 4, maxf: 2, ans: 4 },
  { left: 2, right: 4, maxf: 2, ans: 4 },
  { left: 2, right: 5, maxf: 3, ans: 4 },
  { left: 2, right: 6, maxf: 2, ans: 4 },
  { left: 3, right: 6, maxf: 2, ans: 4 },
  { left: 4, right: 6, maxf: 2, ans: 4 },
];

export default function Leetcode0000() {
  const [frameIndex, setFrameIndex] = React.useState<number>(0);
  const frame: Frame = frames[frameIndex];

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

  const rectStyle = { fill: 'blue' };
  const textStyle = { fontWeight: 'bold', fontSize: 80, fontFamily: 'Arial', fill: '#FFFFFF' };
  const offset = 100;
  const valid = frame.right - frame.left + 1 - frame.maxf <= k;
  const pointerStyle = valid ? { fill: 'green' } : { fill: 'red' };

  return (
    <>
      <svg id='svg' width={950} height={400}>
        <SvgRects x={80} y={125} height={90} width={90} n={7} offsetX={offset} style={rectStyle}></SvgRects>
        <SvgTexts x={95} y={200} text={'AABABBA'} offsetX={offset} style={textStyle}></SvgTexts>
        <NamedPointer x={5 + frame.left * offset} y={15} letter='L' pathStyle={pointerStyle} />
        <NamedPointer x={5 + frame.right * offset} y={15} letter='R' pathStyle={pointerStyle} />
        <text x={80} y={285} style={{ fontSize: 60, fontWeight: 'bold' }}>
          K: {k}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Max Frequency: {frame.maxf}
        </text>
        <text x={80} y={365} style={{ fontSize: 60, fontWeight: 'bold' }}>
          Answer: {frame.ans}
        </text>
      </svg>
      <ButtonBar setIndex={setIndex} />
    </>
  );
}
