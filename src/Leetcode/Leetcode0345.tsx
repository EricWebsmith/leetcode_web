import { SetStateAction, useState } from 'react';

import ButtonBar from '../controls/ButtonBar';
import NamedPointer from '../controls/NamedPointer';
import SvgRects from '../controls/SvgRects';
import SvgTexts from '../controls/SvgTexts';

type Frame = {
  s: string;
  left: number;
  right: number;
  showArc?: boolean;
};

export default function Leetcode0345() {
  const [frameIndex, setFrameIndex] = useState<number>(0);
  const frames: Frame[] = [
    { s: 'LEETCODE', left: 0, right: 7 },
    { s: 'LEETCODE', left: 1, right: 7 },
    { s: 'LEETCODE', left: 2, right: 5, showArc: true },
    { s: 'LEOTCEDE', left: 2, right: 5, showArc: true },
    { s: 'LEOTCEDE', left: 4, right: 3 },
  ];
  const frame = frames[frameIndex];

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

  const rectStyle = {
    fill: 'blue',
  };

  const textStyle = {
    fontWeight: 'bold',
    fontSize: 80,
    fontFamily: 'Arial',
    fill: '#FFFFFF',
  };

  const offset = 100;

  return (
    <>
      <svg id='svg' width={1100} height={300}>
        <SvgRects x={80} y={150} height={90} width={90} n={8} offsetX={offset} style={rectStyle}></SvgRects>
        <SvgTexts x={100} y={225} text={frame.s} offsetX={offset} style={textStyle}></SvgTexts>
        <NamedPointer letter='L' x={5 + frame.left * offset} y={40} pathStyle={{ fill: 'green' }} />
        <NamedPointer letter='R' x={5 + frame.right * offset} y={40} pathStyle={{ fill: 'green' }} />
        <path
          display={frame.showArc ?? false ? '' : 'none'}
          stroke='red'
          strokeWidth={10}
          fill='none'
          d='M330 240 A3 1, 0, 0 0, 630 240'
        />
      </svg>
      <ButtonBar setIndex={setIndex} />
    </>
  );
}
